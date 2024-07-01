// =====================================================================================================================
const this_script_id = 'price-calendar@hotels';
if (window[this_script_id]) throw `${ this_script_id } -> stop`;
window[this_script_id] = true;
// =====================================================================================================================
import css from 'bundle-text:../templates/styles.less';
import html from 'bundle-text:../templates/price-calendar-widget.html';
import { LineChart, Svg } from "chartist";
import p from './prototypes.js';

import { hostReactAppReady, params2query, queryParam, waitForSelector } from "./usefuls";
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

    const { qp, p } = queryParam();
    if (!qp) return

    await hostReactAppReady();
    const isPackageTour = p == 1;

    let desiredDate;
    let searchCriterias;

    const decrypt_endpoint = 'PackageTourHotelProduct';
    const query = await fetch(`//b2capi.coral.ru/${ decrypt_endpoint }/PriceSearchDecrypt`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queryParam: encodeURIComponent(qp) })
    }).then(response => response.json());
    console.log(query);
    searchCriterias = query.result.searchCriterias;
    delete searchCriterias.advancedParameters;
    desiredDate = dayjs(searchCriterias.beginDates[0]);
    const range_start = dayjs.max(desiredDate.subtract(3, 'months'), dayjs());

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
                const isDesiredDate = desiredDate.isBetween(...dates, 'day', '[]');
                return {
                    meta: { isDesiredDate, gotResponse: isDesiredDate },
                    // y: isDesiredDate ? insider_object?.product?.unit_sale_price || insider_object?.product?.unit_price || null : null
                    y: isDesiredDate ? insider_object?.product?.unit_sale_price || insider_object?.product?.unit_price || 0.0 : 0.0
                };
            })
        ]
    }

    const chart = new LineChart('.pricing-chart', chartData, {
        axisY: { showGrid: false, showLabel: false, offset: 50 },
        // fullWidth: true,
        low: 0
    });
    chart.on('draw', data => {
        if (data.type === 'point') {
            // console.log('+++ point: %o', data);
            const isDesiredDate = data.meta?.isDesiredDate ?? false;
            const isBestOffer = lowestPrice(data);
            const hilite = (isDesiredDate && data.value.y) ? '#0092D0' : (isBestOffer && data.value.y ? '#389E0D' : '#999');
            const weight = ((isDesiredDate || isBestOffer) && data.value.y) ? '600' : '400';
            if (isBestOffer && data.value.y) {
                const group = new Svg('g', {
                    style: `transform: translate(${ data.x - 7.5 }px,${ data.y - 6.5 }px)`,
                });
                const star = new Svg('path', {
                    d: "M7.93671 0.901745C7.87269 0.715295 7.69732 0.590088 7.50018 0.590088C7.30305 0.590088 7.12768 0.715295 7.06366 0.901745L5.71794 4.8211H1.34634C1.14417 4.8211 0.965539 4.95266 0.905572 5.14573C0.845605 5.3388 0.918265 5.54842 1.08485 5.66295L4.59925 8.07924L3.26037 11.9787C3.1957 12.167 3.25914 12.3756 3.41772 12.4961C3.57631 12.6165 3.79428 12.6217 3.95838 12.5089L7.50018 10.0737L11.042 12.5089C11.2061 12.6217 11.4241 12.6165 11.5826 12.4961C11.7412 12.3756 11.8047 12.167 11.74 11.9787L10.4011 8.07924L13.9155 5.66295C14.0821 5.54842 14.1548 5.3388 14.0948 5.14573C14.0348 4.95266 13.8562 4.8211 13.654 4.8211H9.28243L7.93671 0.901745Z",
                    fill: hilite
                }, 'best-star');
                group.append(star);
                data.element.replace(group);
            } else if (isDesiredDate && data.value.y) {
                const group = new Svg('g', {
                    style: `transform: translate(${ data.x - 7.5 }px,${ data.y - 6.5 }px)`,
                });
                const spot = new Svg('path', {
                    d: "M0.5 6.59009C0.5 3.27638 3.18629 0.590088 6.5 0.590088C9.81371 0.590088 12.5 3.27638 12.5 6.59009C12.5 9.9038 9.81371 12.5901 6.5 12.5901C3.18629 12.5901 0.5 9.9038 0.5 6.59009Z",
                    fill: hilite
                }, 'desired-date');
                group.append(spot);
                data.element.replace(group);
            }
            data.group.foreignObject(`<div class="calendar-offer-value" style="color: ${ hilite }; font-weight: ${ weight };">${ data.value.y ? data.value.y.formatCurrency() : (data.meta.gotResponse ? '<span class="no-offers">нет мест</span>' : '') }</div>`, {
                style: 'overflow: visible; line-height: 1',
                x: data.x, y: data.y
            });
            // data.element
        }
    });

    const calendar_items = document.querySelectorAll('.pricing-chart-combo li');
    const calendar_rows = document.querySelectorAll('.pricing-table a');
    allBeginDates.forEach((dates, idx) => {
        const label = desiredDate.isBetween(...dates, 'day', '[]') ? desiredDate.format('DD.MM') : dayjs(dates[0]).format('MMMM');
        calendar_rows[idx].querySelector('.date-cell').textContent = label;
    });

    allBeginDates.forEach((dates, idx) => {
        if (desiredDate.isBetween(...dates, 'day', '[]')) {
            const sel_price = insider_object?.product?.unit_sale_price || insider_object?.product?.unit_price;
            calendar_rows[idx].querySelector('.readout').textContent = (sel_price && sel_price.formatCurrency()) || 'нет мест';
        } else {
            calendar_items[idx].innerHTML = '<div class="waiting"></div>';
            const price_cell = calendar_rows[idx].querySelector('.price-cell');
            price_cell.insertAdjacentHTML('beforeend', '<div class="loader"><div class="waiting"></div></div>');
            fetch(`//b2capi.coral.ru/${ isPackageTour ? 'PackageTourHotelProduct' : 'OnlyHotelProduct' }/PriceSearchList`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchCriterias: Object.assign({}, searchCriterias, { beginDates: dates }) })
            }).then(response => response.json()).then(json => {
                const offer = json?.result?.products?.at(0)?.offers?.at(0);
                console.log('+++ offer: %o', offer);
                calendar_items[idx].innerHTML = '';
                chartData.series[0][idx].meta.gotResponse = true;
                price_cell.querySelector('.loader').remove();
                const readout = price_cell.querySelector('.readout');
                if (offer) {
                    const date_label = dayjs(offer.checkInDate).format('DD.MM');
                    chartData.labels[idx] = date_label;
                    calendar_rows[idx].querySelector('.date-cell').textContent = date_label;
                    // chartData.series[0].splice(idx, 1, offer.price.amount);
                    chartData.series[0][idx].y = offer.price.amount;
                    readout.textContent = offer.price.amount.formatCurrency();
                    const max_value = chartData.series[0].reduce((high, value) => {
                        const v = typeof value === 'number' ? value : value.y;
                        return Math.max(high, v);
                    }, 0);
                    const a = document.createElement('a');
                    const month_seq = dayjs(dates[0]).month() + 1;
                    const href = `/hotels${ offer.link.redirectionUrl }/?qp=${ offer.link.queryParam }&p=${ isPackageTour ? 1 : 2 }&pricing-chart=${ month_seq }`;
                    calendar_rows[idx].href = a.href = href;
                    calendar_rows[idx].target = a.target = '_blank';
                    calendar_items[idx].appendChild(a);
                    //
                    chart.update(chartData, { high: max_value * 1.06 }, true);
                    updateChartLinks(calendar_items, chartData.series[0]);
                    updateMobileSeries(calendar_rows, chartData.series[0]);
                    // ym tracking
                    a.addEventListener('click', handleClick);
                    calendar_rows[idx].addEventListener('click', handleClick);
                } else {
                    readout.textContent = 'нет мест';
                }
            });
        }
    });


})();

