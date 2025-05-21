import { globallyDefined, myCookie, params2query, queryParam } from "./usefuls";

const api_host = {
    'www.coral.ru': 'b2capi.coral.ru',
    'b2cpilotui.coral.ru': 'b2cpilotapi.coral.ru'
}[location.hostname];

globallyDefined('mindbox').then(async () => {
    const { qp, p } = queryParam();
    const isPackageTour = p == 1;
    const decrypt_endpoint = isPackageTour ? 'PackageTourHotelProduct' : 'OnlyHotelProduct';
    location.hostname.indexOf('pilot')
    const query = await fetch(`//${ api_host }/${ decrypt_endpoint }/PriceSearchDecrypt`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queryParam: encodeURIComponent(qp) })
    }).then(response => response.json());

    let viewed_countries = [];
    try {
        const { result: { searchCriterias: { arrivalLocations } } } = query;
        viewed_countries = arrivalLocations.map(loc => {
            const country_id_src = loc.type === 0 ? loc.id : loc.parent.countryId;
            return country_id_src.split('-').at(0);
        });
        viewed_countries = [...new Set(viewed_countries)];
    } catch (ex) {
        console.warn('*** Failed to parse/process query: %o', query);
    }

    try {
        viewed_countries.forEach(country_id => {
            const qparams = params2query({
                endpointId: 'coral-stage.Website',
                operation: "Website.ViewCategory",
                deviceUUID: myCookie('mindboxDeviceUUID')
            });
            fetch(`//api.s.mindbox.ru/v3/operations/async?${ qparams }`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify({ viewProductCategory: { productCategory: { ids: { hotels: country_id } } } })
            });
        });
    } catch (ex) {
        console.warn('*** Failed to invoke operation Website.ViewCategory: %o', ex);
    }
});
