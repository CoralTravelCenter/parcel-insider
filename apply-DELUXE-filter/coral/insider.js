(function () {
    if (~document.referrer.indexOf('/concepts/elite-service/')) {
        window.global.travelloader.show();
        const search_type = $("section.filtersection").data("searchtype");
        $.ajax({
            type:    "POST",
            url:     window.global.getApplicationURL(search_type === 2 ? "/v1/onlyhotelfilter/filter" : "/v1/packagefilter/filter"),
            data:    {
                "hotelId":         [],
                "priceRange":      [0, 0],
                "hotelcategory":   [],
                "mealtypes":       [],
                "region":          [],
                "recommendedonly": false,
                "availability":    ["available"],
                "leisuretypes":    ["49"],
                "hotelfacilities": [],
                "roomtypes":       [],
                "roomfacilities":  [],
                "beach":           []
            },
            success: function (redirect_response) {
                window.location.href = redirect_response;
            }
        });
    }
})();
