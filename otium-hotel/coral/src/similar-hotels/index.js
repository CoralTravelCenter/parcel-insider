import hotel_card_template from 'bundle-text:./hotel-card.html';
import config from '../data/coral-group.yaml';
import { mostRecentQuery } from "../usefuls.js";
import { watchIntersection } from "/common/useful.js";

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
        }

        query.Destination = [destination_Turkey];

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
                console.log('+++ hotels2show: %o', hotels2show);
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
            const a_score = (ref_trait !== a_trait) * trait_weight + (a.similarity?.price || Infinity)
            const b_score = (ref_trait !== b_trait) * trait_weight + (b.similarity?.price || Infinity)
            return Math.abs(a_score - ref_score) - Math.abs(b_score - ref_score);
        });
        return all_hotels_except_ref.slice(0, n);
    }

}