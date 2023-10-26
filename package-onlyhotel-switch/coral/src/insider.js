import css from 'bundle-text:./styles.less';
import markup from 'bundle-text:./markup.html';

// =====================================================================================================================
const this_script_id = 'package-onlyhotel-switch';
if (window[this_script_id]) throw `${ this_script_id } -> stop`;
window[this_script_id] = true;
// =====================================================================================================================

function mostRecentQuery() {
    const search_params_data = JSON.parse($(".container-tabItemWrap").attr("data-searchparams"));
    const requestType = search_params_data.RequestType;
    let query = search_params_data[{
        packageSearch: 'PackageSearchQuery',
        onlyHotel: 'OnlyHotelQuery'
    }[requestType] || 'PackageSearchQuery'];
    const apiEndpoint = {
        packageSearch: '/v1/package/search',
        onlyHotel: '/v1/onlyhotel/search'
    }[requestType] || '/v1/package/search';
    return { requestType, query, apiEndpoint };
}

const recentQuery = mostRecentQuery();
const recentQueryParams = recentQuery.query;
console.log('+++ recentQuery: %o', recentQuery);

$('head').eq(0).append(`<style>${ css }</style>`);
$('.hoteldetailpage .price-wrap').before(markup);

if (recentQuery.requestType !== 'onlyHotel') {
    let { Destination, BeginDate, EndDate, Guest, SelectedDate, Acc } = recentQueryParams;
    BeginDate = moment(BeginDate).format('YYYY-MM-DD');
    EndDate = moment(EndDate).format('YYYY-MM-DD');
    Destination = Destination[0];
    Destination.ModelType = '5';
    Destination.RecordSourceType = '2';
    $.post('/v1/onlyhotel/search', {
        Destination,
        BeginDate: moment(SelectedDate).format('YYYY-MM-DD'),
        EndDate: moment(SelectedDate).add({ d: Acc[0] }).format('YYYY-MM-DD'),
        Guest
    }).done((response) => {
        const a = $('.package-onlyhotel-switch').removeClass('yet-not-defined').find('a.onlyhotel');
        a.attr('href', response);
        a.on('click', () => ym(553380, 'reachGoal', 'hotel-butonlyhotel'));
    });
} else {
    let { Destination, BeginDate, EndDate, Guest } = recentQueryParams;
    Destination.ModelType = 5;
    Destination.RecordSourceType = 2;
    const { name: departure_label, value: departure_id } = window.global.getActiveDeparture();
    $.post('/v1/package/search', {
        isCharter: true,
        isRegular: false,
        Departures: [{ Id: departure_id, Label: departure_label }],
        Destination: [Destination],
        BeginDate: moment(BeginDate).subtract({ d: 3 }).format('YYYY-MM-DD'),
        EndDate: moment(BeginDate).add({ d: 3 }).format('YYYY-MM-DD'),
        DateRange: 3,
        SelectedDate: moment(BeginDate).format('YYYY-MM-DD'),
        Acc: [moment.duration(moment(EndDate).diff(moment(BeginDate))).as('days')],
        Guest,
    }).done(response => {
        const a = $('.package-onlyhotel-switch').removeClass('yet-not-defined').find('a.package');
        a.attr('href', response);
        a.on('click', () => ym(553380,'reachGoal','hotel-buttour'));
    });

}
