import hotels_data from './data/otium-all.yaml'

let $hotel_cards = $('.hotellist [data-hotelid]').filter((idx, el) => {
    return !!_.find(hotels_data.hotels, { id: Number($(el).attr('data-hotelid')) });
});
console.log($hotel_cards.toArray());