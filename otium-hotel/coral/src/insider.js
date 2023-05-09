import css from 'bundle-text:./css/styles.less'
import markup from 'bundle-text:./markup/otium-hotel.html'

$('head').append(`<style>${ css }</style>`);

let $markup = $(markup);
$('.notcritical').prepend($markup);

$markup.find('.visuals-gallery').empty().append($('[data-module="hotelgallery"]'));
let $hotel_name_location_rating = $('.header-left');
$hotel_name_location_rating.find('.ratingWrapper').removeAttr('class').addClass('stars');
$markup.find('.hotel-name-location').empty().append($hotel_name_location_rating);
