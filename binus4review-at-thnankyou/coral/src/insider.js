import css from "bundle-text:./styles.less";
import markup from "bundle-text:./markup.html";

$('head').eq(0).append(`<style>${ css }</style>`);
$('.card-body hr').after(markup);