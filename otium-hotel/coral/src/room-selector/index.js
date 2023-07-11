import nights_selector_t from 'bundle-text:./nights-selector-template.html'
import rooms_for_nights_t from 'bundle-text:./rooms-for-nights.html'
import * as Mustache from "mustache";

export class RoomSelector {
    roomsRef = null;
    constructor(container, nights_list, config = {}) {
        this.roomsRef = nights_list.map(n => {
            return {
                nights:  n,
                wording: n.asNights(),
            };
        });
        this.$container = $(container);
        this.$roomsSelector = $(Mustache.render(nights_selector_t, { list: this.roomsRef }));
        this.$nightsSelector = this.$roomsSelector.filter('ul.selector');
        this.$roomsHolder = this.$roomsSelector.filter('.rooms-holder');
        this.config = config;
        this.init();
    }

    init() {
        this.roomsRef.forEach(ref => {
            ref.$buttonEl = this.$nightsSelector.find(`li[data-nights='${ ref.nights }']`);
        });
        this.$container.append(this.$roomsSelector);
        this.selectNights(this.config.nightsSelected);
        return this;
    }

    findRoomsRefForNights(n) {
        return this.roomsRef.find(d => d.nights === n);
    }

    fetchRoomsData(rooms_ref) {
        rooms_ref.roomsData ||= new Promise(resolve => {
            rooms_ref.$buttonEl.attr('data-state', 'loading');
            $.get('/v1/hoteldetail/getroomlist', {
                night: rooms_ref.nights,
                hotelId: this.config.hotelId,
                availableFilter: this.config.availableFilter,
                selectedDate: this.config.selectedDate
            }).done((response) => {
                rooms_ref.$buttonEl.attr('data-state', 'available');
                const dp = new DOMParser();
                const doc = dp.parseFromString(response, 'text/html');
                const rooms_nodes_list = doc.querySelectorAll('.room.row');
                const rooms_list = [...rooms_nodes_list].map(room_node => {
                    const variant_nodes = room_node.querySelectorAll('.variant');
                    const variants = [...variant_nodes].map(variant_node => {
                        const meal_id = variant_node.getAttribute('data-mealid');
                        const meal_name = variant_node.querySelector('.m-meal-name').textContent;
                        return {
                            meal: {
                                id: meal_id,
                                name: meal_name
                            }
                        }
                    });
                    return {
                        name: room_node.querySelector('.roominfo h4')?.textContent,
                        gallery_imagee: JSON.parse(room_node.querySelector('.roominfo .custom-gallery-wrapper').getAttribute('data-images')),
                        variants
                    };
                });
                debugger;
                this.$roomsHolder.append(Mustache.render(rooms_for_nights_t, { rooms_list }));
                resolve(rooms_list);
            });
        });
        return rooms_ref.roomsData;
    }
    async selectNights(n) {
        const roomsRef = this.findRoomsRefForNights(n);
        const room_data = await this.fetchRoomsData(roomsRef);
        roomsRef.$buttonEl.attr('data-state', 'selected');
        console.log(room_data);
        return this;
    }

}