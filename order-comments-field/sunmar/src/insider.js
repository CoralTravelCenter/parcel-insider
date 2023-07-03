import css from 'bundle-text:./insider.less';
import markup from 'bundle-text:./popover-markup.html';
import { popoverTemplateWithClass } from '../../../common/useful.js';

$('head').append('<style>' + css + '</style>');

$('.orderNoteInputWrapper .nameWrapper').popover({
    template:  popoverTemplateWithClass('order-comments'),
    html: true,
    content: markup,
    trigger: 'manual',
    placement: 'top'
}).on('focusin', function () {
    $(this).popover('show');
}).on('focusout', function () {
    $(this).popover('hide');
}).popover('show');
