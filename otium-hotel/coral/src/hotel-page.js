import css from 'bundle-text:./css/hotel-page.less'
import markup from 'bundle-text:./markup/otium-hotel.html'
import partial_tripadvisor from 'bundle-text:./markup/partial-hotel-tripadvisor.html'
import partial_tophotels from 'bundle-text:./markup/partial-hotel-tophotels.html'
import eliteservice_popover from 'bundle-text:./markup/eliteservice-popover.html'
import additives_popover from 'bundle-text:./markup/additives-popover.html'
import coralbonus_popover from 'bundle-text:./markup/coralbonus-popover.html'
import installment_info_popover from 'bundle-text:./markup/installment-info-popover.html'
import otium_tooltip_template from 'bundle-text:./markup/usp-tooltip.html'
import otium_tooltip_body_template from 'bundle-text:./markup/usp-tooltip-body.html'
import * as Mustache from "mustache";
import { popoverTemplateWithClass, demanglePrice } from "./usefuls.js";

import config from './data/otium-all.yaml'


// =====================================================================================================================

Number.prototype.formatPrice = function() {
    var s;
    s = String(Math.round(this));
    return s.split('').reverse().join('').replace(/\d{3}(?=\d)/g, "$& ").split('').reverse().join('');
};

Number.prototype.decoratedPriceHTML = function() {
    let value = Math.floor(this).formatPrice();
    let cents = Math.round(this * 100 % 100);
    let lots_of_money_klass = this > 1000000 ? 'lots-of-money' : '';
    return `<div class="decorated-price ${ lots_of_money_klass }"><span class="value">${ value }</span><span class="cents">,${ cents.zeroPad(2) }</span><span class="currencyfont currency-symbol">₽</span></div>`
}
Number.prototype.decoratedCoralBonusHTML = function (popover_content_html) {
    return `<div class="coralbonus-badge" tabindex="-1" data-content='${ popover_content_html }'><div class="value-box"><div class="value">${ this.formatPrice() }</div></div><div class="label">на карту CoralBonus</div></div>`
}

String.prototype.zeroPad = function(len, c) {
    var s;
    s = '';
    c || (c = '0');
    len || (len = 2);
    len -= this.length;
    while (s.length < len) s += c;
    return s + this;
};
Number.prototype.zeroPad = function(len, c) {
    return String(this).zeroPad(len, c);
};

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

    // pricing
    let price = demanglePrice($('.price-big'));
    let original_price = Number($('.oldprice').text().replace(/[^0-9.,]/g, '').replace(',','.'));
    // pricing -> instalement
    hotel_data.installment_value_formatted = Math.round(price / 36 * 1.25).formatPrice();
    // pricing -> final price
    hotel_data.final_price_html = price.decoratedPriceHTML();
    // pricing -> original
    if (original_price) {
        hotel_data.original_price_html = original_price.decoratedPriceHTML();
    }
    // pricing -> additives
    const $icon_price_info = $('.gallery-right .icon-price-information');
    let additives_html = $icon_price_info.attr('data-content');
    let is_package_tour =  !$('.flightincluded').text().match(/\s+не\s+/);
    if (additives_html) {
        hotel_data.additives = true;
        let mandatories_total_html = $icon_price_info.siblings('span').get(0).innerHTML;
        let additives_list = hotel_data.additives_list = $(additives_html).filter('div').map((idx, div) => {
            let [,akey,,avalue] = div.textContent.replace(/доплата за /i, '').match(/(.+?)(\s+)([0-9.,\s]+)/);
            return { akey, avalue };
        }).toArray();
        hotel_data.mandatories_total_html = mandatories_total_html;
        hotel_data.additives_popover_html = Mustache.render(additives_popover, { list: additives_list });
    }
    // CoralBonus
    if (hotel_data.CoralBonusPercent) {
        const bonus_value = Math.round(price / 100 * hotel_data.CoralBonusPercent);
        hotel_data.coralbonus_html = bonus_value.decoratedCoralBonusHTML(Mustache.render(coralbonus_popover, { value_formatted: bonus_value.formatPrice() }));
    }
    // Early booking promo
    let $eb_container = $('.gallery-right .ebcontainer');
    if ($eb_container.length) {
        hotel_data.early_booking_present = true;
        hotel_data.early_booking_text = $eb_container.find('.btn').text();
        hotel_data.early_booking_info_html = $eb_container.find('.ebinfo').html();
    }
    // Hotel info
    if (hotel_data.hotelInfoURL) {

    } else {
        hotel_data.about_snip_html = $('.gallery-right .hotelinfo p:nth-of-type(2)')[0]?.outerHTML || '';
    }
    // USPS
    hotel_data.usps?.forEach(usp => {
        usp.tooltip_markup = usp.details && Mustache.render(otium_tooltip_body_template, usp.details);
    });

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

    $markup.find('.iconized').tooltip({ template: otium_tooltip_template, html: true, delay: { show: 300, hide: 100 } });

    $('.installment-cell').popover({
        template:  popoverTemplateWithClass('sber'),
        content:   installment_info_popover,
        html:      true,
        placement: 'auto',
        trigger:   'hover'
    });
    $('section.otium-hotel .elite-service').popover({
        template:  popoverTemplateWithClass('eliteservice'),
        content:   eliteservice_popover,
        html:      true,
        placement: 'top',
        trigger:   'hover'
    });
    $('.additives').popover({
        template:  popoverTemplateWithClass('additives'),
        html:      true,
        placement: 'top',
        trigger:   'hover'
    });
    $('.coralbonus-badge').popover({
        template:  popoverTemplateWithClass('coralbonus'),
        html:      true,
        placement: 'top',
        trigger:   'hover focus'
    });


}

