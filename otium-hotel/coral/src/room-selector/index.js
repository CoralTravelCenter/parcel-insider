import nights_selector_t from 'bundle-text:./nights-selector-template.html'
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
                const rooms_data = [...rooms_nodes_list].map(room_node => {
                    return {
                        name: room_node.querySelector('.roominfo h4')?.textContent,
                        gallery_imagee: JSON.parse(room_node.querySelector('.roominfo .custom-gallery-wrapper').getAttribute('data-images'))
                    };
                });
                resolve(rooms_data);
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