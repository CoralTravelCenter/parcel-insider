import css from "bundle-text:./index.less";

$('head').append(`<style>${ css }</style>`);

var hotels_ids = [29449, 476, 853, 3815, 520, 11013, 21601, 8028, 874, 12879, 13448, 12880, 22076, 323, 26682, 20518, 15367, 30559, 453, 25065, 4138, 22140, 6527, 31177, 11818, 11754, 27561, 21627, 682, 10083, 983, 4524, 17813, 52416, 16562, 29836, 10825, 888, 35631, 734, 30730, 6975, 9464, 5205, 5217, 9408, 5174, 15254, 14481, 6659, 358, 34426, 50385, 28376, 361, 467, 47032, 47309, 631, 6936, 3861, 25495, 34184, 645, 31565, 5004, 12520, 27841];

// hotel page
var hid = $('h1[data-hotelid]').attr('data-hotelid');
if (hid && hotels_ids.indexOf(Number(hid)) >= 0) {
    var isRecommended = $('[data-module="hotelgallery"] .hotelgallery-wrap').hasClass('recommended');
    if( isRecommended ){
        $('[data-module="hotelgallery"] .hotelgallery-wrap').append($('<div class="badge-cyberweekend-discount badge-cyberweekend-discount--isrecommended"></div>'));
    }
    else{
        $('[data-module="hotelgallery"] .hotelgallery-wrap').append($('<div class="badge-cyberweekend-discount"></div>'));
    }

} else if ($('[data-package-layer][data-hotelid]').length) {
    $('[data-package-layer][data-hotelid]').each(function (idx, el) {
        hid = Number($(el).attr('data-hotelid'));
        if (hotels_ids.indexOf(Number(hid)) >= 0) {
            var isRecommended = $(el).find('.image').hasClass('recommended');
            if( isRecommended ){
                $(el).find('.image').append($('<div class="badge-cyberweekend-discount badge-cyberweekend-discount--isrecommended"></div>'));
            }
            else{
                $(el).find('.image').append($('<div class="badge-cyberweekend-discount"></div>'));
            }
            $('head').append('<style>' + css + '</style>');

        }
    });
}
