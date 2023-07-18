import {preload} from "/common/useful.js";
export const popoverTemplateWithClass = (klass = '') => `<div class="popover ${ klass }" role="tooltip"><div class="arrow ${ klass }"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>`;

export function demanglePrice($container) {
    let $rubs = $container.children('[class]');
    const kops_text = $container.children(':not([class])').text() || $container.next().text();
    let kops = kops_text.replace(/\D/g, '') * 1;
    let visible_digits = $rubs.filter((idx, el) => !!el.clientWidth).toArray();
    visible_digits.sort((a, b) => Number($(a).css('order')) - Number($(b).css('order')));
    return visible_digits.map(el => el.textContent).join('') * 1 + kops / 100;
}

export function waitForGlobalVar(prop, do_things) {
    (function () {
        try {
            eval(prop);
        } catch (ex) {
            setTimeout(arguments.callee, 200);
        }
        do_things();
    })();
}

let flickityPromise = null;
export function flickityReady() {
    flickityPromise ||= new Promise(resolve => {
        preload('https://cdnjs.cloudflare.com/ajax/libs/flickity/2.3.0/flickity.pkgd.min.js', resolve);
    });
    return flickityPromise;
}
