(function () {
    var creatives_map = {
        // образец:
        'значение параметра banner_on_site в ссылке на баннере': {
            mobile: 'URL мобильной версии'
        },
        // Школьные каникулы
        'main-school-holiday': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/KV_720x900_CHILD_VACATION_mo-1679645502.jpeg' },
        // Турция летом
        'main-visit-turkey': {
            var: 'B',
            mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_TURKIYE_4_5-1688111247.jpeg'
        },
        // Промо молодежь
        'main-youth': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CORAL_MOROCCO_CAROUSEL_MO-1687533193.jpeg' },
        // Яхт туры
        'main-yacht-blue-voyage': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_YACHT-1688047174.jpeg' },
        // ОАЭ
        'main-uae': {
            var: 'B',
            mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_UAE_4_5-1688111325.jpeg'
        },
        // Туры на GDS
        'main-gds': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_GDS-1687446534.jpeg' },
        // Россия
        'main-rus': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_open_russia-1687446721.jpeg' },
        // Грузия
        'main-gruziya': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_GEORGIA-1687446545.jpeg' },
        // Скидка 3% НОВЫЙ
        'main-promo-new': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/720x900_NEWCOMER_CAROUSEL_MO-1683017146.jpeg' },
        // Аллергия
        'main-allergy': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_Allergy_-1687446493.jpeg' },
        // Бахрейн
        'main-bahreyn': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_bahrein-1688047216.jpeg' },
        // Xanadu Makadi Bay
        'main-XANADU-MAKADI-BAY': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/02%20EGYPT_CAROUSEL_MO%20%288%29-1683119920.jpeg' },
        // Coral Group
        'main-coralgroup': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_KV_HOTEL-1687446557.jpeg' },
        // Майские праздники
        'main-may-holidays': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/Coral_summer_summer_collection_CAROUSEL_Mob-1681997861.png' },
        // Летняя Турция 2023
        'main-to-turtsiya': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/480x600_CORAL_TURKEY_Pegasus_CAROUSEL_MO-1674137723.jpeg' },
        // Пхукет
        'main-phuket': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/480x600_PHUKET_MO2112-1672126103.jpeg' },
        // Паттайя
        'main-pattayaa': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/PATTAYA_CAROUSEL_MO%20%2813%29-1681141030.jpeg' },
        // Эгейское побережье 2023
        'main-regions-aegean': {
            var: 'B',
            mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_AEGEAN_MSK_4_5-1688110542.jpeg',
        },
        // Египет
        'main-egypt': {
            var: 'B',
            mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_EGYPT_4_5-1688111191.jpeg'
        },
        // ОАЭ
        'oae-tours': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/UAE_CAROUSEL_v%2000-1%20%281%29-1683038069.jpeg' },
        // Элит отели
        'main-kempinski_villas_belek': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_VILLAS-1687447224.jpeg' },
        // Турция зимой
        'winter_turkey_coral': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CORAL_TURKIYE_CAROUSEL_MO%20%2820%29-1678713151.jpeg' },
        // Летняя коллекция отелей 2023
        'main-summer-collection': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/CAROUSEL_MO_SUMMER-1687446948.jpeg' },
        // Дубай
        'main-dubai': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/480x600_CORAL_DUBAI_CAROUSEL_MO3101-1675150910.jpeg' },
        // Рас-Аль-Хайма
        'main-rasalkhaimah': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/RAK_CAROUSEL_MO%20%2810%29-1679322047.jpeg' },
        // Отели для взрослых
        'main-adultsonly': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/ADULTS_CAROUSEL_MO-1675439673.jpeg' },
        // Турция РБ 50%
        'main-aegean-luxury': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/720x900_EB_TURKIYE_CAROUSEL_MO4-1680297058.jpeg' },
        // Тунис
        'main-tunis': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/720x900_TUNISIA_CAROUSEL_MO-1676290698.jpeg' },
        // Раннее бронирование
        'main-rb': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/720x900_EB_2023_CAROUSEL_MO0104-1681478122.jpeg' },
        // Мальдивы
        'maldives': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/MALDIVES_CAROUSEL_MO%20%2814%29-1682005076.jpeg' },
        // НГ ТОП6
        'nycrl': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/480x600_CORAL_NY_upd012023-1672642943.jpeg' },
        // Горнолыжка Россия
        'gornolizhnie_kurorti_ruscrl': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/RU_SKI_CAROUSEL_MO%20%281%29-1676293029.jpeg' },
        // НГ Россия
        'ny_rus_crl': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/480%D1%85600%20coral-1%20%281%29-1672130067.jpeg' },
        // Горящие туры
        'main-hot-tours': { mobile: 'https://image.useinsider.com/coraltravel/defaultImageLibrary/HOT_TOURS_CAROUSEL_MO-1673968421.jpeg' },
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