function handleClick() {
    try {
        ym(96674199, 'reachGoal', 'Pricing-chart_click');
    } catch (ex) {
        console.log(ex);
    }
    return true;
}

function *beginDates2Scan(start, months_count) {
    let run = dayjs(start);
    while (months_count--) {
        yield [run.format('YYYY-MM-DD'), run.endOf('month').format('YYYY-MM-DD')];
        run = run.add(1, 'month').startOf('month');
    }
}

function renderWidget(model) {
    const widget_render = html;
    const insertion_anchor = document.getElementById('hotelDetailMap').closest('.ant-space-item');
    insertion_anchor.insertAdjacentHTML('beforebegin', widget_render);
}

function lowestPrice(point_data) {
    return point_data.series.every(value => {
        const series_value = value ? (typeof value === 'number' ? value || Infinity : (Number(value.y) || Infinity)) : Infinity;
        return series_value >= point_data.value.y;
    });
}

function updateChartLinks(calendar_items, series) {
    const min_price = series.reduce((low, value) => {
        const v = typeof value === 'number' ? value : value.y;
        return Math.min(low, v || Infinity);
    }, Infinity);
    calendar_items.forEach((item, idx) => {
        const a = item.querySelector('a');
        if (a) {
            const href_param = queryParam(null, a.href);
            let value = series[idx];
            const price_value = typeof value === 'number' ? value : value.y;
            if (price_value === min_price) {
                if (href_param.qp) {
                    href_param['pricing-chart_bestprice'] = 1;
                    a.href = a.href.split('?')[0] + '?' + params2query(href_param);
                }
            } else {
                if (href_param.qp) {
                    delete href_param['pricing-chart_bestprice'];
                    a.href = a.href.split('?')[0] + '?' + params2query(href_param);
                }
            }
        }
    });
}

function updateMobileSeries(calendar_rows, series) {
    const max_price = series.reduce((high, value) => {
        const v = typeof value === 'number' ? value : value.y;
        return Math.max(high, v);
    }, 0);
    const min_price = series.reduce((low, value) => {
        const v = typeof value === 'number' ? value : value.y;
        return Math.min(low, v || Infinity);
    }, Infinity);
    calendar_rows.forEach((row, idx) => {
        let value = series[idx];
        const price_value = typeof value === 'number' ? value : value.y;
        const filler_style = row.querySelector('.filler').style;
        const readout_style = row.querySelector('.readout').style;
        filler_style.width = `${ price_value / max_price * 100 }%`;
        if (value.meta?.isDesiredDate) {
            filler_style.background = 'var(--price-fill-selected)';
            readout_style.fontWeight = 'bold';
            readout_style.color = 'var(--price-selected)';
        } else if (price_value === min_price) {
            readout_style.fontWeight = 'bold';
            readout_style.color = 'var(--price-best)';
        } else {
            filler_style.background = 'var(--price-fill-generic)';
            readout_style.fontWeight = 'normal';
            readout_style.color = 'unset';
        }
        const href_param = queryParam(null, row.href);
        if (price_value === min_price) {
            filler_style.background = 'var(--price-fill-best)';
            if (href_param.qp) {
                href_param['pricing-chart_bestprice'] = 1;
                row.href = row.href.split('?')[0] + '?' + params2query(href_param);
            }
        } else {
            if (href_param.qp) {
                delete href_param['pricing-chart_bestprice'];
                row.href = row.href.split('?')[0] + '?' + params2query(href_param);
            }
        }

    });
}