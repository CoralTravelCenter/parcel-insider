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
        console.log('+++ visible: %o', this);
        if (!api_panel_response) {
            api_panel_response = await fetch('https://www.coral.ru/v1/hotellist/getpanel?' + new URLSearchParams({
                id:         $hotel_item.attr('data-hotelid'),
                providerId: $hotel_item.attr('data-providerid')
            }));
            const dp = new DOMParser();
            const doc = dp.parseFromString(await api_panel_response.text(), 'text/html');
            const gallery_sources = Array.from(doc.querySelectorAll('.galleryItem img[src]')).map(img => img.getAttribute('src'));
            await flickityReady();
            console.log('...constructing gallery');
            $('.gallery-slider', $hotel_item).append(gallery_sources.map(src => {
                return $('<div class="gallery-slide"></div>').attr({ 'data-bg-url': `url(${ src })` }).get(0)
            })).flickity({
                cellSelector:    '.gallery-slide',
                groupCells:      true,
                contain:         true,
                prevNextButtons: false,
                pageDots:        false
            }).on('select.flickity', function (e, idx) {
                $($(this).data('flickity').selectedElements).each((idx, el) => {
                    const $el = $(el);
                    const lazy_url = $el.attr('data-bg-url');
                    if (lazy_url) {
                        $el.css('backgroundImage', lazy_url).removeAttr('data-bg-url');
                    }
                });
            }).on('wheel', _.debounce(function (e) {
                e.stopPropagation();
                console.log(e);
                if (e.originalEvent.deltaX > 0) $(this).flickity('next')
                else if (e.originalEvent.deltaX < 0) $(this).flickity('previous')
            }, 40, { leading: true, trailing: false }));
            setTimeout(() => $('.flickity-enabled').flickity('resize'), 10);
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