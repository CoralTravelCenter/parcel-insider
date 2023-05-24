import css from 'bundle-text:./css/search-results.less'
import hotels_data from './data/otium-all.yaml'
import hotel_card_template from 'bundle-text:./markup/otium-hotel-card.html'
import partial_tripadvisor from 'bundle-text:./markup/partial-search-tripadvisor.html'
import partial_tophotels from 'bundle-text:./markup/partial-search-tophotelsru.html'
import otium_tooltip_template from 'bundle-text:./markup/usp-tooltip.html'
import otium_tooltip_body_template from 'bundle-text:./markup/usp-tooltip-body.html'
import * as Mustache from "mustache";
import { preload, responsiveHandler, watchIntersection } from "../../../common/useful.js";

let flickityPromose;
async function flickityReady() {
    flickityPromose ||= new Promise(resolve => {
        preload('https://cdnjs.cloudflare.com/ajax/libs/flickity/2.3.0/flickity.pkgd.min.js', resolve);
    });
    return flickityPromose;
}
let gmapsPromose;
async function gmapsReady() {
    gmapsPromose ||= new Promise(resolve => {
        preload('https://maps.googleapis.com/maps/api/js?key=AIzaSyBnhDu-BFnKo1i6iHDLoHix0vfpwm1nnrM', resolve);
    });
    return gmapsPromose;
}

function typesListWithSelectorAndContext(selector, $ctx, current_value) {
    const strings = Array.from((function*(list_items) {
        for (let li of list_items) {
            if (li.getAttribute('data-toggle') === 'tooltip') {
                let $li = $(li);
                for (let v of ($li.attr('title') || $li.attr('data-original-title')).split(/\s*,\s*/)) {
                    yield v;
                }
            } else {
                yield li.textContent;
            }
        }
    })($(selector, $ctx).toArray()));
    let current_idx = strings.indexOf(current_value);
    if (current_idx < 0) current_idx = 0;
    return strings.map((type_string, idx) => {
        const $li = $(`<li><span>${ type_string }</span></li>`);
        if (idx === current_idx) $li.addClass('chosen');
        if (idx === 0) $li.css('marginTop', `${ -current_idx * 1.1 }em`);
        return $li.get(0).outerHTML;
    });
}

function setupHotelItem_Visual($hotel_item) {
    $hotel_item = $($hotel_item);
    const hotel_data = $hotel_item.get(0).hotel_data;
    const $original_contents = $hotel_item.get(0).$original_contents;
    const $visual = $hotel_item.find('.visual');
    if (hotel_data.visual) {
        if (typeof hotel_data.visual === 'string') {
            $visual.css({ backgroundImage: `url(${ hotel_data.visual })` });
        } else {
            responsiveHandler('(min-width:1007px)', () => {
                $visual.css({ backgroundImage: `url(${ hotel_data.visual.desktop })` });
            }, () => {
                $visual.css({ backgroundImage: `url(${ hotel_data.visual.mobile })` });
            });
        }
    } else {
        let $visual_img = $original_contents.find('img[data-getpanel]');
        let src = $visual_img.attr('src') || $visual_img.attr('data-src');
        if (src) {
            $visual.css({ backgroundImage: `url(${ src.replace(/\d+x\d+/, '800x600') })` });
        }
    }
}

