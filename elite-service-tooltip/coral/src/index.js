import css from "bundle-text:./index.less";
import markup from "bundle-text:./markup.html";
import { preload } from "/common/useful.js";

$('head').append(`<style>${ css }</style>`);
$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tooltipster/4.2.8/css/tooltipster.bundle.css" crossorigin="anonymous" referrerpolicy="no-referrer" />');

preload('https://cdnjs.cloudflare.com/ajax/libs/tooltipster/4.2.8/js/tooltipster.bundle.min.js', function () {
    $('.eliteicon .elitelogo').each((idx, el) => $(el).data('bs.popover').disable());
    $('.elite-service-logo, .eliteicon').tooltipster({
        contentAsHTML: true,
        delay: 100,
        content: markup
    });
});