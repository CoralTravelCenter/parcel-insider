import css from 'bundle-text:./css/search-results.less'
import hotels_data from './data/otium-all.yaml'
import hotel_card_template from 'bundle-text:./markup/otium-hotel-card.html'
import * as Mustache from "mustache";
import { preload, responsiveHandler, watchIntersection } from "../../../common/useful.js";

let flickityPromose;
async function flickityReady() {
    flickityPromose ||= new Promise(resolve => {
        preload('https://cdnjs.cloudflare.com/ajax/libs/flickity/2.3.0/flickity.pkgd.min.js', () => resolve());
    });
    return flickityPromose;
}
let gmapsPromose;
async function gmapsReady() {
    gmapsPromose ||= new Promise(resolve => {
        preload('https://maps.googleapis.com/maps/api/js?key=AIzaSyBnhDu-BFnKo1i6iHDLoHix0vfpwm1nnrM', () => resolve());
    });
    return gmapsPromose;
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
                    setTimeout(() => {
                        console.log("*** idx: %o", idx);
                        $(this).flickity('select', idx);
                    }, 510);
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
                title:    "image title"
            });
        }
    });
}

function setupHotelItem($hotel_item) {
    $hotel_item = $($hotel_item);
    $hotel_item.get(0).$original_contents = $hotel_item.children().remove();
    $hotel_item.addClass('otium').append(Mustache.render(hotel_card_template, $hotel_item.get(0).hotel_data));
    $hotel_item.find('.visual').on('click', async function () {
        const $this = $(this);
        $this.closest('.otium-hotel-card').toggleClass('expanded');
        $this.closest('.item').toggleClass('focused');
    });
    $hotel_item.find('.switch-ctl li:not(.marker)').on('click', function () {
        const $this = $(this);
        $this.parent().attr('data-selected-idx', $this.index());
        setTimeout(() => $('.flickity-enabled').flickity('resize'), 0);
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

let $hotel_items = $('.hotellist [data-hotelid]').filter(function (idx, el) {
    let hotel_data = _.find(hotels_data.hotels, { id: Number($(el).attr('data-hotelid')) });
    if (hotel_data) el.hotel_data = hotel_data;
    return !!hotel_data;
});

$hotel_items.each((idx, card) => {
    setupHotelItem(card);
});

$(document).on('click', function (e) {
    if ($(e.target).closest('.item.otium.focused .otium-hotel-card').length === 0) {
        $('.item.otium.focused').removeClass('focused').find('.expanded').removeClass('expanded');
    }
});

