import css from 'bundle-text:./insider.less';
import markup from 'bundle-text:./popover-markup.html';
import { popoverTemplateWithClass } from '../../../common/useful.js';

$('head').append('<style>' + css + '</style>');

$('.orderNoteInputWrapper .nameWrapper').popover({
    template:  popoverTemplateWithClass('order-comments'),
    html:      true,
    content:   markup,
    trigger:   'manual',
    placement: 'top'
}).on('focusin', function () {
    const $this = $(this);
    if (!$this.find('input').val()) {
        $this.popover('show');
    }
}).on('focusout', function () {
    $(this).removeClass('hilited').popover('hide');
}).on('keyup', function (e) {
    const $this = $(this);
    if ($this.find('input').val()) {
        $this.popover('hide');
    } else {
        $this.popover('show');
    }
}).addClass('hilited').popover('show');
