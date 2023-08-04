import nights_selector_t from 'bundle-text:./nights-selector-template.html'
import rooms_for_nights_t from 'bundle-text:./rooms-for-nights.html'
import additives_popover from 'bundle-text:../markup/additives-popover.html'
import coralbonus_popover from 'bundle-text:../markup/coralbonus-popover.html'
import * as Mustache from "mustache";
import { currency, demanglePrice, flickityReady, visuallyDemanglePrice } from "../usefuls.js";
import { PriceCalendar } from "../price-calendar";

export class RoomSelector {
    roomsRef = null;
    constructor(container, nights_list, config = {}) {
        this.roomsRefByNights = nights_list.map(n => {
            return {
                nights:  n,
                wording: n.asNights(),
            };
        });
        this.$container = $(container);
        this.$roomsSelector = $(Mustache.render(nights_selector_t, { list: this.roomsRefByNights }));
        this.$nightsSelector = this.$roomsSelector.filter('ul.selector');
        this.$roomsHolder = this.$roomsSelector.filter('.rooms-holder');
        this.config = config;
        this.init();
    }

    async init() {
        this.roomsRefByNights.forEach(ref => {
            ref.$buttonEl = this.$nightsSelector.find(`li[data-nights='${ ref.nights }']`);
            ref.$buttonEl.on('click', () => {
                this.selectNights(ref.nights);
            });
        });
        this.$container.append(this.$roomsSelector);

        await this.selectNights(this.config.nightsSelected);
        return Promise.all(this.roomsRefByNights.map((rr) => this.fetchRoomsData(rr)));
    }

    findRoomsRefForNights(n) {
        return this.roomsRefByNights.find(d => d.nights == n);
    }

