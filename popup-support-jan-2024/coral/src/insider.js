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
    } else if (atOnlyhotel()) {
        cid = Number($('input.location-input.location-destination').attr('dataid'));
    }
    return ~[1, 12, 31, 33].indexOf(cid);
}

function departOnJanuary() {
    const depart_moment = moment($('#departureDateRangePickerInput').val().split(/\D/).reverse().join('-'));
    return depart_moment.isSame('2024-01-01', 'month');
}

(async function () {
    const now = moment();
    if (phase(now) === 1 && rightCountry() && departOnJanuary()) {
        $('head').append(`<style>${ css }</style>`);
        $('body').append(markup);
        $('#popup-support-jan-2024-modal').modal();
    }
})();

