import { waitForSelector } from "./usefuls";
import styles from 'bundle-text:./styles.less';

let css_injected = false;
function injectCSS() {
    if (!css_injected) {
        const style = document.createElement('style');
        style.textContent = styles;
        document.head.append(style);
        css_injected = true;
    }
}

(async function () {
    console.warn('@minbox/xtra-services/coral');

    const xtras_headers = await waitForSelector(() => {
        const togglers = document.querySelectorAll('.ant-collapse .ant-collapse-header');
        return togglers.length ? [...togglers] : null;
    });

    try { ym(96674199, 'reachGoal', 'dop_uslugi_close') } catch (ex) { console.warn(ex) }

    injectCSS();

    xtras_headers.forEach(xtra_header => {
        xtra_header.click();
        const txt = xtra_header.textContent.trim();
        let ym_goal;
        if (txt.indexOf('Услуги в полете') === 0) {
            ym_goal = 'dop_uslugi_flight';
        } else if (txt.indexOf('Дополнительные услуги') === 0) {
            ym_goal = 'dop_uslugi_open';
            const title_el = xtra_header.querySelector('.title');
            if (title_el) {
                title_el.textContent = 'Посмотреть дополнительные услуги';
            }
        }
        const clickHandler = () => {
            try { ym(96674199, 'reachGoal', ym_goal) } catch (ex) { console.warn(ex) }
            xtra_header.removeEventListener('click', clickHandler);
        };
        xtra_header.addEventListener('click', clickHandler);
    });

})();

