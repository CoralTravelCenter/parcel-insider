import { globallyDefined, myCookie, params2query } from "./usefuls";

globallyDefined('mindbox').then(() => {
    const item = dataLayer.find(layer => layer.event === 'view_item');
    if (item) {
        const [{ item_id: hotel_id, price: offer_price }] = item.ecommerce.items;
        const qparams = params2query({
            endpointId: 'coral-stage.Website',
            operation: "Website.ViewHotel",
            deviceUUID: myCookie('mindboxDeviceUUID')
        });
        const viewProduct = { product: { ids: { hotels: hotel_id } } };
        if (offer_price) viewProduct.price = offer_price;
        fetch(`//api.s.mindbox.ru/v3/operations/async?${ qparams }`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ viewProduct })
        });
    }
});