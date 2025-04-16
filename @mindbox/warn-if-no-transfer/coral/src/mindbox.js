import domWarden from './dom-warden.js';
import msg_template from 'bundle-text:./templates/pay-attention-markup.html'
import styles from 'bundle-text:./templates/styles.less';

(function () {
    console.warn("@minbox/warn-if-no-transfer/coral");
    domWarden(noTransferFlagEl, (node) => {
        if (node instanceof HTMLElement) {
            return noTransferFlagEl();
        }
        return false;
    }, () => {
        const no_transfer_flag_el = noTransferFlagEl();
        if (!no_transfer_flag_el) return;
        if (no_transfer_flag_el.classList.contains('mb-checked')) return;

        console.log('*** PAYLOAD SHOULD EXEC ***');
        // noTransferFlagEl().style.display = 'none';
        no_transfer_flag_el?.classList.add('mb-checked');

        const service_block_el = transferAddServiceBlock();
        service_block_el.insertAdjacentHTML('beforeend', msg_template);
        service_block_el.querySelector('.content-body')?.remove();
        const css = document.createElement('style');
        css.textContent = styles;
        service_block_el.prepend(css);
    });

    function noTransferFlagEl() {
        const explicit_no_transfer_row = document.querySelector('.product-summary-row:has(.price.not-include)');
        if (!explicit_no_transfer_row) {
            // if not -- check for complete absence "transfer" row in case of "hotel only"
            debugger;
            const summary_rows = document.querySelectorAll('.product-summary-row');
            const there_is_no_transfer_row = [...summary_rows].every(row => row.textContent.trim().indexOf('Трансфер') !== 0);
            return there_is_no_transfer_row ? summary_rows[0] : null;
        }
        return explicit_no_transfer_row;
    }

    function transferAddServiceBlock() {
        const flag_el = [...document.querySelectorAll('.extra-service-list-title-text')].find(el => el.textContent === 'Трансфер');
        return flag_el?.closest('.title')?.parentElement;
    }

})();

