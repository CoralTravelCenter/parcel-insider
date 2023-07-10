import css from 'bundle-text:./search-results.less';
import hotel_ids from './bestoffer-hotel-ids.json';

let css_injected = false;
function injectCSSIfNeeded() {
    if (!css_injected) {
        $('head').append(`<style>${ css }</style>`);
        css_injected = true;
    }
}

$('.row.item[data-package-layer]').each((idx, item) => {
    const $item = $(item);
    const package_layer = JSON.parse($item.attr('data-package-layer'));
    if (hotel_ids.includes(package_layer.Hotel.Id)) {
        injectCSSIfNeeded();
        $item.find('> .image').addClass('recommended bestoffer');
    }
});