import css from 'bundle-text:./hotel-page.less';
import hotel_ids from './bestoffer-hotel-ids.json';

const hotel_id = Number($('h1[data-hotelid]').attr('data-hotelid'));

if (hotel_id && hotel_ids.includes(hotel_id)) {
    $('head').append(`<style>${ css }</style>`);
    $('.hotelgallery-wrap').addClass('recommended bestoffer');
}