    fetchRoomsData(rooms_ref) {
        const { symbol: currency_symbol } = currency();
        rooms_ref.roomsData ||= new Promise((resolve, reject) => {
            rooms_ref.$buttonEl.attr('data-state', 'loading');
            $.get('/v1/hoteldetail/getroomlist', {
                night: rooms_ref.nights,
                hotelId: this.config.hotelId,
                availableFilter: this.config.availableFilter,
                // availableFilter: 1,
                selectedDate: this.config.selectedDate,
                _: Math.round(Math.random() * 1000000)
            }).done((response) => {
                const dp = new DOMParser();
                const doc = dp.parseFromString(response, 'text/html');
                const rooms_nodes_list = doc.querySelectorAll('.room.row');
                if (rooms_nodes_list?.length) {
                    rooms_ref.$buttonEl.attr('data-state', 'available');
                    const rooms_list = [...rooms_nodes_list].map((room_node, room_idx) => {
                        const variant_nodes = room_node.querySelectorAll('.variant');
                        const variants = [...variant_nodes].map((variant_node, variant_idx) => {
                            let room_pricing_klass;
                            let variant_available = true;
                            const pax_count_el = variant_node.querySelector('.pax-count');
                            const adults = Number(pax_count_el.getAttribute('data-adultcount'));
                            const children = Number(pax_count_el.getAttribute('data-childcount'));
                            const chooseRoomButton_node = variant_node.querySelector('.action > .roomAction');
                            if (chooseRoomButton_node) {
                                chooseRoomButton_node.setAttribute('href', variant_node.querySelector(chooseRoomButton_node?.getAttribute('href')).querySelector('a').getAttribute('href'));
                            }
                            let price = Number(chooseRoomButton_node && window.global.dataLayerManager.formatAscrPrice(chooseRoomButton_node.getAttribute('data-price-layer')));
                            // undefined 'price' from dataLayer means room is unavailable
                            if (!price) {
                                room_pricing_klass = 'unavailable';
                                variant_available = false;
                                price = visuallyDemanglePrice(response, room_idx, variant_idx);
                            }
                            price ||= 0;
                            let original_price = Number(variant_node.querySelector('.discountedprice')?.textContent.replace(/[^0-9.,]/g, '').replace(',', '.'));
                            // pricing -> additives
                            const $icon_price_info = $(variant_node).find('.icon-price-information');
                            let additives_html = $icon_price_info.attr('data-content');
                            // let is_package_tour =  !$('.flightincluded').text().match(/\s+не\s+/);
                            let mandatories_total_html, mandatories_total_value, additives_popover_html, additives_list;
                            if (additives_html) {
                                mandatories_total_html = $icon_price_info.siblings('span').get(0).innerHTML;
                                mandatories_total_value = mandatories_total_html && Number(mandatories_total_html.replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
                                additives_list = $(additives_html).filter('div').map((idx, div) => {
                                    let [, akey, , avalue] = div.textContent.replace(/доплата за /i, '').match(/(.+?)(\s+)([0-9.,\s]+)/);
                                    return { akey, avalue };
                                }).toArray();
                                additives_popover_html = Mustache.render(additives_popover, { list: additives_list, currency_symbol });
                            }
                            // CoralBonus
                            let coralbonus_html;
                            if (this.config.CoralBonusPercent) {
                                const { rate } = currency();
                                const bonus_value = Math.round(price / 100 * this.config.CoralBonusPercent);
                                coralbonus_html = bonus_value.decoratedCoralBonusHTML(Mustache.render(coralbonus_popover, { value_formatted: (bonus_value * rate).formatPrice() }));
                            }
                            let eb_container = variant_node.querySelector('.ebcontainer');
                            let early_booking_present, early_booking_text, early_booking_info_html;
                            if (eb_container) {
                                early_booking_present = true;
                                early_booking_text = eb_container.querySelector('.btn')?.textContent;
                                early_booking_info_html = eb_container.querySelector('.ebinfo').innerHTML;
                            }

                            return {
                                chooseRoomButton_markup:     chooseRoomButton_node?.outerHTML ?? '<span class="unavailable-stub">Недоступен на выбранные даты</span>',
                                room_pricing_klass,
                                meal:                        {
                                    id:   variant_node.getAttribute('data-mealid'),
                                    name: variant_node.querySelector('.m-meal-name').textContent
                                },
                                pax:                         { adults, children },
                                pax_markup:                  paxMarkupFor(adults, children),
                                price,
                                final_price_html:            price.decoratedPriceHTML(),
                                original_price_html:         original_price && original_price.decoratedPriceHTML(),
                                installment_value_formatted: Math.round(price / 36 * 1.25).formatPrice(),
                                additives:                   !!additives_html,
                                mandatories_total_html,
                                mandatories_total_value,
                                additives_popover_html,
                                additives_list,
                                CoralBonusPercent:           this.config.CoralBonusPercent,
                                coralbonus_html,
                                early_booking_present,
                                early_booking_text,
                                early_booking_info_html
                            }
                        });
                        const gallery_collection = JSON.parse(room_node.querySelector('.roominfo .custom-gallery-wrapper').getAttribute('data-images'));
                        const slider_collection = gallery_collection.map(item => {
                            let parts = item.src.split('/');
                            parts.splice(5, 1, '800x600');
                            return { src: parts.join('/') };
                        });
                        return {
                            name:               room_node.querySelector('.roominfo h4')?.textContent,
                            id:                 room_node.getAttribute('data-roomid'),
                            providerRoomId:     room_node.getAttribute('data-providerroomid'),
                            providerId:         room_node.getAttribute('data-providerid'),
                            privileges:         [...room_node.querySelectorAll('.room-name p')].map(p => p.textContent),
                            gallery_images_xxl: gallery_collection,
                            gallery_images_xxm: slider_collection.slice(0, 7),
                            variants
                        };
                    });
                    const $roomsList = rooms_ref.$roomsList = $(Mustache.render(rooms_for_nights_t, { rooms_list, currency_symbol }));
                    this.setupHandlersForRoomsRef(rooms_ref);
                    $roomsList.find('.room-grid').each((idx, el) => el.style.setProperty('--variants-qty', rooms_list[idx].variants.length));
                    this.$roomsHolder.append($roomsList);
                    resolve(rooms_list);
                } else {
                    rooms_ref.$buttonEl.attr('data-state', 'unavailable');
                    reject();
                }
            }).fail(function () {
                rooms_ref.$buttonEl.attr('data-state', 'unavailable');
                reject();
            });
        });
        return rooms_ref.roomsData;
    }

    async roomVariantDatasFromClickedElement(el, roomsRef) {
        const $el = $(el);
        const $roomGrid = $el.closest('.room-grid');
        const $variantPricing = $el.closest('room-pricing');
        const rooms_data = await roomsRef.roomsData;
        const room_data = rooms_data[$roomGrid.index()];
        const variant_idx = $roomGrid.find('room-pricing').index($variantPricing);
        const variant = room_data.variants[variant_idx];
        return [room_data, variant];
    }

    setupHandlersForRoomsRef(roomsRef) {
        const me = this;
        // Toggle room info panel / load if needed
        roomsRef.$roomsList.on('click', '.room-heading', async function(){
            const $room_heading = $(this);
            const $roomGrid = $room_heading.closest('.room-grid');
            const rooms_data = await roomsRef.roomsData;
            const room_data = rooms_data[$roomGrid.index()];
            const $room_details = $room_heading.next();
            $room_details.toggleClass('open');
            if ($room_details.hasClass('open')) {
                $room_details.slideDown();
                if (!$room_details.hasClass('loaded')) {
                    // beginDate: 2023-08-01T00:00:00Z
                    $.get('/v1/hoteldetail/getroompanel', {
                        hotelId:        me.config.hotelId,
                        eeRoomId:       room_data.id,
                        providerRoomId: room_data.providerRoomId,
                        providerId:     room_data.providerId,
                        beginDate:      me.config.selectedDate
                    }).done(function (response_markup) {
                        const $details_markup = $(response_markup);
                        const $privilenges = $details_markup.find('.card.privileges .card-body');
                        if ($privilenges.length && $privilenges.find('li').length === 0) {
                            const with_li_tags =  $privilenges.text().replace(/•[^\n\r]+/g, (li) => {
                                return `<li>${ li.replace(/•\s*/, '') }</li>`;
                            });
                            $privilenges.html(`<ul>${ with_li_tags }</ul>`);
                        }
                        $room_details.empty().append($details_markup).addClass('loaded');
                    });
                }
            } else {
                $room_details.slideUp();
            }

        });
        // Choose room button
        roomsRef.$roomsList.on('click', 'a.roomAction', async function () {
            let t = $(this).data("roomLayer");
            t.Price = $(this).data("priceLayer");
            t.MealType = $(this).data("mealLayer");
            window.global.dataLayerManager.chooseRoom({
                country:          $(".hoteldetailpage").data("hotelcountry"),
                currency:         window.global.getActiveCurrency().name,
                dates:            $(".data-layer-dates", '[data-module="hoteldetail"]').data("layerDates"),
                departure:        window.global.getActiveDeparture().name,
                destination:      $(".hoteldetailpage", '[data-module="hoteldetail"]').data("hotelcity"),
                hotel:            $('[data-module="hoteldetail"]').data("hotel"),
                hotelid:          $(".hoteltitle > h1", '[data-module="hoteldetail"]').data("hotelid"),
                passengers:       $(".data-layer-passenger", '[data-module="hoteldetail"]').data("layerPassenger"),
                quantity:         1,
                hotelOnly:        $(".data-layer-hotel-only", '[data-module="hoteldetail"]').data("layerHotelOnly"),
                price:            t.Price,
                roomType:         t.Name,
                selectedFoodType: t.MealType
            });
            window.global.travelloader.show();
        });
        // Price calendar
        roomsRef.$roomsList.on('click', 'button.price-cal-cell', async function () {
            const $button = $(this);
            const $roomPricing = $button.closest('room-pricing');
            const $roomGrid = $button.closest('.room-grid');
            const $roomPricingCals = $roomGrid.find('room-price-cal');
            const $roomPricingCal = $roomPricing.next();

            $roomPricingCal.toggleClass('open');

            $roomGrid.get(0).style.setProperty('--opened-cals', $roomPricingCals.filter('.open').length);
            let opened_before_current = 0;
            $roomPricingCals.each((idx, el) => {
                el.style.gridRowStart = 3 + idx + opened_before_current;
                opened_before_current += el.classList.contains('open') ? 1 : 0;
            });

            if ($roomPricingCal.hasClass('open')) {
                $roomPricingCal.slideDown();
                if (!$roomPricingCal.hasClass('loaded')) {
                    const [room_data, variant_data] = await me.roomVariantDatasFromClickedElement(this, roomsRef);
                    $.get('/v1/hoteldetail/getpricecalendar', {
                        roomId: room_data.id,
                        mealId: variant_data.meal.id,
                        night: roomsRef.nights
                    }).done(function (response_markup) {
                        const priceCal = new PriceCalendar(response_markup, variant_data);
                        console.table(priceCal.calData);
                        // $roomPricingCal.html(response_markup).addClass('loaded');
                        $roomPricingCal.empty().append(priceCal.render()).addClass('loaded');
                    });
                }
            } else {
                $roomPricingCal.hide();
            }
        });
    }

    async selectNights(n) {
        const roomsRef = this.findRoomsRefForNights(n);
        const rooms_data = await this.fetchRoomsData(roomsRef);
        this.$container.closest('.otium-hotel').find('.tour-summary-grid .nights .values').children().filter((idx, li) => {
            return li.getAttribute('data-value') == roomsRef.nights;
        }).addClass('selected').siblings().removeClass('selected');
        roomsRef.$buttonEl.attr('data-state', 'selected').siblings('[data-state="selected"]').attr('data-state', 'available');
        roomsRef.$roomsList.addClass('shown').siblings('.shown').removeClass('shown');
        await flickityReady();
        roomsRef.$roomsList.find('.compact-slider')
            .on('staticClick.flickity', async (e, pointer, cellElement, idx) => {
                $.magnificPopup.open({
                    type: "image",
                    items: rooms_data[$(cellElement).closest('.room-grid').index()].gallery_images_xxl,
                    tLoading: i18n_en.global.loading + " #%curr%...",
                    gallery: {
                        index: idx, // seems doesn't work ;(
                        enabled: true,
                        navigateByImgClick: true
                    }
                });
            })
            .flickity({
                cellSelector: 'img',
                lazyLoad: 1,
                imagesLoaded: true,
                wrapAround: true,
                prevNextButtons: true,
                pageDots: true
            });
        setTimeout(function () {
            roomsRef.$roomsList.find('.flickity-enabled').flickity('resize');
        }, 0);
        return this;
    }

}

function paxMarkupFor(adults_count, children_count) {
    const els = [];
    if (adults_count + children_count <= 4) {
        Array.from({length: adults_count}).forEach(() => els.push('<span class="pax adult"></span>'));
        Array.from({length: children_count}).forEach(() => els.push('<span class="pax child"></span>'));
    } else {
        els.push(`<span class="pax adult" data-count="${adults_count}"></span>`);
        if (children_count)
            els.push(`<span class="pax child" data-count="${ children_count }"></span>`);
    }
    return els.join('');
}