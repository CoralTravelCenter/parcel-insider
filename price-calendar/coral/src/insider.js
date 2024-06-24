// =====================================================================================================================
const this_script_id = 'price-calendar@hotels';
if (window[this_script_id]) throw `${ this_script_id } -> stop`;
window[this_script_id] = true;
// =====================================================================================================================
import { hostReactAppReady, queryParam } from "./usefuls";
import dayjs from "dayjs";
import minMax from 'dayjs/plugin/minMax'
import IsBetween from 'dayjs/plugin/isBetween'

dayjs.extend(minMax);
dayjs.extend(IsBetween);

const months2scan = 7;

(async function () {
    await hostReactAppReady();

    const { qp, p } = queryParam();
    const isPackageTour = p == 1;

    let desiredDate;
    if (qp) {
        // const decrypt_endpoint = isPackageTour ? 'PackageTourHotelProduct' : 'OnlyHotelProduct';
        const decrypt_endpoint = 'PackageTourHotelProduct';
        const query = await fetch(`//b2capi.coral.ru/${ decrypt_endpoint }/PriceSearchDecrypt`, {
            method:  'post',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ queryParam: encodeURIComponent(qp) })
        }).then(response => response.json());
        console.log(query);
        const { searchCriterias } = query.result;
        desiredDate = dayjs(searchCriterias.beginDates[0]);
    } else {
        desiredDate = dayjs().add(1, 'day');
    }

    const range_start = dayjs.max(desiredDate.subtract(3, 'months'), dayjs().add(1, 'day'));

    const allBeginDates = [...beginDates2Scan(range_start, months2scan)];
    console.log('+++ allBeginDates: %o', allBeginDates);

    for (const beginDates of allBeginDates) {
        if (desiredDate.isBetween(...beginDates, 'day', '[]')) {

        } else {

        }
    }

})();


function *beginDates2Scan(start, months_count) {
    let run = dayjs(start);
    while (months_count--) {
        yield [run.format('YYYY-MM-DD'), run.endOf('month').format('YYYY-MM-DD')];
        run = run.add(1, 'month').startOf('month');
    }
}