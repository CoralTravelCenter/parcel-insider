
// test link
// https://www.sunmar.ru/packagetours/moskva-to-kuba-tours/?q=%7b%22Bgn%22%3a%2225.06.2022%22%2c%22End%22%3a%2225.06.2022%22%2c%22Dr%22%3a%220%22%2c%22Acc%22%3a%227%22%2c%22Gest%22%3a%222%22%2c%22Q%22%3a%22mSbXqdgoPoYzGbELZp2wvSbyY7UnS5rCG5baoIQP4QDFRXhCl1qqbQiME9gehlASxomRYVytBaLjW8%2bDnQKeaBu%2fPXpuICtkSDUEqiNxyITjGd7E8TczxjkRkHF0abRxgd%2ba22%2ffooaCZ%2fjgAkwWkA%3d%3d%22%2c%22Ts%22%3a0%2c%22Las%22%3afalse%2c%22AcId%22%3a0%2c%22FDate%22%3a%220001-01-01T00%3a00%3a00Z%22%2c%22Ref%22%3afalse%2c%22Pstatus%22%3afalse%2c%22TransferPrice%22%3a0.0%2c%22Chr%22%3afalse%2c%22Rglr%22%3atrue%2c%22Srt%22%3a1%7d&f=

import css from "bundle-text:./index.less";
import markup from "bundle-text:./index.html";

removeOldVersion();

$('head').append(`<style>${ css }</style>`);

$('.unavailable-v3').append($(markup).children());

function removeOldVersion() {
    $('.not-found, .notAvailable, .unavailable-v3').empty().removeClass('not-found notAvailable').addClass('unavailable-v3');
}