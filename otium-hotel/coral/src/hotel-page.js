import css from 'bundle-text:./css/hotel-page.less'
import markup from 'bundle-text:./markup/otium-hotel.html'
import partial_tripadvisor from 'bundle-text:./markup/partial-hotel-tripadvisor.html'
import partial_tophotels from 'bundle-text:./markup/partial-hotel-tophotels.html'
import eliteservice_popover from 'bundle-text:./markup/eliteservice-popover.html'
import * as Mustache from "mustache";

import config from './data/otium-all.yaml'


// =====================================================================================================================

Number.prototype.formatPrice = function() {
    var s;
    s = String(Math.round(this));
    return s.split('').reverse().join('').replace(/\d{3}(?=\d)/g, "$& ").split('').reverse().join('');
};

const popoverTemplateWithClass = (klass = '') => `<div class="popover ${klass}" role="tooltip"><div class="arrow ${klass}"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>`;

// =====================================================================================================================

const HOTEL_ID = Number($('h1[data-hotelid]').attr('data-hotelid'));
console.log('+++ HOTEL_ID: %o', HOTEL_ID);
const hotel_data = _.find(config.hotels, { id: HOTEL_ID });
console.log('+++ hotel_data: %o', hotel_data);

function extendHotelData(hotel_data) {
    hotel_data.partials = {};
    // stars
    hotel_data.stars = new Array($('.rating .material-icons').length);
    // name
    hotel_data.name = $('h1[data-hotelid]').text();
    // location
    hotel_data.location = $('.location > span').text();
    // reviews
    if (hotel_data.forceRating) {
        switch (hotel_data.forceRating.source) {
            case 'tophotels.ru':
                hotel_data.partials.reviewsMarkup = partial_tophotels;
                hotel_data.reviews = {
                    value: hotel_data.forceRating.value,
                    count: hotel_data.forceRating.count
                };
        }
    } else {
        var $tripadvisor_el = $('.tripadvisor');
        const reviews_value = $tripadvisor_el.find('.pointNumber').text();
        if (reviews_value) {
            const $img = $tripadvisor_el.find('img');
            const reviews_count = Number($tripadvisor_el.find('.commentCountText').text().replace(/\D/g, '')).formatPrice();
            hotel_data.reviews = {
                value: reviews_value,
                logoSrc: $img.attr('src') || $img.attr('data-src'),
                count: reviews_count
            };
            hotel_data.partials.reviewsMarkup = partial_tripadvisor;
        }
    }
    // ELITESERVICE
    hotel_data.elite_service = !!$('.eliteicon').length;

    return hotel_data;
}

if (hotel_data) {
    $('head').append(`<style>${ css }</style>`);

    extendHotelData(hotel_data);
    let $markup = $(Mustache.render(markup, hotel_data, hotel_data.partials || {}));
    $('.notcritical').prepend($markup);

    $markup.find('.bread-crumbs').empty().append($('.bcrumb'));

    const $original_hotelgallery_module = $('[data-module="hotelgallery"]');
    const is_exclusive = !!$original_hotelgallery_module.find('.hotelgallery-wrap.exclusive').removeClass('exclusive').length;
    const $visuals_gallery = $markup.find('.visuals-gallery');
    $visuals_gallery.empty().append($original_hotelgallery_module);

    let badges = [];
    if (is_exclusive) badges.push('<div class="badge exclusive">EXCLUSIVE</div>');
    if (hotel_data.SFC) badges.push('<a href="https://www.coral.ru/sunfamilyclub/" target="_blank" class="badge sfc"></a>');
    if (hotel_data.USFC) badges.push('<a href="https://www.coral.ru/sunfamilyclub/" target="_blank" class="badge usfc"></a>');
    if (badges.length) {
        const $badges_stack = $('<div class="badges-stack"></div>').append(badges);
        $visuals_gallery.append($badges_stack);
    }



    $('section.otium-hotel .elite-service').popover({
        template:  popoverTemplateWithClass('eliteservice'),
        content:   eliteservice_popover,
        html:      true,
        placement: 'top',
        trigger:   'hover'
    });


}

