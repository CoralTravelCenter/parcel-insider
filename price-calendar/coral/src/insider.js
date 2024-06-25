// =====================================================================================================================
const this_script_id = 'price-calendar@hotels';
if (window[this_script_id]) throw `${ this_script_id } -> stop`;
window[this_script_id] = true;
// =====================================================================================================================
import css from 'bundle-text:../templates/styles.less';
import html from 'bundle-text:../templates/price-calendar-widget.html';
import Mustache from "mustache";
import { LineChart } from "chartist";

import { hostReactAppReady, queryParam, waitForSelector } from "./usefuls";
import dayjs from "dayjs";
import locale_ru from 'dayjs/locale/ru';
import minMax from 'dayjs/plugin/minMax'
import IsBetween from 'dayjs/plugin/isBetween'

dayjs.locale(locale_ru);
dayjs.extend(minMax);
dayjs.extend(IsBetween);

const css_el = document.createElement('style');
css_el.textContent = css;
document.head.appendChild(css_el);

const months2scan = 7;

(async function () {
    await hostReactAppReady();

    const { qp, p } = queryParam();
    const isPackageTour = p == 1;

    let desiredDate;
    let searchCriterias;
    if (qp) {
        // const decrypt_endpoint = isPackageTour ? 'PackageTourHotelProduct' : 'OnlyHotelProduct';
        const decrypt_endpoint = 'PackageTourHotelProduct';
        const query = await fetch(`//b2capi.coral.ru/${ decrypt_endpoint }/PriceSearchDecrypt`, {
            method:  'post',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ queryParam: encodeURIComponent(qp) })
        }).then(response => response.json());
        console.log(query);
        searchCriterias = query.result.searchCriterias;
        delete searchCriterias.advancedParameters;
        desiredDate = dayjs(searchCriterias.beginDates[0]);
    } else {
        desiredDate = dayjs().add(1, 'day');
        // TODO: fill searchCriterias with some defaults
        // searchCriterias = ...
    }

    const range_start = dayjs.max(desiredDate.subtract(3, 'months'), dayjs().add(1, 'day'));

    const allBeginDates = [...beginDates2Scan(range_start, months2scan)];
    console.log('+++ allBeginDates: %o', allBeginDates);

    await waitForSelector('#hotelDetailMap');
    renderWidget();

    const chartData = {
        labels: allBeginDates.map(dates => {
            return desiredDate.isBetween(...dates, 'day', '[]') ? desiredDate.format('DD.MM') : dayjs(dates[0]).format('MMMM');
        }),
        series: [
            allBeginDates.map(dates => {
                return desiredDate.isBetween(...dates, 'day', '[]') ? insider_object?.product?.unit_sale_price || insider_object?.product?.unit_price || 0 : null;
            })
        ]
    }

    const chart = new LineChart('.pricing-chart', chartData, {
        axisY: { showGrid: false, showLabel: false, offset: 0 },
        // fullWidth: true,
        low: 0
    });

    allBeginDates.forEach((dates, idx) => {
        if (desiredDate.isBetween(...dates, 'day', '[]')) {

        } else {
            fetch('//b2capi.coral.ru/PackageTourHotelProduct/PriceSearchList', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchCriterias: Object.assign({}, searchCriterias, { beginDates: dates }) })
            }).then(response => response.json()).then(json => {
                const offer = json?.result?.products?.at(0)?.offers?.at(0);
                console.log('+++ offer: %o', offer);
                if (offer) {
                    chartData.labels.splice(idx, 1, dayjs(offer.checkInDate).format('DD.MM'));
                    chartData.series[0].splice(idx, 1, offer.price.amount);
                    chart.update(chartData);
                }
            });
        }
    });


})();


function *beginDates2Scan(start, months_count) {
    let run = dayjs(start);
    while (months_count--) {
        yield [run.format('YYYY-MM-DD'), run.endOf('month').format('YYYY-MM-DD')];
        run = run.add(1, 'month').startOf('month');
    }
}

function renderWidget(model) {
    const widget_render = Mustache.render(html, { items: [1,2,3,4,5,6,7] });
    const insertion_anchor = document.getElementById('hotelDetailMap').closest('.ant-space-item');
    insertion_anchor.insertAdjacentHTML('beforebegin', widget_render);
}