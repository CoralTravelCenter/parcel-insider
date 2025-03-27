import { waitForSelector } from "./usefuls";
import css from 'bundle-text:./styles.less';
import markup from 'bundle-text:./markup.html';

(async function () {
    console.warn('@minbox/xtra-services/coral');
    const h2 = await waitForSelector(() => {
        return [...document.querySelectorAll('h2')].find(h2 => h2.textContent.trim() === 'Дополнительные услуги');
    }, 200);
    const commonContainer = h2?.parentElement;
    if (commonContainer) {
        commonContainer.classList.add('trim-xtras');
        const css_el = document.createElement('style');
        css_el.textContent = css;
        document.head.appendChild(css_el);
        commonContainer.insertAdjacentHTML('beforeend', markup);
        const klasses = commonContainer.querySelector('[data-show]').getAttribute('class');
        const xtraShow = commonContainer.querySelector('#xtra-show');
        xtraShow.setAttribute('class', klasses);
        xtraShow.classList.add('ant-alert-info');
        xtraShow.classList.remove('ant-alert-success');
        commonContainer.querySelector('#xtra-show button').addEventListener('click', () => {
            commonContainer.classList.remove('trim-xtras');
        });
    }
})();

