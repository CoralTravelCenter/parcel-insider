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
        if (no_transfer_flag_el.classList.contains('checked')) return;

        console.log('*** PAYLOAD SHOULD EXEC ***');
        // noTransferFlagEl().style.display = 'none';
        no_transfer_flag_el?.classList.add('checked');

        const service_block_el = transferAddServiceBlock();
        service_block_el.insertAdjacentHTML('beforeend', msg_template);
        service_block_el.querySelector('.content-body')?.remove();
        const css = document.createElement('style');
        css.textContent = styles;
        service_block_el.prepend(css);
    });

    function noTransferFlagEl() {
        // const no_transfer_flag_el = [...document.querySelectorAll('.product-summary-row')].find((el) => {
        //     return el.textContent.indexOf('Трансфер') === 0;
        // });
        // const displayed_price = parseFloat(no_transfer_flag_el?.querySelector('.price').textContent);
        // return !!no_transfer_flag_el && displayed_price === 0.0 ? no_transfer_flag_el : null;
        return document.querySelector('.product-summary-row:has(.price.not-include)');
    }

    function transferAddServiceBlock() {
        const flag_el = [...document.querySelectorAll('.extra-service-list-title-text')].find(el => el.textContent === 'Трансфер');
        return flag_el?.closest('.title')?.parentElement;
    }

})();

