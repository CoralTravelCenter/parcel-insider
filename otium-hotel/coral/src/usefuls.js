export const popoverTemplateWithClass = (klass = '') => `<div class="popover ${ klass }" role="tooltip"><div class="arrow ${ klass }"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>`;

export function demanglePrice($container) {
    let $rubs = $container.children('[class]');
    const kops_text = $container.children(':not([class])').text() || $container.next().text();
    let kops = kops_text.replace(/\D/g, '') * 1;
    let visible_digits = $rubs.filter((idx, el) => !!el.clientWidth).toArray();
    visible_digits.sort((a, b) => Number($(a).css('order')) - Number($(b).css('order')));
    return visible_digits.map(el => el.textContent).join('') * 1 + kops / 100;
}

export function $fetchElementMarkupFrom(el, url) {
    $.get(url).done((markup) => {
        $(el).html(markup);
    });
}