// noinspection JSAnnotator

import popin_markup from 'bundle-text:./app-form-custom.html';
import css from 'bundle-text:./styles.less';

// =====================================================================================================================
const this_script_id = 'Apply form @where-to-buy';
if (window[this_script_id]) throw `${ this_script_id } -> stop`;
window[this_script_id] ||= true;
// =====================================================================================================================

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
        $form.show().removeClass('blocked').siblings('.thanks').hide();
    });

    $('head').append(`<style>${ css }</style>`);
    var $popin = $(popin_markup);
    var $form = $popin.find('form');
    $form.find('[name=depart_from]').val($('input.packageSearch__departureInput').val());
    $form.find('[name=destination_country]').val($('input.packageSearch__destinationInput').val());
    var $consent_a = $form.find('.labeled-checkbox a');
    $.get('https://apishar.coral.school/consents/api/documentlist/coral.ru').done(function (response) {
        var docs_list = Array.isArray(response) ? response : JSON.parse(response);
        var active_doc_description = _.find(docs_list, { "is_active": true, "project_id": 13, "docId": 42, });
        if (active_doc_description) {
            $consent_a.attr('href', 'javascript:;');
            $consent_a.on('click', function () {
                var doc_window = open('about:blank');
                doc_window.document.title = active_doc_description.document_type_additionalname;
                $.get(`https://apishar.coral.school/consents/api/documentid/${ active_doc_description.docId }`).done(function (doc) {
                    doc_window.document.body.innerHTML = doc;
                });
            });
        }
    });
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
            $form.addClass('blocked');
            var adata = $form.prop('agency-data');
            var tour_date = $form.find('[name=tour_date]').inputmask('unmaskedvalue');
            if (tour_date) {
                tour_date = tour_date.match(/(\d\d)(\d\d)(\d\d\d\d)/).slice(1, 4).reverse().join('-');
            }
            var req_data = {
                "AgencyLocalName":      adata.Lname2,
                "AgencyEmail":          adata.Email1,
                "AgencyPhone":          Object.values((({Phone1,Phone2,Phone3}) => ({Phone1,Phone2,Phone3}))(adata)).filter(p=>!!p).join(','),
                "AgencyAddress":        adata.Address,
                "AgencyEEId":           adata.Id,
                "FullName":             $form.find('[name=fio]').val(),
                "CityDeparture":        $form.find('[name=depart_from]').val(),
                "Country":              $form.find('[name=destination_country]').val(),
                "HotelName":            $form.find('[name=hotel]').val(),
                "NumberOfNights":       $form.find('[name=tour_nights]').val(),
                "CountPeoples":         $form.find('[name=pax]').val(),
                "Comment":              $form.find('[name=comments]').val(),
                "IsConsent":            true,
                "Email":                $form.find('[name=email]').val(),
                "Phone":                $form.find('[name=phone]').inputmask('unmaskedvalue')
            };
            if (tour_date) {
                req_data.DesiredDepartureDate = tour_date;
            }
            console.log("req_data: %o", req_data);
            var $SaveInfoForOffice = $.ajax('//apishar.coral.school/CoralCustomersInfo/Api/SaveInfoForOffice', {
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                data:        JSON.stringify(req_data)
            });
            var accept_req_data = {
                FName:       $form.find('[name=fio]').val(),
                PhoneNumber: $form.find('[name=phone]').inputmask('unmaskedvalue'),
                Email:       $form.find('[name=email]').val(),
                IPLocation:  '',
                FUrl:        "https://www.coral.ru/",
                ProjectId:   13,
                DocumentId:  42,
                Confirm:     true,
                FormPage:   "https://www.coral.ru/where-to-buy/"
            };
            var $consentAccept = $.ajax('https://apishar.coral.school/consents/api/accept', {
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                data:        JSON.stringify(accept_req_data)
            });
            $.when($SaveInfoForOffice, $consentAccept).done(function () {
                $form.slideUp();
                $form.siblings('.thanks').slideDown();
            }).fail(function () {
                console.log(arguments);
                alert("Что-то пошло не так ;(\nПожалуста, попробуйте позже...");
                location.hash = '#_';
            });
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

    // Handling "Extended search... button"
    $(document).on('click', 'button.btnFindAgency', async function () {
        var searchCityID = $(this).closest('.colscontainer').find('select.slctCity').val();
        agencies = await agenciesData(searchCityID);
        setTimeout(async function () {
            var cardbody = await cardBody();
            patchCard(cardbody);
            mo.observe(cardbody, { childList: true, subtree: true });
        }, 100);
    });

})();
