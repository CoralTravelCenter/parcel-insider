export default function (dom_matcher, mutation_matcher, payload) {
    window.dom_matcher = dom_matcher;
    window.mutation_matcher = mutation_matcher;
    dom_matcher() && payload();
    const mo = new MutationObserver((list) => {
        for (const rec of list) {
            if (rec.type === 'childList') {
                for (const node of rec.addedNodes) {
                    if (mutation_matcher(node)) {
                        payload();
                        return;
                    }
                }
            }
        }
    });
    mo.observe(document.body, { childList: true, subtree: true });
};