function setupHotelItem_GalleryAndMap($hotel_item) {
    $hotel_item = $($hotel_item);
    let api_panel_response;
    watchIntersection($('.gallery-body, .map-body', $hotel_item), { threshold: .01 }, async function (observer) {
        if (!api_panel_response) {
            api_panel_response = await fetch('https://www.coral.ru/v1/hotellist/getpanel?' + new URLSearchParams({
                id:         $hotel_item.attr('data-hotelid'),
                providerId: $hotel_item.attr('data-providerid')
            }));
            const dp = new DOMParser();
            const doc = dp.parseFromString(await api_panel_response.text(), 'text/html');
            // Setup Gallery
            const gallery_sources = Array.from(doc.querySelectorAll('.galleryItem img[src]')).map(img => img.getAttribute('src'));
            await flickityReady();
            $('.gallery-fullscreen-progress .total-count', $hotel_item).text(gallery_sources.length);
            const $gallery_slider = $('.gallery-slider', $hotel_item).append(gallery_sources.map(src => {
                return $('<div class="gallery-slide"></div>').attr({ 'data-bg-url': `url(${ src })` }).get(0)
            })).flickity({
                cellSelector:    '.gallery-slide',
                groupCells:      true,
                contain:         true,
                prevNextButtons: true,
                pageDots:        true
            }).on('select.flickity', function (e, idx) {
                $($(this).data('flickity').selectedElements).each((idx, el) => {
                    const $el = $(el);
                    const lazy_url = $el.attr('data-bg-url');
                    if (lazy_url) {
                        $el.css('backgroundImage', lazy_url).removeAttr('data-bg-url');
                    }
                });
            }).on('staticClick.flickity', function (e, p, el, idx) {
                $(this).closest('.extended-view').get(0).requestFullscreen().then(() => {
                    $(this).flickity('resize');
                    setTimeout(() => $(this).flickity('select', idx), 510);
                });
            }).on('scroll.flickity', function (e, progress) {
                const current_slide = Math.round((gallery_sources.length - 1) * progress);
                $(this).find('.gallery-fullscreen-progress')
                    .attr('data-current-slide', current_slide + 1)
                    .get(0).style.setProperty('--indicator-width', `calc(${ progress * 100 }% - 2px)`);
            }).on('wheel', _.debounce(function (e) {
                e.stopPropagation();
                if (e.originalEvent.deltaX > 0) $(this).flickity('next')
                else if (e.originalEvent.deltaX < 0) $(this).flickity('previous')
            }, 40, { leading: true, trailing: false }));
            $('.gallery-fullscreen-progress', $hotel_item).on('click', function (e) {
                const set_progress_ratio = e.offsetX / $(this).width();
                const set_slide_idx = Math.round(set_progress_ratio * gallery_sources.length);
                $gallery_slider.flickity('select', set_slide_idx);
            });
            setTimeout(() => $('.flickity-enabled').flickity('resize'), 10);
            // Setup Google Maps
            await gmapsReady();
            const org_map_container = doc.querySelector('[data-lat][data-lng]');
            const gmap_el = $('.gmap', $hotel_item).get(0);
            const hotel_latlng = new google.maps.LatLng(org_map_container.dataset.lat, org_map_container.dataset.lng);
            const gmap = new google.maps.Map(gmap_el, {
                zoom:      11,
                center:    hotel_latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            new google.maps.Marker({
                position: hotel_latlng,
                map:      gmap,
                icon:     "/dist/img/pin.png",
                title:    $hotel_item.get(0).hotel_data.name
            });
        }
    });
}

function parseOriginalCard($hotel_item) {
    $hotel_item = $($hotel_item);
    const $original_contents = $hotel_item.get(0).$original_contents;
    const hotel_data = $hotel_item.get(0).hotel_data;
    hotel_data.partials = {};
    // name
    hotel_data.name = $original_contents.find('h2').text()
    // stars
    hotel_data.stars = new Array($original_contents.find('.rating').children().length);
    // reviews
    if (hotel_data.forceRating) {
        switch (hotel_data.forceRating.source) {
            case 'tophotels.ru':
                hotel_data.partials.reviewsMarkup = partial_tophotels;
                hotel_data.reviews = { value: hotel_data.forceRating.value };
        }
    } else {
        var $tripadvisor_el = $original_contents.find('.tripadvisor');
        const reviews_value = $tripadvisor_el.text();
        if (reviews_value) {
            const $img = $tripadvisor_el.find('img');
            hotel_data.reviews = { value: reviews_value, logoSrc: $img.attr('src') || $img.attr('data-src') };
            hotel_data.partials.reviewsMarkup = partial_tripadvisor;
        }
    }
    // elite service
    hotel_data.elite_service = !!$original_contents.find('.elite-service-logo').length;
    // location
    hotel_data.location = $original_contents.find('.location abbr').text();
    // tour details (infoblock)
    const $info_block = $original_contents.find('.infoblock');
    hotel_data.tour_details_html = $info_block.html();
    let [, , , room, meal] = $info_block.text().split(/\s*,\s*/);
    [room] = room.split(/\s*-\s*/);
    // accommodation (informations)
    hotel_data.available_options = [
        {
            icon_symbol: '',
            label:       'Тип питания:',
            list:        typesListWithSelectorAndContext('.informations .mealtype li', $original_contents, meal)
        },
        {
            icon_symbol: '',
            label:       'Тип номера:',
            list:        typesListWithSelectorAndContext('.informations .roomtype li', $original_contents, room)
        },
    ];
}

function setupHotelItem($hotel_item) {
    $hotel_item = $($hotel_item);
    $hotel_item.get(0).$original_contents = $hotel_item.children().remove();
    parseOriginalCard($hotel_item);
    const hotel_data = $hotel_item.get(0).hotel_data;
    $hotel_item.addClass('otium').append(Mustache.render(hotel_card_template, hotel_data, hotel_data.partials || {}));
    $hotel_item.find('.visual').on('click', function () {
        const $this = $(this);
        $this.closest('.otium-hotel-card').addClass('expanded');
        $this.closest('.item').addClass('focused').find('.switch-ctl').attr('data-selected-idx', 0);
        setTimeout(() => $.fn.flickity && $('.flickity-enabled', $hotel_item).flickity('resize'), 10);
    });
    $hotel_item.find('.hotel-location').on('click', function () {
        const $this = $(this);
        $this.closest('.otium-hotel-card').addClass('expanded');
        $this.closest('.item').addClass('focused').find('.switch-ctl').attr('data-selected-idx', 1);
        setTimeout(() => $.fn.flickity && $('.flickity-enabled', $hotel_item).flickity('resize'), 10);
    });
    $hotel_item.find('.switch-ctl li:not(.marker)').on('click', function () {
        const $this = $(this);
        $this.parent().attr('data-selected-idx', $this.index());
        setTimeout(() => $.fn.flickity && $('.flickity-enabled', $hotel_item).flickity('resize'), 10);
    });
    $hotel_item.find('button.dismiss').on('click', function () {
        const $this = $(this);
        const $extended_view = $this.closest('.extended-view');
        debugger;
        if ($extended_view.is(':fullscreen')) {
            document.exitFullscreen().then(() => {
                $extended_view.find('.flickity-enabled').flickity('resize');
            });
        } else {
            $this.closest('.otium-hotel-card').removeClass('expanded');
            $this.closest('.item').removeClass('focused');
        }
    });
    setupHotelItem_Visual($hotel_item);
    setupHotelItem_GalleryAndMap($hotel_item);
}

// ---------------------------------------------------------------------------------------------------------------------

$('head').append(`<style>${ css }</style>`);

let used_icons_ids = [];
let $hotel_items = $('.hotellist [data-hotelid]').filter(function (idx, el) {
    let hotel_data = _.find(hotels_data.hotels, { id: Number($(el).attr('data-hotelid')) });
    if (hotel_data) {
        used_icons_ids = used_icons_ids.concat(hotel_data.usps.map(usp => usp.iconID));
        const logo = _.find(hotels_data.logos, { id: hotel_data.logoID });
        if (logo.base64) hotel_data.logo_base64 = logo.base64;
        if (logo.src) hotel_data.logo_src = logo.src;
        hotel_data.usps?.forEach(usp => {
            usp.tooltip_markup = usp.details && Mustache.render(otium_tooltip_body_template, usp.details);
        });
        el.hotel_data = hotel_data;
    }
    return !!hotel_data;
});

used_icons_ids = _.uniq(used_icons_ids);

const icons_css = used_icons_ids.map(iid => {
    let icon = _.find(hotels_data.icons, { id: iid });
    return `.iconized.${ icon.id } .icon { background-image: url(data:image/svg+xml;base64,${ icon.normal }) } .iconized.${ icon.id }:hover .icon { background-image: url(data:image/svg+xml;base64,${ icon.hover }) }`;
}).join("\n");
$('head').append(`<style>${ icons_css }</style>`);

$hotel_items.each((idx, card) => {
    setupHotelItem(card);
});
$('.otium-hotel-card .iconized').tooltip({ template: otium_tooltip_template, html: true, delay: { show: 300, hide: 100 } });

$(document).on('click', function (e) {
    if ($(e.target).closest('.item.otium.focused .otium-hotel-card').length === 0) {
        $('.item.otium.focused').removeClass('focused').find('.expanded').removeClass('expanded');
    }
    $('.available-options-popin .options.open').filter((idx, el) => !$.contains(el, e.target)).removeClass('open');
});

$(document).on('click', '.available-options-popin ul', function () {
    $(this).toggleClass('open');
});