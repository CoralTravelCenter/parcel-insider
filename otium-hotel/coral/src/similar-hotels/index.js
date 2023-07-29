import hotel_card_template from 'bundle-text:./hotel-card.html';
import config from '../data/coral-group.yaml';
import { mostRecentQuery } from "../usefuls.js";
import { watchIntersection } from "/common/useful.js";
import * as Mustache from 'mustache';

const destination_Turkey = {
    "Id": "Country1",
    "DataId": 1,
    "TopDataId": null,
    "ParentDataId": null,
    "FullTitle": "Турция (Turkey)",
    "Title": "Turkey",
    "TitleRu": "Турция",
    "ParentTitle": null,
    "ParentTitleRu": null,
    "Weight": 4,
    "Score": 215530.16000796217,
    "ModelType": "country",
    "HasAirport": false,
    "Priority": 1,
    "RecordSourceType": "packageAndHotel",
    "NearestAirports": [10, 3, 6719, 1, 147, 2, 22, 9, 6, 5, 6778, 11, 37]
};

export class SimilarHotels {
    hotelData;
    constructor(to_hotel_id, container) {
        this.container = container;
        this.hotelData = _.find(config.hotels, {id: to_hotel_id });
        console.log("+++ SimilarHotels: to hotel: %o", this.hotelData);
        watchIntersection(container, { threshold: .1 }, (observer) => {
            observer.unobserve(this.container);
            this.init();
        });
    }

    init() {
        const most_relevant = this.selectMostRelevantTo(10, this.hotelData);
        console.log('+++ most_relevant: %o', most_relevant);

        let { requestType, query, apiEndpoint } = mostRecentQuery();
        if (requestType === 'onlyHotel') {
            query = (({Destination, BeginDate, EndDate, Guest}) => ({Destination, BeginDate, EndDate, Guest}))(query);
            query.Destination = destination_Turkey;
        } else {
            query.Destination = [destination_Turkey];
        }

        $.post(apiEndpoint, query).done((response) => {
            let [url, query_string] = response.split('?');
            const qparams = new URLSearchParams(query_string);
            const f_param = JSON.parse(qparams.get('f'));
            f_param.Hid = most_relevant.map(h => h.id);
            qparams.set('f', JSON.stringify(f_param));
            const query_uri = [url, qparams.toString()].join('?');
            $.get(query_uri).done((search_result_response) => {
                const dp = new DOMParser();
                const doc= dp.parseFromString(search_result_response, 'text/html');
                const found_hotels = [...doc.querySelectorAll('.row.item')].map(el => {
                    const parsed = JSON.parse(el.dataset.packageLayer);
                    parsed.Price = Number(window.global.dataLayerManager.formatAscrPrice(parsed.Price));
                    parsed.ActionLink = el.querySelector('a.hotellist-actionlink').getAttribute('href');
                    return parsed;
                });
                console.log('+++ found_hotels: %o', found_hotels);
                const hotels2show = [...(function* (relevant, found, count) {
                    let rel;
                    while (count--) {
                        while (rel = relevant.shift()) {
                            let relevant_found = found_hotels.find((h) => h.Hotel.Id == rel.id);
                            if (relevant_found) {
                                yield relevant_found;
                                break;
                            }
                        }
                    }
                })(most_relevant, found_hotels, 3)];
                const hotel_cards_model = hotels2show.map(packageLayerDataToHotelCardModel);
                console.log('+++ hotel_cards_model: %o', hotel_cards_model);
                this.container.innerHTML = hotel_cards_model.map(model => Mustache.render(hotel_card_template, model)).join('');
                this.container.classList.add('loaded');
            });
        });

    }

    selectMostRelevantTo(n, ref_hotel) {
        const all_hotels_except_ref = config.hotels.filter((h) => h.id !== ref_hotel.id);
        const ref_trait = ref_hotel.badges?.at(1)?.label;
        const trait_weight = 100000;
        const ref_score = ref_hotel.similarity?.price;
        all_hotels_except_ref.sort((a, b) => {
            const a_trait = a.badges?.at(1)?.label;
            const b_trait = b.badges?.at(1)?.label;
            const a_score = (ref_trait !== a_trait) * trait_weight + Math.abs((a.similarity?.price || Infinity) - ref_score)
            const b_score = (ref_trait !== b_trait) * trait_weight + Math.abs((b.similarity?.price || Infinity) - ref_score)
            return a_score - b_score;
        });
        return all_hotels_except_ref.slice(0, n);
    }

}

function packageLayerDataToHotelCardModel(package_layer) {
    const { Hotel } = package_layer;
    const stars = parseInt(Hotel.Category.Name);
    const hotel_cofig = config.hotels.find((hotel) => hotel.id === Hotel.Id);
    return {
        name: Hotel.Name,
        category: stars ? Array(stars).fill('star').join(' ') : Hotel.Category.Name,
        category_klass: stars ? 'stars' : '',
        visual_url: `//content.coral.ru/resize/800x600/${ Hotel.Images[0].ImageUrl }`,
        visual_klass: (hotel_cofig.SFC && 'sfc') || (hotel_cofig.USFC && 'usfc') || '',
        place_area: Hotel.Location.Place === Hotel.Location.Area ? Hotel.Location.Place : `${ Hotel.Location.Place }, ${ Hotel.Location.Area }`,
        flight_or_checkin_date: (package_layer.FlightDate && moment(package_layer.FlightDate).format('DD.MM.YYYY')) || (package_layer.CheckInDate && moment(package_layer.CheckInDate).format('DD.MM.YYYY')),
        nights: package_layer.Night,
        nights_wording: package_layer.Night.asNights(),
        meal_type: Hotel.MealType.split(/,\s*/)[0],
        price_formatted: package_layer.Price.decoratedPriceHTML(),
        hotel_page_href: package_layer.ActionLink,
    };
}