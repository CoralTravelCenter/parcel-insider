let visible_digits = $('.price-big').children().filter((idx, el) => !!el.clientWidth).toArray();
visible_digits.sort((a, b) => Number($(a).css('order')) - Number($(b).css('order')));
let price = visible_digits.map(el => el.textContent).join('') * 1;
