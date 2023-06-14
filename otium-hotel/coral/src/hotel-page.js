import css from 'bundle-text:./css/hotel-page.less'
import markup from 'bundle-text:./markup/otium-hotel.html'

import config from './data/otium-all.yaml'

const HOTEL_ID = Number($('h1[data-hotelid]').attr('data-hotelid'));
console.log('+++ HOTEL_ID: %o', HOTEL_ID);
const hotel_data =  _.find(config.hotels, { id: HOTEL_ID });
console.log('+++ hotel_data: %o', hotel_data);

if (hotel_data) {
    $('head').append(`<style>${ css }</style>`);
    let $markup = $(markup);
    $('.notcritical').prepend($markup);

    $markup.find('.bread-crumbs').empty().append($('.bcrumb'));

    $markup.find('.visuals-gallery').empty().append($('[data-module="hotelgallery"]'));
    let $hotel_name_location_rating = $('.header-left');
    $hotel_name_location_rating.find('.ratingWrapper').removeAttr('class').addClass('stars');
    $markup.find('.hotel-name-location').empty().append($hotel_name_location_rating);

    $markup.find('.reviews-info .rate-value').text(hotel_data.tophotelsRating.value);
    $markup.find('.reviews-info .count-value').text(hotel_data.tophotelsRating.count);
}

