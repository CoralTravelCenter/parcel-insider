import config from './hotels-data.yaml'
import css from 'bundle-text:./insider.less';

var hid = Number($('[data-module="hoteldetail"]').attr('data-hotelid'));

if (hid) {
    $('head').eq(0).append(`<style>${ css }</style>`)
    const hotel = config.hotels.find(hotel => hotel.id === hid);
    if (hotel) {
        let sfc_markups = hotel.blocks.map(block_or_id => {
            return `<p>${ config.add_markup[block_or_id] || block_or_id }</p>`;
        });
        if (sfc_markups.length) {
            $('.hotelfacilities .facilitytabcontainer ul.nav').append($('<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-sfc">SFC</a></li>'));
            $('.hotelfacilities .tab-content').append($(`<div class="tab-pane" id="tab-sfc">${ sfc_markups.join('') }</div>`));
        }
    }
}