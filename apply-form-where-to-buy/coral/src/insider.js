// noinspection JSAnnotator

import popin_markup from 'bundle-text:./app-form-custom.html';
import css from 'bundle-text:./styles.less';

(async function () {
    function cardBody() {
        return new Promise((resolve) => {
            (function () {
                let $card_body = $('.card-body');
                if ($card_body.length) {
                    resolve($card_body.get(0));
                } else {
                    setTimeout(arguments.callee, 100);
                }
            })();
        });
    }

    var apply_form_btn_markup = '<a href="#app-form" style="position:absolute; right: 8px; bottom: 100%; width: 120px; background-color: #0093D0; color: white" type="button" class="app-form-activate btn btn-default btn-sm btn-block">Отправить заявку</a>';

    function patchCard(card_body) {
        var $card_body = $(card_body);
        $card_body.children().each((idx, el) => {
            var $item = $(el);
            if (!$item.find('button.btnAgencyDetailCommon').siblings('.app-form-activate').length) {
                $item.find('button.btnAgencyDetailCommon').parent().css({ position: 'relative' }).prepend(apply_form_btn_markup);
            }
            if (!$item.find('button.btnSmBackToList').siblings('.app-form-activate').length) {
                $item.find('button.btnSmBackToList').parent().css({ position: 'relative' }).prepend(apply_form_btn_markup);
            }
            $item.addClass('app-form-added');
        });
    }
    var $card_body = $(await cardBody());
    var s = document.createElement('script');
    // s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.8/jquery.inputmask.min.js';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/4.0.9/min/jquery.inputmask.bundle.min.js';
    $('head').append(s);

    async function agenciesData(departureId) {
        return new Promise((resolve) => {
            $.get(`https://www.coral.ru/v1/agency/?departureId=${ departureId }`).done(response => resolve(response.Items));
        });
    }
    var agencies = null;

    $(document).on('click', '.card-body a[href="#app-form"]', async function () {
        var activeDeparture = window.global.getActiveDeparture();
        agencies ||= await agenciesData(activeDeparture.value);
        var $item = $(this).closest('.agencyItemWrapper');
        var a_id = $item.find('[data-agencyid]').attr('data-agencyid');
        var agency_data = _.find(agencies, { Id: Number(a_id) });
        console.log(agency_data);
        $form.prop('agency-data', agency_data);
    });

    $('head').append(`<style>${ css }</style>`);
    var $popin = $(popin_markup);
    var $form = $popin.find('form');
    $form.find('[name=depart_from]').val($('input.packageSearch__departureInput').val());
    $form.find('[name=destination_country]').val($('input.packageSearch__destinationInput').val());
    $form.on('submit', function (e) {
        e.preventDefault();
        // validate...
        var ok2send = true;
        $form.find('.form-field.required').removeClass('invalid').each(function (idx, form_field) {
            var $ff = $(form_field);
            var $input = $ff.find('input');
            if ($input.attr('name') === 'fio') {
                var valid = $input.val().match(/\S{2}/);
                $ff.toggleClass('invalid', !valid);
                ok2send = ok2send ? valid : false;
            } else if ($input.attr('name') === 'phone') {
                valid = $input.inputmask('unmaskedvalue').match(/^\d{10}$/);
                $ff.toggleClass('invalid', !valid);
                ok2send = ok2send ? valid : false;
            } else if ($input.attr('name') === 'email') {
                valid = $input.val().match(/^[a-zA-Z0-9а-яА-Я.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
                $ff.toggleClass('invalid', !valid);
                ok2send = ok2send ? valid : false;
            } else if ($input.attr('name') === 'agreed') {
                valid = $input.is(':checked');
                $ff.toggleClass('invalid', !valid);
                ok2send = ok2send ? valid : false;
            }
        });
        if (ok2send) {
            alert('valid');
            var adata = $form.prop('agency-data');
            var tour_date = $form.find('[name=tour_date]').inputmask('unmaskedvalue');
            if (tour_date) {
                tour_date = tour_date.match(/(\d\d)(\d\d)(\d\d\d\d)/).slice(1, 4).reverse().join('-');
            }
            var req_data = {
                "AgencyLocalName":      adata.Lname2,
                "AgencyEmail":          adata.Email1,
                "AgencyPhone":          Object.values((({Phone1,Phone2,Phone3}) => ({Phone1,Phone2,Phone3}))(adata)).join(','),
                "AgencyAddress":        adata.Address,
                "AgencyEEId":           adata.Id,
                "FullName":             $form.find('[name=fio]').val(),
                "CityDeparture":        $form.find('[name=depart_from]').val(),
                "Country":              $form.find('[name=destination_country]').val(),
                "HotelName":            $form.find('[name=hotel]').val(),
                "DesiredDepartureDate": tour_date,
                "NumberOfNights":       $form.find('[name=tour_nights]').val(),
                "CountPeoples":         $form.find('[name=pax]').val(),
                "Comment":              $form.find('[name=comments]').val(),
                "IsConsent":            true,
                "Email":                $form.find('[name=email]').val(),
                "Phone":                $form.find('[name=phone]').inputmask('unmaskedvalue')
            };
            console.log("req_data: %o", req_data);
            (async function () {
                try {
                    var res = await fetch('http://apishar.coral.school:7001/CoralCustomersInfo/Api/SaveInfoForOffice', {
                        method:  'POST',
                        headers: {
                            'Accept':       'application/json',
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        body:    JSON.stringify(req_data)
                    });
                    console.log('OK');
                    console.log(res)
                } catch (ex) {
                    console.warn('FAIL');
                    console.warn(ex);
                }
            })();
            // $.ajax('http://apishar.coral.school:7001/CoralCustomersInfo/Api/SaveInfoForOffice', {
            //     type: 'POST',
            //     contentType: 'application/json; charset=utf-8',
            //     data:        JSON.stringify(req_data)
            // }).done(function () {
            //     console.log('OK');
            //     console.log(arguments)
            // }).fail(function () {
            //     console.warn('FAIL');
            //     console.warn(arguments)
            // });
        } else {
            $form.find('.invalid input').eq(0).focus();
        }
        return false;
    });
    $form.find('[name=phone]').inputmask({ "mask": "+7 (999) 999-99-99" });
    $form.find('[name=tour_date]').inputmask({ mask: "99/99/9999", clearIncomplete: true });
    $('body').append($popin);

    patchCard($card_body);

    var mo = new MutationObserver((list, observer) => {
        for (let mutation of list) {
            if (mutation.type === 'childList') {
                patchCard(mutation.target);
            }
        }
    });
    mo.observe($card_body.get(0), { childList: true, subtree: true });

})();
