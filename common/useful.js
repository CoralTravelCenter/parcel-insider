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

