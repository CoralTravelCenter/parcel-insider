(function () {
    var creatives_map = {
        // образец:
        'значение параметра banner_on_site в ссылке на баннере': {
            mobile: 'URL мобильной версии'
        },
        // Турция летом
        'main-visit-turkey': {
            var: 'B',
            desktop: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_DESKTOP_SUMMMER_TURKIYE_4_5-1688112253.jpeg',
            mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_TURKIYE_4_5-1688111247.jpeg'
        },
        // ОАЭ
        'main-uae': {
            var: 'B',
            desktop: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_DESKTOP_UAE_4_5-1688112282.jpeg',
            mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_UAE_4_5-1688111325.jpeg'
        },
        // Эгейское побережье 2023
        'main-regions-aegean': {
            var: 'B',
            desktop: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_DESKTOP_AEGEAN_MSK_4_5-1688112307.jpeg',
            mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_AEGEAN_MSK_4_5-1688110542.jpeg',
        },
        // Египет
        'main-egypt': {
            var: 'B',
            desktop: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_DESKTOP_EGYPT_4_5-1688112326.jpeg',
            mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_EGYPT_4_5-1688111191.jpeg'
        },
    };
    $('#banner-base .carousel-item a > img').each(function (idx, img) {
        var $img = $(img);
        var $link = $img.closest('a');
        var href = $link.attr('href');
        var m = href.match(/\bbanner_on_site=([^&]+)/);
        var banner_id = m && m[1];
        if (banner_id && creatives_map[banner_id]) {
            var subst = creatives_map[banner_id];
            var modd_img_source = `<picture class="d-block w-100">
                <source media="screen and (max-width: 536px)" srcset="${subst.mobile}">
                <img src="${subst.desktop || $img.attr('src') || $img.attr('data-src')}" style="width: 100%">
            </picture>`;
            $link.html(modd_img_source);
            if (subst.var) {
                $link.attr('href', `${ href }&var=${ subst.var }`);
                $link.siblings('a[href]').attr('href', $link.attr('href'));
            }
        }
    });
})();