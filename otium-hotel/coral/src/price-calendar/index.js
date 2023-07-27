// noinspection JSAnnotator

import markup from 'bundle-text:./markup.html'
import * as Mustache from 'mustache';
import {preload} from "/common/useful.js";

export class PriceCalendar {
    static ru_months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    static ru_days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    static perfectScrollbarInitialized = false;
    calData;
    variantData;
    constructor(data, variant_data) {
        this.calData = this.parsePriceCalResponse(data);
        this.variantData = variant_data;
    }

    render() {
        this.el = $(Mustache.render(markup, { items: this.itemsMarkup() })).get(0);
        const mo = new MutationObserver((mutations, observer) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node === this.el) {
                        mo.disconnect();
                        this.appendScrollbars();
                    }
                }
            }
        });
        mo.observe(document, { childList: true, subtree: true });
        this.setupListeners();
        return this.el;
    }

    setupListeners() {
        const me = this;
        $(this.el).on('click', '[data-date]', function () {
            me.selectExactDate($(this).attr('data-date'));
        });
    }
    async appendScrollbars() {
        if (!PriceCalendar.perfectScrollbarInitialized) {
            $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/1.5.5/css/perfect-scrollbar.min.css">');
            await new Promise(resolve => preload('https://cdnjs.cloudflare.com/ajax/libs/perfect-scrollbar/1.5.5/perfect-scrollbar.min.js', resolve));
            PriceCalendar.perfectScrollbarInitialized = true;
        }
        this.ps = new PerfectScrollbar(this.el.querySelector('.graph'));
    }

    itemsMarkup() {
        const me = this;
        const [price_min, price_max] = this.calData.reduce((minmax, d, idx) => {
            if (d.price) {
                if (d.price < minmax[0]) minmax[0] = d.price;
                if (d.price > minmax[1]) minmax[1] = d.price;
            }
            return minmax;
        }, [Infinity, -Infinity]);
        return [...(function* (cal_data) {
            let run_month_idx;
            for (const d of cal_data) {
                const month_idx = d.moment.month();
                const day_name = PriceCalendar.ru_days[d.moment.day()];
                const is_weekend = [0, 6].includes(d.moment.day()) ? 'weekend' : '';
                if (month_idx !== run_month_idx) {
                    run_month_idx = month_idx;
                    yield `<div class="month-name">${ PriceCalendar.ru_months[month_idx] }</div>`
                }
                const date_price = d.price + (me.variantData.mandatories_total_value || 0);
                yield `<div class="item ${ d.booking }" data-date="${ d.moment.format('YYYY-MM-DD') }">
                    <span class="bar"><span class="filler" style="height: ${ d.price / price_max * 100 }%">${ date_price.formatPrice('от', '₽') }</span></span>
                    <span class="flight ${ d.flight ? 'available' : 'unavailable' }"></span>
                    <span class="date">${ d.moment.date() }</span>
                    <span class="day-of-week ${ is_weekend }">${ day_name }</span>
                </div>`;
            }
        })(this.calData)];
    }

    parsePriceCalResponse(markup) {
        const dp = new DOMParser();
        const doc = dp.parseFromString(markup, 'text/html');
        const day_els = doc.querySelectorAll('.datesinner > *');
        let previous_month_idx = -1;
        return [...day_els].filter(el => !!el.querySelector('span[title]')).map(el => {
            const span= el.querySelector('span[title]');
            const [, ru_month_name, date, rub,, rub_fraction] = span.getAttribute('title').match(/(\S+)\s+(\d+),\D+(\d+)(,(\d+))?/);
            const month_idx = PriceCalendar.ru_months.indexOf(ru_month_name);
            const m = moment().month(month_idx).date(Number(date));
            if (month_idx < previous_month_idx) m.year(m.year() + 1);
            previous_month_idx = month_idx;
            return {
                moment:  m,
                price:   Math.round(parseFloat(`${rub}.${rub_fraction || 0}`)),
                flight:  !el.querySelector('.flight-available').classList.contains('notavailable'),
                booking: {
                    'bg-info': 'instant',
                    'bg-warning': 'confirm',
                    'bg-danger': 'unavailable',
                    'd-none': 'hidden'
                }[span.getAttribute('class')]
            };
        });
    }

    async selectExactDate(date_str) {

        const search_params_data = JSON.parse($(".container-tabItemWrap").attr("data-searchparams"));
        const requestType = search_params_data.RequestType;
        let query = search_params_data[{
            packageSearch: 'PackageSearchQuery',
            onlyHotel: 'OnlyHotelQuery'
        }[requestType]];
        const api_endpoint = {
            packageSearch: '/v1/package/search',
            onlyHotel: '/v1/onlyhotel/search'
        }[requestType];

        if (requestType === 'packageSearch') {
            query.BeginDate = query.EndDate = query.SelectedDate = date_str;
            query.DateRange = 0;
        } else if (requestType === 'onlyHotel') {
            const shift = moment(date_str).diff(moment(query.BeginDate));
            query.BeginDate = date_str;
            query.EndDate = moment(query.EndDate).add(shift).format('YYYY-MM-DD');
            query = (({Destination, BeginDate, EndDate, Guest}) => ({Destination, BeginDate, EndDate, Guest}))(query);
        }

        window.global.travelloader.show();
        $.post(api_endpoint, query).done((response) => {
            location.href = response;
        }).fail(err => {
            window.global.travelloader.hide();
        });

    }

}