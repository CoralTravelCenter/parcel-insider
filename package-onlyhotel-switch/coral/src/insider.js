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
        $('.package-onlyhotel-switch').removeClass('yet-not-defined').find('a.onlyhotel').attr('href', response);
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
        $('.package-onlyhotel-switch').removeClass('yet-not-defined').find('a.package').attr('href', response);
    });

}

let ONLYHOTEL_QUERY = {
    "Destination": {
        "Id": "Hotel8230",
        "DataId": 8230,
        "TopDataId": 31,
        "ParentDataId": 840,
        "FullTitle": "BAHI AJMAN PALACE HOTEL (BAHI AJMAN PALACE HOTEL)",
        "Title": "BAHI AJMAN PALACE HOTEL",
        "TitleRu": "BAHI AJMAN PALACE HOTEL",
        "ParentTitle": "Ajman - Центр города, Ajman, United Arab Emirates",
        "ParentTitleRu": "Аджман (Ajman) - Центр города, Аджман (Ajman), ОАЭ",
        "Weight": 1,
        "Score": 104.08000000001635,
        "ModelType": "hotel",
        "HasAirport": false,
        "Priority": 4,
        "RecordSourceType": "packageAndHotel",
        "NearestAirports": [83, 139, 6650, 144, 87]
    },
    "BeginDate": "2023-12-20T00:00:00Z",
    "EndDate": "2023-12-27T00:00:00Z",
    "Guest": {
        "Adults": 2,
        "Children": []
    },
    "SearchedGuest": null,
    "Hotels": null,
    "HotelConcept": null,
    "Page": 1,
    "CurrencyId": 0
};

// isCharter: true
// isRegular: false
// Guest[Adults]: 2
// SelectedDate: 2023-12-20
// DateRange: 3
// BeginDate: 2023-12-17
// EndDate: 2023-12-23
// Acc[]: 7

// Departures[0][Id]: 2671
// Departures[0][Label]: Москва

// Destination[0][Id]: Hotel8230
// Destination[0][DataId]: 8230
// Destination[0][TopDataId]: 31
// Destination[0][ParentDataId]: 840
// Destination[0][FullTitle]: BAHI AJMAN PALACE HOTEL (BAHI AJMAN PALACE HOTEL)
// Destination[0][Title]: BAHI AJMAN PALACE HOTEL
// Destination[0][TitleRu]: BAHI AJMAN PALACE HOTEL
// Destination[0][ParentTitle]: Ajman - Центр города, Ajman, United Arab Emirates
// Destination[0][ParentTitleRu]: Аджман (Ajman) - Центр города, Аджман (Ajman), ОАЭ
// Destination[0][Weight]: 1
// Destination[0][Score]: 104.08000000001635
// Destination[0][ModelType]: 5
// Destination[0][HasAirport]: false
// Destination[0][Priority]: 4
// Destination[0][RecordSourceType]: 2
// Destination[0][NearestAirports][]: 83
// Destination[0][NearestAirports][]: 139
// Destination[0][NearestAirports][]: 6650
// Destination[0][NearestAirports][]: 144
// Destination[0][NearestAirports][]: 87