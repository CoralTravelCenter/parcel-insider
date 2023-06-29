export function preload(what, fn) {
    var lib;
    if (!Array.isArray(what)) {
        what = [what];
    }
    return $.when.apply($, (function () {
        var i, len1, results;
        results = [];
        for (i = 0, len1 = what.length; i < len1; i++) {
            lib = what[i];
            results.push($.ajax(lib, {
                dataType: 'script',
                cache:    true
            }));
        }
        return results;
    })()).done(function () {
        return typeof fn === "function" ? fn() : void 0;
    });
}

export function responsiveHandler(query, match_handler, unmatch_handler) {
    var layout;
    layout = matchMedia(query);
    layout.addEventListener('change', function (e) {
        if (e.matches) {
            return match_handler();
        } else {
            return unmatch_handler();
        }
    });
    if (layout.matches) {
        match_handler();
    } else {
        unmatch_handler();
    }
    return layout;
}

function arrayOfNodesWith(what) {
    var nodes;
    if (what.jquery) {
        nodes = what.toArray();
    } else if (what instanceof Array) {
        nodes = Array.from(what);
    } else if (what instanceof Node) {
        nodes = [what];
    } else if (what instanceof NodeList) {
        nodes = Array.from(what);
    } else if (typeof what === 'string') {
        nodes = Array.from(document.querySelectorAll(what));
    } else {
        throw "*** arrayOfNodesWith: Got something unusable as 'what' param";
    }
    return nodes;
};

export function watchIntersection(targets, options, yes_handler, no_handler) {
    var i, io, len, ref, target;
    io = new IntersectionObserver(function(entries, observer) {
        var entry, i, len, results;
        results = [];
        for (i = 0, len = entries.length; i < len; i++) {
            entry = entries[i];
            if (entry.isIntersecting) {
                results.push(yes_handler != null ? yes_handler.call(entry.target, observer) : void 0);
            } else {
                results.push(no_handler != null ? no_handler.call(entry.target, observer) : void 0);
            }
        }
        return results;
    }, {
        threshold: 1,
        ...options
    });
    ref = arrayOfNodesWith(targets);
    for (i = 0, len = ref.length; i < len; i++) {
        target = ref[i];
        io.observe(target);
    }
    return io;
};

export function popoverTemplateWithClass(klass = '') {
    return `<div class="popover ${klass}" role="tooltip"><div class="arrow ${klass}"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>`;
};
