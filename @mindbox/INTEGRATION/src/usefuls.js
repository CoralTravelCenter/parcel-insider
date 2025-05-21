
export async function hostReactAppReady(selector = '#__next > div', timeout = 500) {
    return new Promise(resolve => {
        const waiter = () => {
            const host_el = document.querySelector(selector);
            if (host_el?.getBoundingClientRect().height) {
                resolve();
            } else {
                setTimeout(waiter, timeout);
            }
        };
        waiter();
    });
}

export async function waitForSelector(selector, interaval = 500) {
    return new Promise(resolve => {
        const waiter = () => {
            const el = document.querySelector(selector);
            if (el) {
                resolve(el);
            } else {
                setTimeout(waiter, interaval);
            }
        };
        waiter();
    });
}

export async function asap(cb) {
    if (['complete', 'interactive'].includes(document.readyState)) {
        cb && cb();
        return Promise.resolve();
    }
    return new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', () => {
            cb && cb();
            resolve();
        });
    });
}

export async function globallyDefined(globalSymbol) {
    return new Promise(resolve => {
        (function () {
            if (typeof window[globalSymbol] !== 'undefined') {
                resolve(window[globalSymbol]);
            } else {
                setTimeout(arguments.callee, 500);
            }
        })();
    });
}

export function myCookie(name, source = document.cookie) {
    const cookies_list = source.split(/;\s+/);
    const cookies = {};
    for (const cookie_str of cookies_list) {
        const [name, value] = cookie_str.split('=');
        cookies[name] = decodeURIComponent(value);
    }
    return name ? cookies[name] : cookies;
}

export function queryParam(p, source) {
    source ||= location.href;
    let [url, query] = source.split('?');
    query ||= '';
    const params_kv = query.split('&');
    const params = {};
    for (const kv of params_kv) {
        let [k, v] = kv.split('=');
        try {
            v = decodeURIComponent(v);
            v = JSON.parse(v);
        } catch (ex) {}
        params[k] = v;
    }
    if (p) {
        return params[p];
    } else {
        return params;
    }
}

export function params2query(p) {
    const kv = [];
    for (let [k, v] of Object.entries(p)) {
        kv.push(`${ k }=${ encodeURIComponent(typeof v === 'object' ? JSON.stringify(v) : v) }`);
    }
    return kv.join('&');
}