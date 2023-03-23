// noinspection JSAnnotator

import popin_markup from 'bundle-text:./app-form-markup.html';
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

    $('head').append(`<style>${ css }</style>`);
    $('body').append(popin_markup);

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
