import nights_selector_t from 'bundle-text:./nights-selector-template.html'
import rooms_for_nights_t from 'bundle-text:./rooms-for-nights.html'
import * as Mustache from "mustache";
import {flickityReady} from "../usefuls.js";

export class RoomSelector {
    roomsRef = null;
    constructor(container, nights_list, config = {}) {
        this.roomsRef = nights_list.map(n => {
            return {
                nights:  n,
                wording: n.asNights(),
            };
        });
        this.$container = $(container);
        this.$roomsSelector = $(Mustache.render(nights_selector_t, { list: this.roomsRef }));
        this.$nightsSelector = this.$roomsSelector.filter('ul.selector');
        this.$roomsHolder = this.$roomsSelector.filter('.rooms-holder');
        this.config = config;
        this.init();
    }

    init() {
        this.roomsRef.forEach(ref => {
            ref.$buttonEl = this.$nightsSelector.find(`li[data-nights='${ ref.nights }']`);
        });
        this.$container.append(this.$roomsSelector);
        this.selectNights(this.config.nightsSelected);
        return this;
    }

    findRoomsRefForNights(n) {
        return this.roomsRef.find(d => d.nights === n);
    }

    fetchRoomsData(rooms_ref) {
        rooms_ref.roomsData ||= new Promise(resolve => {
            rooms_ref.$buttonEl.attr('data-state', 'loading');
            $.get('/v1/hoteldetail/getroomlist', {
                night: rooms_ref.nights,
                hotelId: this.config.hotelId,
                availableFilter: this.config.availableFilter,
                selectedDate: this.config.selectedDate
            }).done((response) => {
                rooms_ref.$buttonEl.attr('data-state', 'available');
                const dp = new DOMParser();
                const doc = dp.parseFromString(response, 'text/html');
                const rooms_nodes_list = doc.querySelectorAll('.room.row');
                const rooms_list = [...rooms_nodes_list].map(room_node => {
                    const variant_nodes = room_node.querySelectorAll('.variant');
                    const variants = [...variant_nodes].map(variant_node => {
                        const pax_count_el = variant_node.querySelector('.pax-count');
                        return {
                            meal: {
                                id: variant_node.getAttribute('data-mealid'),
                                name: variant_node.querySelector('.m-meal-name').textContent
                            },
                            pax: {
                                adults: Number(pax_count_el.getAttribute('data-adultcount')),
                                children: Number(pax_count_el.getAttribute('data-childcount'))
                            }
                        }
                    });
                    const gallery_collection = JSON.parse(room_node.querySelector('.roominfo .custom-gallery-wrapper').getAttribute('data-images'));
                    const slider_collection = gallery_collection.map(item => {
                        let parts = item.src.split('/');
                        parts.splice(5, 1, '800x600');
                        return { src: parts.join('/') };
                    });
                    return {
                        name: room_node.querySelector('.roominfo h4')?.textContent,
                        gallery_images_xxl: gallery_collection,
                        gallery_images_xxm: slider_collection,
                        variants
                    };
                });
                const $roomsList = rooms_ref.$roomsList = $(Mustache.render(rooms_for_nights_t, { rooms_list }));
                $roomsList.find('.room-grid').each((idx, el) => el.style.setProperty('--variants-qty', rooms_list[idx].variants.length));
                this.$roomsHolder.append($roomsList);
                resolve();
            });
        });
        return rooms_ref.roomsData;
    }
    async selectNights(n) {
        const roomsRef = this.findRoomsRefForNights(n);
        await this.fetchRoomsData(roomsRef);
        this.$container.closest('.otium-hotel').find('.tour-summary-grid .nights .values').children().filter((idx, li) => {
            return li.getAttribute('data-value') == roomsRef.nights;
        }).addClass('selected').siblings().removeClass('selected');
        roomsRef.$buttonEl.attr('data-state', 'selected');
        roomsRef.$roomsList.addClass('shown').siblings('.shown').removeClass('shown');
        await flickityReady();
        roomsRef.$roomsList.find('.compact-slider').flickity({
            cellSelector: 'img',
            lazyLoad: 1,
            imagesLoaded: true,
            wrapAround: true,
            prevNextButtons: false,
            pageDots: false
        });
        return this;
    }

}