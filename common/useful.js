export function preload(what, fn) {
    var lib;
    if (!Array.isArray(what)) {
        what = [what];
    }
    return $.when.apply($, (function() {
        var i, len1, results;
        results = [];
        for (i = 0, len1 = what.length; i < len1; i++) {
            lib = what[i];
            results.push($.ajax(lib, {
                dataType: 'script',
                cache: true
            }));
        }
        return results;
    })()).done(function() {
        return typeof fn === "function" ? fn() : void 0;
    });
};
