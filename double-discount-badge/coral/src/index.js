import css from "bundle-text:./index.less";

var hotels_ids = [29449, 476, 853, 3815, 520, 11013, 21601, 8028, 874, 12879, 13448, 12880, 22076, 323, 26682, 20518, 15367, 30559, 453, 25065, 4138, 22140, 6527, 31177, 11818, 11754, 27561, 21627, 682, 10083, 983, 4524, 17813, 52416, 16562, 29836, 10825, 888, 35631, 734, 30730, 6975, 9464, 5205, 5217, 9408, 5174, 15254, 14481, 6659, 358, 34426, 50385, 28376, 361, 467, 47032, 47309, 631, 6936, 3861, 25495, 34184, 645, 31565, 5004, 12520, 27841];

var moment_since = moment('2023-04-01T00:00:00');
var moment_until = moment('2023-10-31T23:59:59');

// hotel page
var $h1 = $('h1[data-hotelid]');
var $common_parent = $h1.closest('.hoteldetailpage');
var hid = $h1.attr('data-hotelid');
if (hid && hotels_ids.indexOf(Number(hid)) >= 0) {
    var dates = $common_parent.find('#selectRoomTypes [data-layer-dates]').attr('data-layer-dates');
    var dateOk = moment(dates.split('-')[0], 'DD.MM.YYYY').isBetween(moment_since, moment_until);
    var $hotel_gallery_wrap = $('[data-module="hotelgallery"] .hotelgallery-wrap');
    var isRecommended = $hotel_gallery_wrap.hasClass('recommended');
    if (dateOk) {
        if( isRecommended ){
            $hotel_gallery_wrap.append($('<div class="badge-double-discount badge-double-discount--isrecommended"><div class="hint"></div></div>'));
        }
        else{
            $hotel_gallery_wrap.append($('<div class="badge-double-discount"><div class="hint"></div></div>'));
        }
        $('head').append('<style>' + css + '</style>');
    }
} else if ($('[data-package-layer][data-hotelid]').length) {
    var css_appended = false;
    $('[data-package-layer][data-hotelid]').each(function (idx, el) {
        var $el = $(el);
        hid = Number($el.attr('data-hotelid'));
        if (hotels_ids.indexOf(Number(hid)) >= 0) {
            try {
                var tour_data = JSON.parse($el.attr('data-package-layer'));
                var dateOk = moment(tour_data.FlightDate).isBetween(moment_since, moment_until);
                var isRecommended = $el.find('.image').hasClass('recommended');
                if (dateOk) {
                    if (isRecommended) {
                        $el.find('.image').append($('<div class="badge-double-discount badge-double-discount--isrecommended"><div class="hint"></div></div>'));
                    } else {
                        $el.find('.image').append($('<div class="badge-double-discount"><div class="hint"></div></div>'));
                    }
                    css_appended || ($('head').append('<style>' + css + '</style>'), css_appended = true);
                }
            } catch (e) {
                debugger;
            }
        }
    });
}
