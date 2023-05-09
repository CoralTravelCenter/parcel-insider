let visible_digits = $('.price-big').children().filter((idx, el) => !!el.clientWidth).toArray();
visible_digits.sort((a, b) => {
    const a_order = Number($(a).css('order'));
    const b_order = Number($(b).css('order'));
    return a_order < b_order ? -1 : a_order > b_order ? 1 : 0;
});
let price = visible_digits.map(el => el.textContent).join('') * 1;
