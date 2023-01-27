import css from "bundle-text:./index.less";
import markup from "bundle-text:./markup.html";
import { preload, responsiveHandler } from "../../../common/useful";

$('head').append(`<style>${ css }</style>`);

$('#banner-base .carousel-item a:nth(1)').each(function (idx, a) {
    var $link = $(a);
    var m = $link.attr('href').match(/\bbanner_on_site=([^&]+)/);
    var banner_id = m && m[1];
    if (banner_id === 'main-cyberweekend') {
        preload('https://player.vimeo.com/api/player.js', function () {
            $link.empty().addClass('cyberweekend-a').append($(markup));
            responsiveHandler('(max-width: 536px)', function () {
                var $player_el = $('#banner-base .video-box .hidden-on-desktop[data-vid]');
                var p = new Vimeo.Player($player_el.get(0),
                    {
                        id:          $player_el.attr('data-vid'),
                        background:  1,
                        playsinline: 1,
                        autopause:   0,
                        title:       0,
                        byline:      0,
                        portrait:    0
                    });
                p.on('play', function () {$player_el.addClass('playback')});

            }, function () {
                var $player_el = $('#banner-base .video-box .hidden-on-mobile[data-vid]');
                var p = new Vimeo.Player($player_el.get(0),
                    {
                        id:          $player_el.attr('data-vid'),
                        background:  1,
                        playsinline: 1,
                        autopause:   0,
                        title:       0,
                        byline:      0,
                        portrait:    0
                    });
                p.on('play', function () {$player_el.addClass('playback')});
            });
        });
    }
});
