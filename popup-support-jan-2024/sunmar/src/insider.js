// =====================================================================================================================
const this_script_id = 'popup-support-jan-2024';
if (window[this_script_id]) throw `${ this_script_id } -> stop`;
window[this_script_id] = true;
// =====================================================================================================================

import markup from 'bundle-text:./markup.html';
import css from 'bundle-text:./insider.less';
import { fetchNowMoment } from '/common/useful.js';

function phase(now_moment) {
    return now_moment.isBefore(moment('2024-01-19T16:00:00Z')) ? 1 : 2;
}

function atPackage() {
    return ~self.location.pathname.indexOf('/packagetours/');
}
function atOnlyhotel() {
    return ~self.location.pathname.indexOf('/onlyhotel/');
}

function rightCountry() {
    let cid;
    if (atPackage()) {
        cid = Number($('input.packageSearch__destinationInput').attr('countryid'));
        return ~[1, 12, 31, 33].indexOf(cid);
    } else if (atOnlyhotel() && window.insider_object?.listing?.items?.length) {
        const country_part = window.insider_object.listing.items[0].url.split('/')[0];
        return ~['turkey', 'united-arab-emirates', 'egypt', 'thailand'].indexOf(country_part);
    }
    return false;
}

function departOnJanuary() {
    let depart_moment;
    if (atPackage()) {
        depart_moment = moment($('#departureDateRangePickerInput').val().split(/\D/).reverse().join('-'));
    } else if (atOnlyhotel()) {
        depart_moment = moment($('input.datepicker-input').val().split(/\s*-\s*/)[0].split(/\D/).reverse().join('-'));
    }
    return depart_moment.isSame('2024-01-01', 'month');
}

function shownInSession() {
    return sessionStorage.getItem(this_script_id);
}

function showToday(now_moment) {
    const ls_key = now_moment.format('YYYY-MM-DD');
    let ls_item = localStorage.getItem(this_script_id);
    if (ls_item) ls_item = JSON.parse(ls_item);
    return (ls_item ?? {})[ls_key] ?? 0;
}

function incrementShownToday(now_moment) {
    const ls_key = now_moment.format('YYYY-MM-DD');
    const count = showToday(now_moment) + 1;
    localStorage.setItem(this_script_id, JSON.stringify({ [ls_key]: count }));
}

(async function () {
    const now = moment();
    if (phase(now) === 1 && rightCountry() && !shownInSession() && showToday(now) < 3) {
    // if (phase(now) === 1 && rightCountry()) {
        $('head').append(`<style>${ css }</style>`);
        $('body').append(markup);
        const $modal = $('#popup-support-jan-2024-modal');
        $('[data-action="dismiss"]').on('click', () => $modal.modal('hide'));
        $modal.modal();
        sessionStorage.setItem(this_script_id, 1);
        incrementShownToday(now);
    }
})();

