import css from 'bundle-text:./insider.less';
import { popoverTemplateWithClass } from '../../../common/useful.js';

$('head').append('<style>' + css + '</style>');

$('.txtHomePhonePayer').attr('placeholder', 'Экстренная связь');
$('.homePhoneWrapper .requiredLabel').text('Контакт для экстренной связи');

$('.homePhoneWrapper').popover({
    template:  popoverTemplateWithClass('emergency'),
    content: 'Телефон контактного лица для связи при чрезвычайных ситуациях (не может быть одним из пассажиров в бронировании). Если вы решите не предоставлять информацию в этой секции, то необходимо указать свой номер телефона.',
    trigger: 'manual',
    placement: 'top'
}).on('focusin', function () {
    $(this).popover('show');
}).on('focusout', function () {
    $(this).popover('hide');
});
