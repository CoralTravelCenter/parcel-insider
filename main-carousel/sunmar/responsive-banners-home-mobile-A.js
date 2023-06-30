(function () {
    var creatives_map = {
        // образец:
        'значение параметра banner_on_site в ссылке на баннере': {
            mobile: 'URL мобильной версии'
        },
        // ...
        'main-turkey-summer': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/720x900_Summer_Turkey_Carousel_mobile%20%285%29-1687792733.jpeg'
        },
        'main-egypt': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/Sanmar_Egypt_CAROUSEL_mob%20%2810%29-1687792766.jpeg'
        },
        'main-regions-aegean': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_AEGEAN_TURKEY_CAROUSEL_MOBILE_SP%20%2810%29-1687792797.jpeg'
        },
        'main-oae-na-leto': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_OAE_CAROUSEL_MOBILE%20%287%29-1687792781.jpeg'
        },

        'main-allergyvacation-turkey': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_allergy_turkey_06_CAROUSEL_MOBILE-1685626564.jpeg'
        },
        'main-school-holiday-smr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_SUMMER_HOLIDAYS_CAROUSEL_MOBILE-1679644367.jpeg'
        },
        'main-youth-smr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_KV_Promo%20page%20for%20Youth%20Day_720x900%201-1687798256.jpeg'
        },
        'main-new-smr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/720x900_NEWl-1686324396.jpeg'
        },
        'main-georgia-smr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/720x900_NEWl-1686325413.jpeg'
        },
        'main-yacht-blue-voyage': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/720x900_YACHT_FOR_PAGE%201-1688048767.jpeg'
        },
        'main-gds-smr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/720x900_GDS_carousel%20%281%29-1686298816.jpeg'
        },
        'main-XANADU-MAKADI-BAY-smr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_SUMMER_HOLIDAYS_CAROUSEL_MOBILE%202-1683119774.jpeg'
        },
        'main-rus-smr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/Sunmar_open_russia_720x900%20%281%29-1684326445.jpeg'
        },
        'rus-may': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/Sunmar_summer_collection_May_CAROUSEL_Mob-1682008379.jpeg'
        },
        'main-rb': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/sm_720x900_eb_carousel_mobile%281%29-1683205694.jpeg'
        },
        'main-coralgroup-smr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SUNMAR_720x900_KV_HOTEL-1-1686234302.jpeg'
        },
        'main-23feb-smr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_EB_CAROUSEL_MOBILE-1682695605.jpeg'
        },
        'main-prazd': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900__Holidays_CAROUSEL_MOBILE-min-1679568450.jpeg'
        },
        'hotoffers': {
            mobile: 'https://cdn.sunmar.ru/content/actions/480x600-hotweek-turkey-0807.jpg'
        },
        'main-srilanka': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_Sri_Lanka_CAROUSEL_MOBILE-1682670879.jpeg'
        },
        'rc-otiumhotels': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_DJ_Nigmatullin2504-1682431142.jpeg'
        },
        'main-amazing-thailand': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_Thai_CAROUSEL_MOBILE%20%2812%29-1681394789.jpeg'
        },
        'main-abudabi': {
            mobile: 'https://cdn.sunmar.ru/content/insider/russia/home-banners/480x600_abu_dhabi_sm_mo.jpg'
        },
        'main-ras_al_khaimah': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_Ras%20Al%20Khaimah_CAROUSEL_MOBILE%20%288%29-1679325173.jpeg'
        },
        'main-summer-collection': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_480x600_Summer2023_CAROUSEL_MOBILE-1675252100.jpeg'
        },
        'main-dubai': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_DUBAI_CAROUSEL_MOBILE-1675676877.jpeg'
        },
        'ng_rus_smr': {
            mobile: 'https://cdn.sunmar.ru/content/actions/sm_480x600_winter_russia_carousel_mobile.jpg'
        },
        'gornolyzhny-tury-russmr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_Ski_Winter_CAROUSEL_MOBILE-1676295077.jpeg'
        },
        'tailand-tours': {
            mobile: 'https://cdn.sunmar.ru/content/insider/russia/home-banners/480x600_sunmar_thai_mo.jpg'
        },
        'main-rasalyhayma': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_Ras%20Al%20Khaimah_CAROUSEL_MOBILE%20%288%29-1679325173.jpeg'
        },
        'stambulsmr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/480x600%20%281%29-1664538307.jpeg'
        },
        'nysmr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_480x600_NYtours_CAROUSEL_MOBILE-1672643155.jpeg'
        },
        'main-supertseny': {
            mobile: 'https://cdn.sunmar.ru/content/actions/sm_480x600_india11.11_carousel_mobile.jpg'
        },
        'main-goryashie-tury': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_480x600_HOT_TOURS-1674036483.jpeg'
        },
        'gorniesnm': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_480x600_Ski_Turkey_CAROUSEL_MOBILE%20%281%29%20%281%29-1673260689.jpeg'
        },
        'oae-tours': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_UAE_CAROUSEL_MOBILE%20%281%29-1683039154.jpeg'
        },
        'egipet': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SUNMAR_CAROUSEL_MOBILE_v2-1655740525.jpeg'
        },
        'oti-egypt': {
            mobile: 'https://cdn.sunmar.ru/content/insider/russia/home-banners/480x600_oti_hotels_08.jpg'
        },
        'sfc': {
            mobile: 'https://cdn.sunmar.ru/content/actions/480x600_sm_sfc_mobile.jpg'
        },
        'programma-shardzha-uae': {
            mobile: 'https://cdn.sunmar.ru/content/img/480х600_sunmar_winter_uae_mo2.jpg'
        },
        'aquaworld': {
            mobile: 'https://cdn.sunmar.ru/content/insider/russia/home-banners/480x600_aquaworld_08.jpg'
        },
        'kemersmr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SUNMAR_CAROUSEL_MOBILE%20%281%29-1659700612.jpeg'
        },
        'cashback': {
            mobile: 'https://cdn.sunmar.ru/content/insider/russia/home-banners/480x600_main_cb20rus_sunmar_mo.jpg'
        },
        'barhatniy_russia_snmr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/480x600%20sunmar-1-1662369605.jpeg'
        },
        'egypt_snmr': {
            mobile: 'https://cdn.sunmar.ru/content/insider/russia/home-banners/480x600-sunmar-egypt-3.jpg'
        },
        'egypt_bc': {
            mobile: 'https://cdn.sunmar.ru/content/actions/480x600-sunmar-bclass-egypt.jpg'
        },
        'newyear-russia': {
            mobile: 'https://cdn.sunmar.ru/content/actions/480х600_sunmar_home_ny_russia2022.jpg'
        },
        'bodrumsmr': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/sunmar_extra_bodrum_mo%20%281%29-1659012384.jpeg'
        },
        'best-destinations': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SUNMAR_TOP_MO-1657292022.jpeg'
        },
        'main-bahreyn': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/upd_bahrein_SUNMAR_04_MO-1688048753.jpeg'
        },
        'tury-do': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_HOT_CAROUSEL_MOBILE-1675676980.jpeg'
        },
        'best_hotels': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SUNMAR_AEGEAN_UPD_MO-1657120593.jpeg'
        },
        'incprice': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/480x600-bestprice-hotel-turkey-1654600242.jpeg'
        },
        'turkey': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/Turkish_MO_SM%20%281%29-1654696173.jpeg'
        },
        'best': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/480x600%20sunmar%20%281%29-1659622951.jpeg'
        },
        'izmir-dalaman': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/480x600%20%2837%29-1655903856.jpeg'
        },
        'shardzha': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/480x600%20%2851%29-1657096859.jpeg'
        },
        'smrmaldives': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SM_720x900_Maldives_CAROUSEL_MOBILE%20%2813%29-1681742708.jpeg'
        },
        'liberty-hotels-lykia': {
            mobile: 'https://cdn.sunmar.ru/content/img/480x600-hotel-liberty-lykia-s.jpg'
        },
        'lujo-hotel': {
            mobile: 'https://cdn.sunmar.ru/content/img/turkey/lujo_home_07_sm_mo.jpg'
        },
        'aegean': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/480x600%20%2814%29%20%281%29-1654683654.jpeg'
        },
        'top50': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/SUNMAR_CAROUSEL_MOBILE_v2%20%283%29-1656924048.jpeg'
        },
        'russia': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/TOP_MOB_Russia-1653494435.jpeg'
        },
        'turkey-autumn': {
            mobile: 'https://cdn.sunmar.ru/content/img/turkey/480x600_turkey_autumn_sunmar_carousel_mobile.jpg'
        },
        'dostupnie_strany': {
            mobile: 'https://image.useinsider.com/sunmar/defaultImageLibrary/480x600%20%2819%29-1654695993.jpeg'
        }
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