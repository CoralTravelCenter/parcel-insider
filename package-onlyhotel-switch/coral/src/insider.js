import css from 'bundle-text:./styles.less';
import markup from 'bundle-text:./markup.html';

// =====================================================================================================================
const this_script_id = 'package-onlyhotel-switch';
if (window[this_script_id]) throw `${ this_script_id } -> stop`;
window[this_script_id] = true;
// =====================================================================================================================

import { getNextData, hostReactAppReady, queryParam } from "./usefuls";

(async function () {
    await hostReactAppReady();
    const api_host = location.hostname.replace('www', 'b2capi');
    const searchCriteria = await obtainSearchCriteria(api_host);
    if (searchCriteria) {
        // console.log('=== searchCriteria: %o', searchCriteria);
        const isPackage = queryParam('p') == 1;
        // console.log('=== isPackage: %o', isPackage);
        if (isPackage) {
            delete searchCriteria.departureLocations;
        } else {
            // props.pageProps.meta.departures
            const __next_data__ = getNextData();
            searchCriteria.departureLocations = [
                __next_data__?.props?.pageProps?.meta?.departures.find(dep => !!dep.isCurrent)
            ];
        }
        const { result: { queryParam: qp_param, redirectionUrl } } = await obtainHotelLink(api_host, !isPackage, searchCriteria);
        if (qp_param && redirectionUrl) {
            const alt_link = `${ redirectionUrl }?qp=${ qp_param }&p=${ isPackage ? 2 : 1 }&item_variant_switch=${ isPackage ? 'onlyhotel' : 'tour' }`;
            // console.log('+++ alt_link: %o', alt_link);
            const switch_el = injectMarkup();
            const link_sel = isPackage ? '.onlyhotel' : '.package';
            switch_el.querySelector(link_sel).href = alt_link;
        }
    }
})();

function injectMarkup() {
    const css_el = document.createElement('style');
    css_el.textContent = css;
    document.head.appendChild(css_el);
    const card_el = document.getElementById('hotelDetailSummaryCard');
    card_el.insertAdjacentHTML('afterbegin', markup);
    return card_el.querySelector('.package-onlyhotel-switch');
}

async function obtainSearchCriteria(api_host) {
    return new Promise(async resolve => {
        const qp = queryParam('qp');
        if (qp) {
            const { result: { searchCriterias: searchCriteria } } = await fetch(`//${ api_host }/PackageTourHotelProduct/PriceSearchDecrypt`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ queryParam: encodeURIComponent(qp) })
            }).then(response => response.json());
            resolve(searchCriteria);
        } else {
            resolve();
        }
    });
}

async function obtainHotelLink(api_host, search_package, searchCriteria) {
    const api_endpoint = search_package ? '/PackageTourHotelProduct/PriceSearchEncrypt' : '/OnlyHotelProduct/PriceSearchEncrypt';
    return new Promise(async resolve => {
        const response_json = await fetch(`//${ api_host }${ api_endpoint }`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchCriteria)
        }).then(response => response.json());
        resolve(response_json);
    });
}