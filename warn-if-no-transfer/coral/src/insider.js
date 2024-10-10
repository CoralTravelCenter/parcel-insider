// =====================================================================================================================
const this_script_id = 'warn-if-no-transfer';
if (window[this_script_id]) throw `${ this_script_id } -> stop`;
window[this_script_id] = true;
// =====================================================================================================================

import domWarden from './dom-warden.js';
import msg_template from 'bundle-text:./templates/pay-attention-markup.html'
import styles from 'bundle-text:./templates/styles.less';

(function () {

    domWarden(noTransferFlagEl, (node) => {
        if (node instanceof HTMLElement) {
            return noTransferFlagEl();
        }
        return false;
    }, () => {
        const no_transfer_flag_el = noTransferFlagEl();
        if (!no_transfer_flag_el.getBoundingClientRect().height) return;

        // console.log('*** PAYLOAD SHOULD EXEC ***');
        noTransferFlagEl().style.display = 'none';
        const service_block_el = transferAddServiceBlock();
        service_block_el.insertAdjacentHTML('beforeend', msg_template);
        service_block_el.querySelector('.content-body')?.remove();
        const css = document.createElement('style');
        css.textContent = styles;
        service_block_el.prepend(css);
    });

    function noTransferFlagEl() {
        const no_transfer_flag_el = [...document.querySelectorAll('.product-summary-row')].find((el) => {
            return el.textContent.indexOf('Доплата за трансфер') === 0;
        });
        const displayed_price = parseFloat(no_transfer_flag_el?.querySelector('.price').textContent);
        return !!no_transfer_flag_el && displayed_price === 0.0 ? no_transfer_flag_el : null;
    }

    function transferAddServiceBlock() {
        const flag_el = [...document.querySelectorAll('.extra-service-list-title-text')].find(el => el.textContent === 'Трансфер');
        return flag_el?.closest('.title')?.parentElement;
    }

})();

