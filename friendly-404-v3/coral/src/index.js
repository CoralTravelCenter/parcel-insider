
// text link
// https://www.coral.ru/packagetours/ekaterinburg-to-turtsiya-tours/?q=%7b%22Bgn%22%3a%2228.12.2022%22%2c%22End%22%3a%2228.12.2022%22%2c%22Dr%22%3a%220%22%2c%22Acc%22%3a%227%22%2c%22Gest%22%3a%222%22%2c%22Q%22%3a%224xXmiS5kq2JxUKqMUhqIHc1vprYJLcVwuh71SJFR3068VqiXOMzaQnwqPoAF%2f2LQD2vcpattohUm6sy4qlIk6DjAf5AcnIT1mu6u0dDYvuioprJjUkvhPqvx9k7CuAkXs%2bYcP1inU6zCBdMxOughOm%2fyrf53a6kD3My2YDEImFU%3d%22%2c%22Ts%22%3a0%2c%22Las%22%3afalse%2c%22AcId%22%3a0%2c%22FDate%22%3a%220001-01-01T00%3a00%3a00Z%22%2c%22Ref%22%3afalse%2c%22Pstatus%22%3afalse%2c%22TransferPrice%22%3a0.0%2c%22Chr%22%3afalse%2c%22Rglr%22%3atrue%2c%22Srt%22%3a1%7d&f={%22Rh%22:false,%22Ao%22:[%22available%22]}&page=1

import css from "bundle-text:./index.less";
import markup from "bundle-text:./index.html";

removeOldVersion();

$('head').append(`<style>${ css }</style>`);

$('.unavailable-v3').append($(markup).children());

function removeOldVersion() {
    $('.not-found, .notAvailable').empty().removeClass('not-found notAvailable').addClass('unavailable-v3');
}