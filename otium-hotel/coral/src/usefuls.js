import {preload} from "/common/useful.js";
export const popoverTemplateWithClass = (klass = '') => `<div class="popover ${ klass }" role="tooltip"><div class="arrow ${ klass }"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>`;

export function demanglePrice($container) {
    let $rubs = $container.children('[class]');
    const kops_text = $container.children(':not([class])').text() || $container.next().text();
    let kops = kops_text.replace(/\D/g, '') * 1;
    let visible_digits = $rubs.filter((idx, el) => !!el.clientWidth).toArray();
    visible_digits.sort((a, b) => Number($(a).css('order')) - Number($(b).css('order')));
    return visible_digits.map(el => el.textContent).join('') * 1 + kops / 100;
}

export function visuallyDemanglePrice(markup, room_idx, variant_idx) {
    const $div = $(document.createElement('div'));
    $div.html(markup);
    $div.appendTo('body');
    const $price_els_container = $div.find('.room.row').eq(room_idx).find('.variant').eq(variant_idx).find('.price > div');
    const kops_text = $price_els_container.children(':not([class])').text() || $price_els_container.next().text();
    let kops = kops_text.replace(/\D/g, '') * 1;
    const price = [...$price_els_container.children().filter((idx, el) => {
        const $el = $(el);
        return $el.is('[class]:visible') && !!parseFloat($el.css('font-size')) && !!parseFloat($el.css('width')) && $el.css('overflow') !== 'hidden';
    })].sort((a, b) => Number($(a).css('order')) - Number($(b).css('order'))).map(el => el.textContent).join('') * 1 + kops / 100;
    $div.remove();
    return price;
}

export function waitForGlobalVar(prop, do_things) {
    (function () {
        try {
            eval(prop);
        } catch (ex) {
            setTimeout(arguments.callee, 200);
        }
        do_things();
    })();
}

let flickityPromise = null;
export function flickityReady() {
    flickityPromise ||= new Promise(resolve => {
        preload('https://cdnjs.cloudflare.com/ajax/libs/flickity/2.3.0/flickity.pkgd.min.js', resolve);
    });
    return flickityPromise;
}

export function mostRecentQuery() {
    const search_params_data = JSON.parse($(".container-tabItemWrap").attr("data-searchparams"));
    const requestType = search_params_data.RequestType;
    let query = search_params_data[{
        packageSearch: 'PackageSearchQuery',
        onlyHotel: 'OnlyHotelQuery'
    }[requestType]];
    const apiEndpoint = {
        packageSearch: '/v1/package/search',
        onlyHotel: '/v1/onlyhotel/search'
    }[requestType];
    return {
        requestType,
        query,
        apiEndpoint
    };
}