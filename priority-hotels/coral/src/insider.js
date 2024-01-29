// =====================================================================================================================
const this_script_id = 'priority-hotels';
if (window[this_script_id]) throw `${ this_script_id } -> stop`;
window[this_script_id] = true;
// =====================================================================================================================

import { queryParam, params2query } from "/common/useful.js";

const hotel_ids = [20518, 15367, 3815, 55032, 11013, 21601, 8028, 874, 12879, 13448, 12880, 29449, 793, 30511, 737, 52247, 52527, 52524, 16482, 16483, 52525, 345, 10197, 30303, 9910, 682, 11051, 949, 656, 311, 30477, 768, 12914, 981, 52520, 52521, 52522, 52528, 27570, 565, 34337, 10105, 10225, 56305, 33418, 58251, 56394, 17847, 722, 10825, 4407, 30730, 52523, 16396, 358, 25495, 799, 4233, 50385, 800, 6936, 30897, 12520, 8213, 6975, 9464, 5205, 5217, 5174, 9408, 15254, 6659];

function atPackage() {
    return ~self.location.pathname.indexOf('/packagetours/');
}
function atOnlyhotel() {
    return ~self.location.pathname.indexOf('/onlyhotel/');
}

function rightCountry() {
    let cid;
    const country_tab = ['turkey'];
    if (atPackage()) {
        cid = Number($('input.packageSearch__destinationInput').attr('countryid'));
        return country_tab[[1].indexOf(cid)];
    } else if (atOnlyhotel() && window.insider_object?.listing?.items?.length) {
        const country_part = window.insider_object.listing.items[0].url.split('/')[0];
        return country_tab[['turkey'].indexOf(country_part)];
    }
    return false;
}

if (rightCountry()) {
    const query_params = queryParam(undefined, location.href);
    const filters_black_list = ["Rg","Lt", "Hf", "Rt", "Rf", "Bch"];
    const filters_used = Object.keys(query_params.f);
    const blacklisted = filters_used.some(filter_key => filters_black_list.includes(filter_key));
    if (query_params.f && !blacklisted) {
        query_params.f.Hid = hotel_ids;
        console.log('+++ query_params: %o', query_params);
        const priority_href = location.pathname + '?' + params2query(query_params);
        fetch(priority_href).then(response => {
            response.text().then(source => {
                const dp = new DOMParser();
                const doc =  dp.parseFromString(source, 'text/html');
                const priority_items = doc.querySelectorAll('.row.item[data-package-layer]');
                const priority_css = doc.querySelector('[data-module="hotellist"] > style');
                const items = document.querySelectorAll('.row.item[data-package-layer]');
                priority_css && document.querySelector('[data-module="hotellist"]').prepend(priority_css);
                [...priority_items].forEach((priority_item, idx) => {
                    if (items[idx]) {
                        const img_jquery_event_descriptor = $._data($(items[idx]).find('img[data-getpanel]').get(0), 'events')?.click[0];
                        const abbr_jquery_event_descriptor = $._data($(items[idx]).find('abbr[data-getpanel]').get(0), 'events')?.click[0];
                        items[idx].replaceWith(priority_item);
                        $(priority_item).find('img[data-getpanel]').on('click', img_jquery_event_descriptor.handler);
                        $(priority_item).find('abbr[data-getpanel]').on('click', abbr_jquery_event_descriptor.handler);
                    }
                });
            });
        });
    }
}
