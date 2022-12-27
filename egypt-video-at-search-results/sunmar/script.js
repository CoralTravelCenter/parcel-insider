function createCookie(name, value, days, options={}) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString()
    } else
        var expires = "";
    var updatedCookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue
        }
    }
    document.cookie = updatedCookie
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length)
    }
    return null
}
function eraseCookie(name) {
    createCookie(name, "", -1)
}

var showVideoShown = readCookie('egypt_video_shown');
var isThailand = $('.packageSearch__destinationInput[countryid="12"]');

if( isThailand.length ){

    if( showVideoShown != 1 ){
        var isPopup = false;

        function showVideo(){
            var POPUP_HTML = '';

            POPUP_HTML = `
            <div class="dm-ins-video-thailand">
                <div class="dm-ins-video-thailand__content">
                    <div class="dm-ins-video-thailand__player" id="dm-ins-video__player--js" data-vimeo-idd="784358869"></div>
                    <div class="dm-ins-video-thailand__desc">
                        <div class="dm-ins-video-thailand__header">Комфортный отдых в Египте для всей семьи!</div>
                        <div class="dm-ins-video-thailand__text">Кристально чистое Красное море, головокружительное сафари и яркие коралловые рифы</div>
<!--                        <div class="dm-ins-video-thailand__note">*Покрытие и особенности песка зависят от пляжа</div>-->
                        <div class="dm-ins-video-thailand__btn-row"><a class="dm-ins-video-thailand__btn" href="https://www.sunmar.ru/tury-egypt-dekabr/" target="_blank"  onclick="ym(215233,'reachGoal','popup_egypt_video')">Вырать тур</a></div>
                    </div>
                </div>
            </div>
            `;

            myo.open({
                clas: 'dm-ins-video-thailand__popup',
                html: POPUP_HTML,
                beforeOpen: function(){
                    isPopup = true;
                    if( typeof window.Vimeo != 'object'){
                        $.getScript( "https://player.vimeo.com/api/player.js", function( data, textStatus, jqxhr ) {
                            dmVideo();
                        });
                    }
                    else{
                        dmVideo();
                    }
                    createCookie('egypt_video_shown', 1, 1)
                },
                afterClose: function(){
                    this.bodyDiv.html('');
                    isPopup = false;
                },
                afterOpen: function(){
                },
            });
        }


        if( typeof window.myo != 'object' && typeof window.myo == 'undefined' ){
            $.getScript( "https://cdn.coral.ru/content/insider/russia/libs/popup.txt", function( data, textStatus, jqxhr ) {
                showVideo();
            });
        }
        else{
            showVideo();
        }

        function dmVideo(){
            var $player_el, p;
            $player_el = $('#dm-ins-video__player--js[data-vimeo-idd]');
            p = new Vimeo.Player($player_el.get(0), {
                id: $player_el.attr('data-vimeo-idd'),
                background: 1,
                playsinline: 1,
                autopause: 0,
                title: 0,
                byline: 0,
                portrait: 0
            });
            return p.on('play', function () {
                return $player_el.addClass('playback');
            });
        }
    }
}