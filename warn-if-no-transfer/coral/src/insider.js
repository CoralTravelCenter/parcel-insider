// =====================================================================================================================
const this_script_id = 'warn-if-no-transfer';
if (window[this_script_id]) throw `${ this_script_id } -> stop`;
window[this_script_id] = true;
// =====================================================================================================================

import domWarden from './dom-warden.js';

domWarden(() => {
    const no_transfer_flag_el = [...document.querySelectorAll('.product-summary-row')].find((el) => {
        return el.textContent.indexOf('Доплата за трансфер') === 0;
    });
    const displayed_price = parseFloat(no_transfer_flag_el?.querySelector('.price').textContent);
    return !!no_transfer_flag_el && displayed_price === 0.0;
}, (node) => {
    console.log('... checking node: %o', node);
    return node.classList.has('product-summary-row');
}, () => {
    console.log('*********** payload exec ****************');
});