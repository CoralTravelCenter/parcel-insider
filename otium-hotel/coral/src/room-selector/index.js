import nights_selector_t from 'bundle-text:./nights-selector-template.html'
import * as Mustache from "mustache";
export class RoomSelector {
    constructor(container, nights_list) {
        const model = nights_list.map(n => ({number: n, wording: n.asNights()}));
        this.$container = $(container);
        this.$nightsSelector = $(Mustache.render(nights_selector_t, { list: model }));
        this.init();
    }

    init() {
        this.$container.append(this.$nightsSelector);
        return this;
    }

}