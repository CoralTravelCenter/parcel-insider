// language=html
var defaultStyles = `
    <div class="ins-dm-panel-new">
        <div class="ins-dm-panel__addons" data-amount="0"></div>
<!--
        <div class="ins-dm-panel__gochat" data-amount="">
            <div class="ins-dm-panel__note"><span class="ins-dm-panel__note__span&#45;&#45;has">Написать&nbsp;в&nbsp;чат</span><span class="ins-dm-panel__note__span&#45;&#45;empty">Написать&nbsp;в&nbsp;чат</span></div>
        </div>
-->
        <div class="ins-dm-panel">
            <div class="ins-dm-panel__wishlist" data-amount="0">
                <div class="ins-dm-panel__note"><span class="ins-dm-panel__note__span--has">Нажмите,&nbsp;чтобы&nbsp;посмотреть<br>избранные&nbsp;вами&nbsp;отели</span><span class="ins-dm-panel__note__span--empty">Вы&nbsp;еще&nbsp;не&nbsp;добавили&nbsp;отели&nbsp;в&nbsp;избранное.<br>Добавьте,&nbsp;чтобы&nbsp;не&nbsp;потерять!</span></div>
            </div>
            <div class="ins-dm-panel__resent" data-amount="">
                <div class="ins-dm-panel__note"><span class="ins-dm-panel__note__span--has">Мы&nbsp;сохранили&nbsp;отели,<br>которые&nbsp;вы&nbsp;смотрели&nbsp;ранее</span><span class="ins-dm-panel__note__span--empty">После&nbsp;просмотра&nbsp;отеля,<br>информация&nbsp;о&nbsp;нем&nbsp;сохранится&nbsp;здесь!</span></div>
            </div>
        </div>
    </div>
<style>

    jdiv.__jivoDesktopButton[class*=_hoverMenu_] {
        z-index: 10000;
    }

    jdiv.__jivoDesktopButton jdiv[class*=menuWrap_] {
        right: 6em;
        padding-right: 1em;
    }
    
    /*body jdiv.hoverl_fddb:hover .omnichannel_c77c {*/
    body jdiv[class*='hoverl_']:hover [class*='omnichannel_'] {
        display: none;
    }
    
    /*body jdiv.agentName_df21.__agents_f6fd {*/
    body jdiv[class*='agentName_'][class*='__agents_'] {
        max-width: 260px;
    }

    .ins-dm-panel {
        z-index: -1;
        pointer-events: none;
        opacity: 0;
        transition: opacity .2s;
    }
    .ins-dm-panel.shown, .ins-dm-panel:hover {
        pointer-events: auto;
        opacity: 1;
    }
    .ins-dm-panel .ins-dm-panel__wishlist {
        transition: transform .4s cubic-bezier(.17,.67,.65,1.19);
        transform: translate(5.5em, 0) rotate(-90deg);
    }
    .ins-dm-panel .ins-dm-panel__resent {
        transition: transform .4s cubic-bezier(.17,.67,.65,1.19);
        transform: translate(5.5em, -5em) rotate(-90deg);
    }
    .ins-dm-panel.shown .ins-dm-panel__wishlist, .ins-dm-panel:hover .ins-dm-panel__wishlist, 
    .ins-dm-panel.shown .ins-dm-panel__resent, .ins-dm-panel:hover .ins-dm-panel__resent 
    {
        transform: none;
    }

    html.mobile.dm-popover-opened,
html.mobile.dm-popover-opened > body {
  -webkit-overflow-scrolling: touch !important;
  overflow: auto !important;
  height: 100% !important;
}

.dm-popover__container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  direction: ltr;
}

.dm-popover__dim {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  z-index: 0;
  opacity: 0;
}

.dm-popover__wrap {
  display: none;
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  flex: 0 0 auto;
  margin: auto;
}

.dm-popover__close {
  z-index: 2;
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAANjr9RwUqgAAACBjSFJNAABtmAAAc44AAPJxAACDbAAAg7sAANTIAAAx7AAAGbyeiMU/AAAG7ElEQVR42mJkwA8YoZjBwcGB6fPnz4w/fvxg/PnzJ2N6ejoLFxcX47Rp036B5Dk4OP7z8vL+P3DgwD+o3v9QjBUABBALHguZoJhZXV2dVUNDgxNIcwEtZnn27Nl/ZmZmQRYWFmag5c90dHQY5OXl/z98+PDn1atXv79+/foPUN9fIP4HxRgOAAggRhyWMoOwqKgoq6GhIZe3t7eYrq6uHBDb8/Pz27Gysloga/jz588FYGicPn/+/OapU6deOnXq1GdgqPwCOuA31AF/0S0HCCB0xAQNBU4FBQWB0NBQublz59oADV37Hw28ePHi74MHD/6ii3/8+HEFMGQUgQ6WEhQU5AeZBTWTCdkigABC9ylIAZeMjIxQTEyMysaNG/3+/v37AGTgr1+//s2cOfOXm5vbN6Caz8jY1NT0a29v76/v37//g6q9sHfv3khjY2M5YAgJgsyEmg0PYYAAQreUk4+PT8jd3V1l1apVgUAzfoIM2rlz5x9gHH5BtxAdA9PB1zNnzvyB+R6oLxoopgC1nBPZcoAAgiFQnLIDMb+enp5iV1eXBzDeHoI0z58//xcwIX0mZCkMg9S2trb+hFk+ffr0QCkpKVmQ2VA7QHYxAgQQzLesQMwjIiIilZWVZfPu3bstMJ+SYikyBmUzkBnA9HEMyNcCYgmQHVC7mAACCJagOEBBbGdnp7lgwYJEkIavX7/+BcY1SvAaGRl9tba2xohjMTGxL8nJyT+AWQsuxsbG9vnp06e/QWYdPHiwHmiWKlBcCGQXyNcAAQSzmBuoSQqYim3u37+/EKR48uTJv5ANB+bVr7Dga2xs/AkTV1JS+gq0AJyoQIkPWU9aWtoPkPibN2/2A/l6QCwJ9TULQADB4hcY//xKXl5eHt++fbsAUmxhYYHiM1DiAsr9R7ZcVVUVbikIdHd3/0TWIyws/AWYVsByAgICdkAxRSAWAGI2gACClV7C4uLiOv7+/lEgRZ8+ffqLLd6ABck3ZMuB6uCWrlu37je29HDx4kVwQisvL88FFqkaQDERUHADBBAomBl5eHiYgQmLE1hSgQQZgIUD1lJm69atf4HR8R1YKoH5QIPAWWP9+vV/gOI/gHkeQw+wGAXTwAJJ5t+/f/BUDRBA4NIEKMDMyMjICtQIiniG379/4yza7t69+//Lly8oDrty5co/bJaCAEwcZCkwwTJDLWYCCCCwxcDgY3z16hXDnTt3voP4EhISWA0BFgZMwNqHExh3jMiG1tbWsgHjnA2bHmAeBtdWwOL1MycnJ7wAAQggBmi+kgIW/OaKiorJwOLuFShO0LMSMPF9AUYBSpz6+vqixHlOTs4P9MIEWHaDsxSwYMoE2mEGFJcG5SKAAGJCqjv/AbPUn8ePH98ACQQHB6NUmZqamkzABIgSp5s3bwbHORCA1QDLAWZkPc7OzszA8oHl5cuXVy5duvQBGIXwWgoggGA+FgO6xkBNTS28r69vDrT2+Y1cIMDyJchX6KkXVEmAshd6KB06dAic94EO3AzkBwGxPhCLg8ptgACCZyeQp9jZ2b2AmsuAefM8tnxJCk5ISPgOLTKfAdNEOVDMA2QHLDsBBBC8AAFlbmCLwlZISCg5JSVlJizeQAaQaimoWAUFK0g/sGGwHiiWCMS2yAUIQAAxI7c4gEmeFZi4OJ48ecLMzc39CRiEmgEBASxA/QzA8vYvAxEgNjaWZc2aNezAsprp2LFjp4FpZRdQ+AkQvwLij0AMSoC/AQIIXklAC3AVUBoBxmE8sPXQAiyvN8J8fuPGjR/h4eHf0eMdhkENhOPHj8OT+NGjR88BxZuBOA5kJtRseCUBEECMSI0AdmgBDooDaaDl8sASTSkyMlKzpqZGU1paGlS7MABLrX83b978A6zwwakTmE0YgIkSnHpBfGCV+gxYh98qKSk5CeTeAxVeQPwUiN8AMSjxgdLNX4AAYkRqCLBAXcMHtVwSaLkMMMHJAvOq9IQJE9R8fHxElJWV1bEF8aNHj+7t27fvLTDlXwXGLyhoH0OD+DnU0k/QYAa1QP8BBBAjWsuSFWo5LzRYxKFYAljqiAHzqxCwIBEwMTERBdZeoOYMA7Bl+RFYEbwB5oS3IA9D4/IFEL+E4nfQ6IDFLTgvAwQQI5ZmLRtSsINSuyA0uwlBUyQPMPWD20/AKo8ByP4DTJTfgRgUjB+gFoEc8R6amGDB+wu5mQsQQIxYmrdMUJ+zQTM6NzQEeKGO4UJqOzFADQMZ/A1qCSzBfQXi71ALfyM17sEAIIAY8fQiWKAYFgIwzIbWTv4HjbdfUAf8RPLhH1icojfoAQKIEU8bG9kRyF0aRiz6YP0k5C4LsmUY9TtAADEyEA+IVfufGEUAAQYABejinPr4dLEAAAAASUVORK5CYII=");
  background-repeat: no-repeat;
  background-position: 0 0;
}

.dm-popover__body {
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  padding: 20px 40px 35px;
  vertical-align: middle;
  border: 1px solid #b7b7b7;
  background: #fff;
}

.dm-popover__body:before,
.dm-popover__body:after {
  content: "";
  display: table;
}

.dm-popover__body:after {
  clear: both;
}

.dm-popover__loader {
  display: none;
  background: url("data:image/gif;base64,R0lGODlhEAAQAPQAAP///8zMzPz8/NfX1+Xl5c3NzdPT0/b29u3t7dDQ0OPj4+Dg4Pj4+Onp6fLy8tra2tzc3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAAKAAEALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkEAAoAAgAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkEAAoAAwAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAAKAAQALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAAKAAUALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==") no-repeat center #f2f7fd;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  z-index: 1;
  cursor: pointer;
  border-radius: 10px;
}

.dm-popover__scrolling {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  z-index: 1;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: flex-start;
  -ms-flex-align: start;
  padding: 20px;
  box-sizing: border-box;
}

.dm-popover__scrolling.disable {
  overflow: hidden;
  z-index: -1;
}

.dm-ins-wish-list__tour {
  width: 30em;
  background-color: #fff;
  border-radius: 2em;
  padding-bottom: 0.5em;
  margin: 0 0.625em;
  transition: all 0.2s;
  transform: scale(1);
}

.dm-ins-wish-list__tour.dm-ins-wish-list__tour--detele {
  transform: scale(0);
}

.dm-ins-wish-list__img-wrap {
  margin-bottom: 2em;
}

.dm-ins-wish-list__img {
  width: 100%;
  display: block;
  height: 16.25em;
  border-radius: 2em;
  object-fit: cover;
}

.dm-ins-wish-list__rating {
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
}

.dm-ins-wish-list__rating-item {
  width: 2.125em;
  height: 2em;
  margin: 0 0.1875em;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNyAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjQ5NTYgNC42OTY4NUwxNi4xMjE0IDUuMzU5MjFDMTYuMzEwMiA1LjM4NjA1IDE2LjQ4NzcgNS40NjM0IDE2LjYzMzggNS41ODI2QzE2Ljc3OTkgNS43MDE3OSAxNi44ODg5IDUuODU4MTIgMTYuOTQ4NyA2LjAzNDA3QzE3LjAwODMgNi4yMTA5OCAxNy4wMTYyIDYuNDAwNSAxNi45NzEyIDYuNTgxNDdDMTYuOTI2MyA2Ljc2MjQ0IDE2LjgzMDUgNi45Mjc3MyAxNi42OTQ0IDcuMDU4ODZMMTMuMzQwMSAxMC4yNTJMMTQuMTMyIDE0LjgzMjNDMTQuMTY0MyAxNS4wMTY3IDE0LjE0MjUgMTUuMjA2MiAxNC4wNjkxIDE1LjM3OTFDMTMuOTk1NiAxNS41NTIgMTMuODczNSAxNS43MDE0IDEzLjcxNjggMTUuODEwMkMxMy41NjA3IDE1LjkxOSAxMy4zNzY1IDE1Ljk4MzMgMTMuMTg0OSAxNS45OTZDMTIuOTkzMiAxNi4wMDg3IDEyLjgwMTcgMTUuOTY5MiAxMi42MzE5IDE1Ljg4Mkw4LjQ5ODcxIDEzLjc0MzRMNC4zNjg2OSAxNS44ODM2QzQuMTk4MzQgMTUuOTcwOSA0LjAwNjMzIDE2LjAxMDQgMy44MTQxNiAxNS45OTc3QzMuNjIxOTggMTUuOTg1IDMuNDM3MjUgMTUuOTIwNiAzLjI4MDY2IDE1LjgxMTdDMy4xMjQyOCAxNS43MDI4IDMuMDAyNjkgMTUuNTUzMiAyLjkyOTgyIDE1LjM4MDNDMi44NTY5NSAxNS4yMDczIDIuODM1NzQgMTUuMDE3OSAyLjg2ODYyIDE0LjgzMzhMMy42NjA1IDEwLjI1MzVMMC4zMDUzMDUgNy4wNTg4NkMwLjE2OTMxMSA2LjkyNzY1IDAuMDczNTQ5OSA2Ljc2MjM1IDAuMDI4NzAzIDYuNTgxNEMtMC4wMTYxNDQgNi40MDA0NSAtMC4wMDgzMTM2NyA2LjIxMDk2IDAuMDUxMzIzIDYuMDM0MDdDMC4xMTA3MzkgNS44NTc3NyAwLjIxOTgwMyA1LjcwMTEzIDAuMzY2MTc3IDUuNTgxODdDMC41MTI1NSA1LjQ2MjYgMC42OTAzOTMgNS4zODU0OCAwLjg3OTU4MSA1LjM1OTIxTDUuNTAxNDcgNC42OTY4NUw3LjU3NDUyIDAuNTYyMzg3QzcuNjU4NDcgMC4zOTM4MjkgNy43ODk2NyAwLjI1MTY1NiA3Ljk1MzA5IDAuMTUyMTgyQzguMTE2NSAwLjA1MjcwODYgOC4zMDU0OSAtMy40NjMwNmUtMDUgOC40OTgzOCAzLjIzODMxZS0wNkM4LjY5MTc5IC0wLjAwMDQ3NTExNCA4Ljg4MTQgMC4wNTIwNTEyIDkuMDQ1NDEgMC4xNTE1NDFDOS4yMDk0MiAwLjI1MTAzMiA5LjM0MTE2IDAuMzkzNDQzIDkuNDI1NDYgMC41NjIzODdMMTEuNDk1NiA0LjY5Njg1WiIgZmlsbD0iI0YwQUIwMCIvPgo8L3N2Zz4K") 0 0 no-repeat;
  background-size: contain;
}

.dm-ins-wish-list__rating-text {
  color: #f0ab00;
  font-size: 1.75em;
  line-height: 1.142857142857143em;
  height: 1.142857142857143em;
  font-weight: 400;
  font-style: italic;
}

.dm-ins-wish-list__title {
  text-align: center;
  font-weight: 500;
  font-size: 1.75em;
  line-height: 1.178571428571429em;
  text-transform: uppercase;
  color: #000;
  padding: 0 1.142857142857143em;
  margin-bottom: 1.142857142857143em;
}

.dm-ins-wish-list__location {
  text-align: center;
  font-weight: 400;
  font-size: 1em;
  line-height: 0.875em;
  color: #000;
  padding: 0 2em;
  margin-bottom: 2em;
}

.dm-ins-wish-list__location:before {
  content: '';
  display: inline-block;
  width: 0.8125em;
  height: 1.0625em;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxMyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuNSAxNkM2LjI5MjY3IDE2IDYuMDkxNjIgMTUuOTIxMSA1Ljk0NzEyIDE1Ljc3NTVDNS43MjcyMiAxNS41NjMxIDAuNSAxMC40ODQyIDAuNSA2Ljg0MzQ1QzAuNSAzLjYyMTM2IDMuMTk1MjkgMSA2LjUgMUM5LjgwNDcxIDEgMTIuNSAzLjYyMTM2IDEyLjUgNi44NDM0NUMxMi41IDguMzA1ODMgMTEuNjgzMiAxMC4xNTA1IDEwLjA2MjMgMTIuMzIyOEw5LjcyMzA0IDEyLjc0NzZDOS4yMTQxNCAxMy4zNzg2IDguNzM2NjUgMTMuOTczMyA4LjMwMzE0IDE0LjQ2NDhDOC4wMjY3IDE0Ljc2ODIgNy44MTMwOSAxNC45OTg4IDcuNjM3MTcgMTUuMTg2OUM3LjYwNTc2IDE1LjIyMzMgNy41OTMxOSAxNS4yMjk0IDcuNTgwNjMgMTUuMjQ3NkM3LjI2MDIxIDE1LjU4MTMgNy4wNjU0NCAxNS43Njk0IDcuMDUyODggMTUuNzc1NUM2LjkwMjA5IDE1LjkyMTEgNi43MDczMyAxNiA2LjUgMTZaTTYuNSAxLjYwNjhDMy41MzQ1NiAxLjYwNjggMS4xMjgyNyAzLjk1NTEgMS4xMjgyNyA2Ljg0MzQ1QzEuMTI4MjcgMTAuMjM1NCA2LjMzNjY1IDE1LjI5NjEgNi4zOTMxOSAxNS4zNDQ3QzYuNDc0ODcgMTUuNDIzNSA2LjUzNzcgMTUuNDIzNSA2LjYxMzA5IDE1LjM0NDdDNi42MTkzNyAxNS4zMzg2IDYuODA3ODUgMTUuMTU2NiA3LjExNTcxIDE0LjgzNUw3LjE2NTk3IDE0Ljc4MDNDNy4zNDgxNyAxNC41ODYyIDcuNTU1NSAxNC4zNjE3IDcuNzg3OTYgMTQuMTA2OEw3LjgzMTk0IDE0LjA2NDNDOC4yNTkxNiAxMy41ODUgOC43MzAzNyAxMi45OTY0IDkuMjMyOTggMTIuMzcxNEw5LjQyNzc1IDEyLjEyMjZWMTEuNTcwNFYxMi4xMjI2TDkuNTUzNCAxMS45NzA5QzExLjA5MjcgOS44OTU2MyAxMS44NzE3IDguMTcyMzMgMTEuODcxNyA2LjgzNzM4QzExLjg3MTcgMy45NDkwMyA5LjQ1OTE2IDEuNjAwNzMgNi41IDEuNjAwNzNWMS42MDY4Wk02LjQ0OTc0IDkuMTY3NDhDNS4xNjgwNiA5LjE2NzQ4IDQuMDQ5NzQgOC4wODEzMSA0LjA0OTc0IDYuODQ5NTFDNC4wNDk3NCA1LjYxNzcyIDUuMTc0MzUgNC41MzE1NSA2LjQ0OTc0IDQuNTMxNTVDNy44MTkzNyA0LjUzMTU1IDguODQ5NzQgNS41MjY3IDguODQ5NzQgNi44NDk1MUM4Ljg0OTc0IDguMTcyMzMgNy44MTkzNyA5LjE2NzQ4IDYuNDQ5NzQgOS4xNjc0OFpNNi40NDk3NCA1LjEzMjI4QzUuNTA3MzMgNS4xMzIyOCA0LjY3ODAxIDUuOTMzMjYgNC42NzgwMSA2Ljg0MzQ1QzQuNjc4MDEgNy43NTM2NCA1LjUwNzMzIDguNTU0NjEgNi40NDk3NCA4LjU1NDYxQzcuNDYxMjYgOC41NTQ2MSA4LjIyMTQ3IDcuODIwMzkgOC4yMjE0NyA2Ljg0MzQ1QzguMjIxNDcgNS44NjY1MSA3LjQ2MTI2IDUuMTMyMjggNi40NDk3NCA1LjEzMjI4WiIgZmlsbD0iYmxhY2siIHN0cm9rZT0iYmxhY2siLz4KPC9zdmc+Cg==");
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  vertical-align: middle;
  margin-right: 0.25em;
}

.dm-ins-wish-list__seen {
  text-align: center;
  font-weight: 400;
  font-size: 1.25em;
  line-height: 1.2em;
  color: #000;
  padding: 0 1.6em;
  margin-bottom: 1.6em;
  display: none;
}

.dm-ins-wish-list__seen b {
  color: #0192d1;
}

.dm-ins-wish-list__note {
  text-align: center;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.214285714285714em;
  color: #000;
  padding: 0 7.142857142857143em;
  margin-bottom: 2.285714285714286em;
}

.dm-ins-wish-list__nights {
  text-align: center;
  font-weight: 400;
  font-size: 1.25em;
  line-height: 1.2em;
  color: #000;
  margin-bottom: 1.6em;
}

.dm-ins-wish-list__price {
  text-align: center;
  font-weight: 700;
  font-size: 3em;
  line-height: 1.208333333333333em;
  color: #000;
  margin-bottom: 0.666666666666667em;
}

.dm-ins-wish-list__btn-wrap {
  text-align: center;
  margin-bottom: 2em;
}

.dm-ins-wish-list__btn {
  display: inline-flex;
  font-size: 1.5em !important;
  line-height: 1.208333333333333em !important;
  color: #fff !important;
  background-color: #f0ab00;
  border-radius: 0.5em;
  min-height: 2.5em;
  justify-content: center;
  align-items: center;
  padding: 0 1em;
  min-width: 11.666666666666666em;
  transition: all 0.4s;
}

.dm-ins-wish-list__btn:hover,
.dm-ins-wish-list__btn:active {
  background-color: #db9d00;
}

.dm-ins-wish-list__del-wrap {
  text-align: center;
  margin-bottom: 2em;
}

.dm-ins-wish-list__del {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.dm-ins-wish-list__del-title {
  font-size: 1.5em;
  line-height: 1.5em;
  color: #000;
  text-transform: uppercase;
}

.dm-ins-wish-list__del-img {
  width: 2em;
  height: 2em;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDEuNUwxIDE1LjUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNSAxNS41TDEgMS41IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K") 0 0 no-repeat;
  background-size: contain;
  margin-left: 0.625em;
}

.dm-ins-wish-list__add-wrap {
  text-align: center;
  margin-bottom: 2em;
}

.dm-ins-wish-list__add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dm-ins-wish-list__add-title {
  font-size: 1.5em;
  line-height: 1.5em;
  color: #777;
  cursor: pointer;
  white-space: nowrap;
  text-transform: uppercase;
}

.dm-ins-wish-list__add-title:before {
  content: attr(data-add);
}

.dm-ins-wish-list__add.js--added .dm-ins-wish-list__add-title:before {
  content: attr(data-added);
}

.dm-ins-wish-list__add.js--added .dm-ins-wish-list__add-svg {
  fill: #de0000;
}

.dm-ins-wish-list__add.js--added .dm-ins-wish-list__add-svg path {
  stroke: #de0000;
}

.dm-ins-wish-list__add-amount {
  font-size: 1.5em;
  line-height: 1.5em;
  color: #000;
  margin-left: 0.5em;
  cursor: pointer;
}

.dm-ins-wish-list__add-amount:before {
  content: attr(data-amount-left) attr(data-amount) attr(data-amount-right);
}

.dm-ins-wish-list__add-svg {
  display: block;
  width: 2.5em;
  height: auto;
  margin-right: 1em;
  cursor: pointer;
}

.dm-ins-wish-list__add-svg path {
  stroke: #777;
}

.dm-ins-wish-list__add2 {
  color: #000;
  font-weight: 400;
  position: relative;
}

.dm-ins-wish-list__add2__btn {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  width: 13.125em;
  margin-right: 1.625em;
  margin-right: 10px;
  width: auto;
  align-items: center;
}

.dm-ins-wish-list__add2__svg {
  display: block;
  height: auto;
  width: 1.25em;
  height: 1.25em;
  fill: #fff;
  margin-right: 0.625em;
  margin-right: 4px;
  width: 20px;
  height: 17px;
}

.dm-ins-wish-list__add2__title {
  color: #0093d0;
  font-size: 0.875em;
  line-height: 1.428571428571429em;
  font-weight: 700;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
}

.dm-ins-wish-list__add2__amount--2:before {
  content: attr(data-amount);
}

.dm-ins-wish-list__add2__amount--2:hover:before {
  text-decoration: underline;
}

.dm-ins-wish-list__add2__amount--3:before {
  content: attr(data-text-empty);
  margin-right: 0.4em;
}

.dm-ins-wish-list__add2__msg {
  position: absolute;
  background-color: #fff;
  border-radius: 0.75em;
  padding: 1em;
  width: 14em;
  box-shadow: 0.9375em 0.9375em 1.5em rgba(0,0,0,0.15);
  text-align: center;
  top: 100%;
  left: -6.375em;
  margin-top: 0.375em;
  transform: translate(0, 20%);
  opacity: 0;
  z-index: -1;
  transition: all 0.3s;
  user-select: none;
}

.dm-ins-wish-list__add2__msg--show {
  transform: translate(0, 0%);
  opacity: 1;
  z-index: 1;
}

.dm-ins-wish-list__add2__msg:before {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0.625em 0.625em 0.625em;
  border-color: transparent transparent #fff transparent;
  content: '';
  position: absolute;
  left: 50%;
  top: -0.625em;
  transform: translateX(-50%);
}

.dm-ins-wish-list__add2__msg-title {
  font-size: 0.875em;
  line-height: 1.214285714285714em;
  margin-bottom: 0.5em;
}

.dm-ins-wish-list__add2__msg-btn {
  color: #0093d0 !important;
  font-size: 0.875em !important;
  line-height: 1.214285714285714em !important;
  font-weight: 700;
  text-align: center;
  text-decoration: underline;
}

.dm-ins-wish-list__add2__msg-btn:hover {
  text-decoration: none;
}

.dm-ins-wish-list__popup .dm-popover__body {
  background: none;
  padding: 0;
  border: none;
}

.dm-ins-wish-list__popup .dm-popover__close {
  width: 3em;
  height: 3em;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDEuNUwxIDE1LjUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xNSAxNS41TDEgMS41IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K") 0 0 no-repeat;
  background-size: contain;
  right: 2em;
  top: 2em;
}

.dm-ins-wish-list__popup__title {
  font-size: 2.5em;
  line-height: 1.2em;
  text-align: center;
  color: #000;
  font-weight: 500;
  margin-bottom: 1.5em;
}

.dm-ins-wish-list__popup__title__span {
  margin-bottom: 0.5em;
}

.dm-ins-wish-list__popup__title__span--delete {
  cursor: pointer;
  font-size: 0.5em;
  font-size: 0.375em;
  line-height: 2em;
  text-transform: uppercase;
  padding: 0 0 0 2.25em;
  position: relative;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjIzMjUgNS4zMDgxMUgzLjczMjU0IiBzdHJva2U9IiMxMDE4MjgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik04LjIzMjU0IDIuMzA4MTFIMTUuNzMyNSIgc3Ryb2tlPSIjMTAxODI4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTguNzMyNSA1LjMwODExVjE5LjU1ODFDMTguNzMyNSAxOS43NTcgMTguNjUzNSAxOS45NDc4IDE4LjUxMjkgMjAuMDg4NEMxOC4zNzIyIDIwLjIyOTEgMTguMTgxNSAyMC4zMDgxIDE3Ljk4MjUgMjAuMzA4MUg1Ljk4MjU0QzUuNzgzNjMgMjAuMzA4MSA1LjU5Mjg3IDIwLjIyOTEgNS40NTIyMSAyMC4wODg0QzUuMzExNTYgMTkuOTQ3OCA1LjIzMjU0IDE5Ljc1NyA1LjIzMjU0IDE5LjU1ODFWNS4zMDgxMSIgc3Ryb2tlPSIjMTAxODI4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K") left center no-repeat;
  background-size: 1.5em auto;
  align-self: center;
}

.dm-ins-wish-list__popup__title--resent {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

.dm-ins-wish-list__slider-wrap {
  background: #f2f7fd;
  border-radius: 1.25em;
  padding: 3.75em 0 3em;
  width: calc(100vw - 40px);
}

.dm-ins-wish-list__slider .owl-nav {
  display: flex;
  justify-content: space-between;
  margin: 2em 3.125em 0;
}

.dm-ins-wish-list__slider .owl-nav button.owl-prev,
.dm-ins-wish-list__slider .owl-nav button.owl-next {
  width: 12em;
  height: 3.6em;
  top: 0;
  transition: all 0.3s;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 1.25em;
  line-height: 1.2em;
  color: #000;
  text-transform: uppercase;
}

.dm-ins-wish-list__slider .owl-nav button.owl-prev {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNzYiIHZpZXdCb3g9IjAgMCA0MSA3NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTM5IDJMMyAzOEwzOSA3NCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==") 0 0 no-repeat;
  background-size: auto 100%;
  text-align: left;
  padding-left: 3em !important;
}

.dm-ins-wish-list__slider .owl-nav button.owl-next {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNzYiIHZpZXdCb3g9IjAgMCA0MSA3NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNzRMMzggMzhMMi4wMDAwMSAyIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K") right 0 no-repeat;
  background-size: auto 100%;
  text-align: right;
  padding-right: 3em !important;
}

.dm-ins-wish-list__slider .owl-nav button.disabled {
  opacity: 0.3;
}

.dm-ins-wish-list__timer-wrap {
  width: 35em;
  margin: 0 auto;
  background-color: rgba(0,0,0,0.5);
  border-radius: 0 0 1.25em 1.25em;
  color: #fff;
  padding: 1.875em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dm-ins-wish-list__timer {
  display: flex;
}

.dm-ins-wish-list__timer__item {
  width: 3em;
}

.dm-ins-wish-list__timer__item + .dm-ins-wish-list__timer__item {
  margin-left: 1.875em;
}

.dm-ins-wish-list__timer__item__num {
  font-size: 2.5em;
  line-height: 1.2em;
  text-align: center;
  font-weight: 500;
}

.dm-ins-wish-list__timer__item__unit {
  line-height: 1.1875em;
  text-align: center;
  font-weight: 300;
}

.dm-ins-wish-list__timer__text {
  font-size: 1.25em;
  line-height: 1.2em;
  font-weight: 300;
  width: 10em;
}

.dm-ins-wish-list__timer__text b {
  font-weight: 600;
}

.dm-ins-wish-list__sm-hidden {
  display: none !important;
}

.hoteldetailpage .contentheader .shortcuts a.sharebtn {
  color: #0093d0;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
  display: flex;
  flex-direction: row-reverse;
}

.hoteldetailpage .contentheader .shortcuts a.sharebtn:hover {
  color: #0093d0 !important;
}

.hoteldetailpage .contentheader .shortcuts span.shareicon:after {
  display: none;
}

.hoteldetailpage .contentheader .shortcuts span.shareicon svg {
  width: 17px;
  height: 17px;
  margin-right: 10px;
}

.dm-ins-wish-list__add2--cabinet {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.19);
  margin: 0;
}

.dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__title {
  color: #fff;
  font-size: 14px;
  line-height: 21px;
  font-weight: normal;
}

.dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__svg {
  margin-right: 4px;
}

.dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__amount--2 {
  display: none;
}

.dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__added .dm-ins-wish-list__add2__svg,
.dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__btn--has-amount .dm-ins-wish-list__add2__svg {
  fill: #de0000;
}

.dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__added .dm-ins-wish-list__add2__svg path,
.dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__btn--has-amount .dm-ins-wish-list__add2__svg path {
  stroke: #fff;
}

.dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__btn {
  margin: 0;
}

.dm-ins-wish-list__add2--added .dm-ins-wish-list__add2__svg {
  fill: #de0000;
}

.dm-ins-wish-list__add2--added .dm-ins-wish-list__add2__svg path {
  stroke: #de0000;
}

.dm-ins-wish-list__add2--added .dm-ins-wish-list__add2__amount--3:before {
  content: attr(data-text-has);
}

.dm-ins-wish-list__add--added .dm-ins-wish-list__add-title {
  color: #000;
}

.dm-ins-wish-list__add--added .dm-ins-wish-list__add-svg {
  fill: #de0000;
}

.dm-ins-wish-list__add--added .dm-ins-wish-list__add-svg path {
  stroke: #de0000;
}

.dm-ins-wish-list__add--added .dm-ins-wish-list__add-title:before {
  content: attr(data-added);
}

.container-topside .dm-ins-wish-list__add2--cabinet {
  display: none;
}

.mobileoffsetmenucontainer .dm-ins-wish-list__add2--cabinet {
  display: block;
  padding-left: 0;
}

.mobileoffsetmenucontainer .dm-ins-wish-list__add2--cabinet.dm-ins-wish-list__add2--added .dm-ins-wish-list__add2__svg path {
  stroke: #fff;
}

.dm-ins-hidden {
  display: none !important;
}

html[style="overflow: visible;"] jdiv {
  z-index: auto !important;
}

.ins-preview-wrapper.ins-preview-wrapper-701,
.dm-favorite,
.dm-favorite.dm-favorite--cabinet {
  display: none !important;
}

.ins-dm-panel-new {
  position: fixed;
  z-index: 9999;
  right: 20px;
  bottom: 181px;
}
.ins-dm-panel {
  position: absolute;
  right: 5.5em;
  top: 0;
}

.ins-dm-panel__wishlist,
.ins-dm-panel__addons,
.ins-dm-panel__gochat,
.ins-dm-panel__resent,
.ins-dm-panel__jivo {
  font-size: 16px;
  width: 4em;
  height: 4em;
  cursor: pointer;
  position: relative;
}

.ins-dm-panel__wishlist[data-amount]:before,
.ins-dm-panel__resent[data-amount]:before,
.ins-dm-panel__jivo[data-amount]:before {
  position: absolute;
  background-color: #0192d1;
  content: attr(data-amount);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  line-height: 1.416666666666667em;
  right: 0.666666666666667em;
  top: 1.25em;
  border-radius: 1.416666666666667em;
  min-width: 1.416666666666667em;
  height: 1.416666666666667em;
  z-index: 1;
}

.ins-dm-panel__wishlist[data-amount="0"]:before,
.ins-dm-panel__resent[data-amount="0"]:before,
.ins-dm-panel__jivo[data-amount="0"]:before,
.ins-dm-panel__wishlist[data-amount=""]:before,
.ins-dm-panel__resent[data-amount=""]:before,
.ins-dm-panel__jivo[data-amount=""]:before {
  display: none;
}

.ins-dm-panel__wishlist:after,
.ins-dm-panel__resent:after,
.ins-dm-panel__jivo:after {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  content: '';
  opacity: 0;
  transition: all 0.4s;
}

.ins-dm-panel__wishlist:hover:after,
.ins-dm-panel__resent:hover:after,
.ins-dm-panel__jivo:hover:after {
  opacity: 1;
}

.ins-dm-panel__gochat:hover .ins-dm-panel__note,
.ins-dm-panel__wishlist:hover .ins-dm-panel__note,
.ins-dm-panel__resent:hover .ins-dm-panel__note,
.ins-dm-panel__jivo:hover .ins-dm-panel__note {
  opacity: 1;
  z-index: 1;
  transition: opacity 0.4s, transform 0.4s;
  transform: translate3d(0, -50%, 0);
}

.ins-dm-panel__wishlist:hover[data-amount="0"] .ins-dm-panel__note__span--has,
.ins-dm-panel__resent:hover[data-amount="0"] .ins-dm-panel__note__span--has,
.ins-dm-panel__jivo:hover[data-amount="0"] .ins-dm-panel__note__span--has,
.ins-dm-panel__wishlist:hover[data-amount=""] .ins-dm-panel__note__span--has,
.ins-dm-panel__resent:hover[data-amount=""] .ins-dm-panel__note__span--has,
.ins-dm-panel__jivo:hover[data-amount=""] .ins-dm-panel__note__span--has {
  display: none;
}

.ins-dm-panel__wishlist:hover[data-amount="0"] .ins-dm-panel__note__span--empty,
.ins-dm-panel__resent:hover[data-amount="0"] .ins-dm-panel__note__span--empty,
.ins-dm-panel__jivo:hover[data-amount="0"] .ins-dm-panel__note__span--empty,
.ins-dm-panel__wishlist:hover[data-amount=""] .ins-dm-panel__note__span--empty,
.ins-dm-panel__resent:hover[data-amount=""] .ins-dm-panel__note__span--empty,
.ins-dm-panel__jivo:hover[data-amount=""] .ins-dm-panel__note__span--empty {
  display: block;
}

.ins-dm-panel__addons {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NCA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIxLjUiIHk9IjYzIiB3aWR0aD0iNjEiIGhlaWdodD0iNjEiIHJ4PSIyMi41IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAgMS41IDYzKSIgZmlsbD0id2hpdGUiIHN0cm9rZT0idXJsKCNwYWludDBfbGluZWFyXzYwMl80NDApIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMjAuNjAyIDI0LjU0MzNMMjAuNjIyIDI0LjQyMlYyNC40MjA4QzIxLjI2MTkgMjAuOTU2NiAyNC4yODAzIDE4LjQzMDQgMjcuODE2MiAxOC40MzA0SDI4LjE3NzZDMzAuMzE5MiAxOC40MzA0IDMyLjM2ODQgMTkuMzIzIDMzLjgyNzMgMjAuODkwNUwzMy44Mjg4IDIwLjg5MjFMNDQuMjI4NCAzMi4wMzMzTDQ0LjIzMiAzMi4wMzcxQzQ0LjQwNTkgMzIuMjIyMSA0NC41MDE2IDMyLjQ2NjMgNDQuNTAxNiAzMi43MTUyQzQ0LjUwMTYgMzIuOTY0MSA0NC40MDU5IDMzLjIwODMgNDQuMjMyIDMzLjM5MzNMNDQuMjI4NCAzMy4zOTcxTDMzLjgyODggNDQuNTM4MkwzMy44MjczIDQ0LjUzOTlDMzIuMzY4NCA0Ni4xMDc0IDMwLjMxOTIgNDcgMjguMTc3NiA0N0gyNy44MTYyQzI0LjIzNzggNDcgMjEuMTg1OCA0NC40MTQ0IDIwLjYwMTggNDAuODk1TDIwLjYwMTggNDAuODk1TDIwLjYwMDQgNDAuODg2N0MyMC4yMTAxIDM4LjYxNDMgMjAuOTcxOCAzNi4xODc3IDIyLjY0MzMgMzQuNTMxNUwyMi42NDMzIDM0LjUzMTVMMjIuNjQ4MiAzNC41MjY2TDIzLjM4OTcgMzMuNzg1MUwyNC40OTI1IDMyLjY4MjNMMjMuMzQ3NiAzMS42MjMzTDIyLjYzNSAzMC45NjQyQzIwLjk2MTUgMjkuMjM2NCAyMC4yMTkyIDI2Ljg2MjggMjAuNjAyIDI0LjU0MzNaIiBzdHJva2U9InVybCgjcGFpbnQxX2xpbmVhcl82MDJfNDQwKSIgc3Ryb2tlLXdpZHRoPSIzIi8+PGNpcmNsZSBjeD0iOC41IiBjeT0iOC41IiByPSI4LjUiIHRyYW5zZm9ybT0ibWF0cml4KDAgLTEgLTEgMCAzMCAyNS41KSIgZmlsbD0iIzAxOTJEMSIvPjxwYXRoIGQ9Ik0yNiAxOS42NTA1SDI0LjJWMTcuODI2NUgyMC42MjRMMTkuOTY0IDE3LjgxNDVWMTcuODM4NUMyMC4xMjQgMTcuOTEwNSAyMC4yNzYgMTguMDIyNSAyMC40MiAxOC4xNzQ1TDIwLjg4OCAxOC42OTA1TDE5LjU5MiAxOS45MDI1TDE3LjQyIDE3LjU4NjVWMTUuNzc0NUgyNC4yVjEzLjkzODVIMjZWMTkuNjUwNVoiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMS41IiB5PSI2MyIgd2lkdGg9IjYxIiBoZWlnaHQ9IjYxIiByeD0iMjIuNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDEuNSA2MykiIGZpbGw9IndoaXRlIiBzdHJva2U9InVybCgjcGFpbnQyX2xpbmVhcl82MDJfNDQwKSIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZD0iTTI0LjYxMDIgMzIuNUMyNC42MTAyIDM2LjYxMTcgMjcuOTI2NiAzOS45NTU0IDMyIDM5Ljk1NTRDMzYuMDczNSAzOS45NTU0IDM5LjM4OTggMzYuNjA5NyAzOS4zODk4IDMyLjVDMzkuMzg5OCAyOC4zOTA0IDM2LjA3MzUgMjUuMDQ0NiAzMiAyNS4wNDQ2QzI3LjkyNjYgMjUuMDQ0NiAyNC42MTAyIDI4LjM5MDQgMjQuNjEwMiAzMi41VjMyLjVaTTMyIDI3LjMwOTVDMzQuODM2OCAyNy4zMDk1IDM3LjE0NDkgMjkuNjM4MSAzNy4xNDQ5IDMyLjVDMzcuMTQ0OSAzNS4zNjIgMzQuODM2OCAzNy42OTA2IDMyIDM3LjY5MDZDMjkuMTYzMyAzNy42OTA2IDI2Ljg1NTEgMzUuMzYyIDI2Ljg1NTEgMzIuNUMyNi44NTUxIDI5LjYzODEgMjkuMTYzMyAyNy4zMDk1IDMyIDI3LjMwOTVWMjcuMzA5NVoiIGZpbGw9InVybCgjcGFpbnQzX2xpbmVhcl82MDJfNDQwKSIvPjxwYXRoIGQ9Ik0zMC42OTM5IDE2LjgwODhDMjguNjEwMiAxNy44MjE4IDI2LjM2NTMgMTkuNzI0MyAyNC42ODU3IDIxLjkwMDZDMjIuMjczNSAyNS4wMTU3IDIxIDI4LjY4MDcgMjEgMzIuNUMyMSAzNi4zMTkzIDIyLjI3NTUgMzkuOTg0MiAyNC42ODU3IDQzLjA5OTRDMjYuMzYxMiA0NS4yNjk1IDI4LjYwNjEgNDcuMTcyIDMwLjY4OTggNDguMTkxMUMzMS41MjQ1IDQ4LjYwNSAzMi40ODE2IDQ4LjYwMjkgMzMuMzE2MyA0OC4xODdDMzUuMzcxNCA0Ny4xNTk2IDM3LjYwODIgNDUuMjYxMyAzOS4zMTIyIDQzLjEwMTRDNDEuNzI0NSAzOS45ODgzIDQyLjk5OCAzNi4zMjM0IDQyLjk5OCAzMi41QzQyLjk5OCAyOC42NzY1IDQxLjcyMjQgMjUuMDExNiAzOS4zMDIgMjEuODg2MkMzNy42MDQxIDE5LjczMDUgMzUuMzY1MyAxNy44MzQyIDMzLjMxNjMgMTYuODE1QzMyLjQ4MzcgMTYuMzk3IDMxLjUyNjUgMTYuMzk1IDMwLjY5MTggMTYuODA4OEgzMC42OTM5Wk0zMi4zMjI0IDE4Ljg0NTFDMzIuOTg1NyAxOS4xNzQ1IDM1LjMxODQgMjAuNDY5NiAzNy41NDQ5IDIzLjI5MjRDMzkuMDEwMiAyNS4xODQ2IDQwLjc1NTEgMjguMzE2MiA0MC43NTUxIDMyLjVDNDAuNzU1MSAzNi42ODM3IDM5LjAxMDIgMzkuODE1NCAzNy41NDY5IDQxLjcwMzRDMzUuMzI2NSA0NC41MjIxIDMyLjk4NTcgNDUuODI1NCAzMi4zMjI0IDQ2LjE1NjlDMzIuMTE0MyA0Ni4yNTk5IDMxLjg4NTcgNDYuMjU5OSAzMS42NzU1IDQ2LjE1NjlDMzEuMDA0MSA0NS44Mjk1IDI4LjY0MjkgNDQuNTQwNiAyNi40NTcxIDQxLjcwNzVDMjQuOTkxOCAzOS44MTU0IDIzLjI0NjkgMzYuNjgxNyAyMy4yNDY5IDMyLjVDMjMuMjQ2OSAyOC4zMTgzIDI0Ljk5MzkgMjUuMTg0NiAyNi40NTcxIDIzLjI5MjRDMjguNjQ5IDIwLjQ1NTIgMzEuMDA0MSAxOS4xNzI1IDMxLjY3OTYgMTguODQ1MUMzMS44ODc4IDE4Ljc0MjIgMzIuMTE0MyAxOC43NDIyIDMyLjMyNDUgMTguODQ1MUgzMi4zMjI0WiIgZmlsbD0idXJsKCNwYWludDRfbGluZWFyXzYwMl80NDApIi8+PGNpcmNsZSBjeD0iOC41IiBjeT0iOC41IiByPSI4LjUiIHRyYW5zZm9ybT0ibWF0cml4KDAgLTEgLTEgMCAzMiAyNS41KSIgZmlsbD0iIzAxOTJEMSIvPjxwYXRoIGQ9Ik0yNy4wMTYgMjAuMTMyMkwyNS4zOTYgMTkuMTI0MkMyNS45MDggMTguNTk2MiAyNi4xNjQgMTguMDA4MiAyNi4xNjQgMTcuMzYwMkMyNi4xNjQgMTYuOTg0MiAyNi4wODQgMTYuNjg4MiAyNS45MjQgMTYuNDcyMkMyNS43NTYgMTYuMjQ4MiAyNS41NTIgMTYuMTM2MiAyNS4zMTIgMTYuMTM2MkMyNC42OCAxNi4xMzYyIDI0LjM2NCAxNi42NjgyIDI0LjM2NCAxNy43MzIyVjE4LjMzMjJMMjMuMzQ0IDE4Ljc3NjJMMjEuOTg4IDE3LjY0ODJDMjEuODQ0IDE3LjUyODIgMjEuNzA0IDE3LjQwODIgMjEuNTY4IDE3LjI4ODJDMjEuNDMyIDE3LjE2MDIgMjEuMzM2IDE3LjA2NDIgMjEuMjggMTcuMDAwMkwyMS4xODQgMTYuOTA0MkgyMS4xNkMyMS4yIDE3LjA4ODIgMjEuMjIgMTcuMzYwMiAyMS4yMiAxNy43MjAyVjE5Ljc3MjJIMTkuNDJWMTQuMzYwMkgyMC43MjhMMjIuNzMyIDE2LjEwMDJDMjIuODY4IDE1LjQ2ODIgMjMuMTY0IDE0Ljk2NDIgMjMuNjIgMTQuNTg4MkMyNC4wNzYgMTQuMjEyMiAyNC42MDggMTQuMDI0MiAyNS4yMTYgMTQuMDI0MkMyNi4wMTYgMTQuMDI0MiAyNi43MDQgMTQuMzA0MiAyNy4yOCAxNC44NjQyQzI3Ljg1NiAxNS40MTYyIDI4LjE0NCAxNi4xOTYyIDI4LjE0NCAxNy4yMDQyQzI4LjE0NCAxOC40MTIyIDI3Ljc2OCAxOS4zODgyIDI3LjAxNiAyMC4xMzIyWiIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxLjUiIHk9IjIiIHdpZHRoPSI2MSIgaGVpZ2h0PSI2MSIgcng9IjIyLjUiIGZpbGw9IndoaXRlIiBzdHJva2U9InVybCgjcGFpbnQ1X2xpbmVhcl82MDJfNDQwKSIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZD0iTTMyLjAwMDIgMjguODg3NkMyOS45OTAzIDI4Ljg4NzYgMjguMzU1NyAzMC41MDg3IDI4LjM1NTcgMzIuNUMyOC4zNTU3IDM0LjQ5MTMgMjkuOTkxMyAzNi4xMTI0IDMyLjAwMDIgMzYuMTEyNEMzNC4wMDkyIDM2LjExMjQgMzUuNjQ0NyAzNC40OTEzIDM1LjY0NDcgMzIuNUMzNS42NDQ3IDMwLjUwODcgMzQuMDA5MiAyOC44ODc2IDMyLjAwMDIgMjguODg3NloiIGZpbGw9InVybCgjcGFpbnQ2X2xpbmVhcl82MDJfNDQwKSIvPjxwYXRoIGQ9Ik0yMC4xOTU4IDI4Ljg4NzZDMTguMTg1OCAyOC44ODc2IDE2LjU1MTMgMzAuNTA4NyAxNi41NTEzIDMyLjVDMTYuNTUxMyAzNC40OTEzIDE4LjE4NjggMzYuMTEyNCAyMC4xOTU4IDM2LjExMjRDMjIuMjA0NyAzNi4xMTI0IDIzLjg0MDMgMzQuNDkxMyAyMy44NDAzIDMyLjVDMjMuODQwMyAzMC41MDg3IDIyLjIwNDcgMjguODg3NiAyMC4xOTU4IDI4Ljg4NzZaIiBmaWxsPSJ1cmwoI3BhaW50N19saW5lYXJfNjAyXzQ0MCkiLz48cGF0aCBkPSJNNDMuODA0NCAyOC44ODc2QzQxLjc5NDUgMjguODg3NiA0MC4xNTk5IDMwLjUwODcgNDAuMTU5OSAzMi41QzQwLjE1OTkgMzQuNDkxMyA0MS43OTU1IDM2LjExMjQgNDMuODA0NCAzNi4xMTI0QzQ1LjgxMzQgMzYuMTEyNCA0Ny40NDg5IDM0LjQ5MTMgNDcuNDQ4OSAzMi41QzQ3LjQ0ODkgMzAuNTA4NyA0NS44MTM0IDI4Ljg4NzYgNDMuODA0NCAyOC44ODc2WiIgZmlsbD0idXJsKCNwYWludDhfbGluZWFyXzYwMl80NDApIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzYwMl80NDAiIHgxPSItMi42MzE5M2UtMDYiIHkxPSIxMzguNSIgeDI9IjgxLjM1NjkiIHkyPSI4OC40MzEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZDNzA5QSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQ0MwMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzYwMl80NDAiIHgxPSI1MC4yMjA2IiB5MT0iNDguNSIgeDI9IjIzLjk4OSIgeTI9IjEyLjA0MzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjRkM3MDlBIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfNjAyXzQ0MCIgeDE9Ii0yLjYzMTkzZS0wNiIgeTE9IjEzOC41IiB4Mj0iODEuMzU2OSIgeTI9Ijg4LjQzMTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjRkM3MDlBIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50M19saW5lYXJfNjAyXzQ0MCIgeDE9IjQxLjY5OTEiIHkxPSIzOS45NTU0IiB4Mj0iMjkuOTg3OCIgeTI9IjIxLjA5MzIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjRkM3MDlBIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50NF9saW5lYXJfNjAyXzQ0MCIgeDE9IjQ2LjQzNTEiIHkxPSI0OC41MDAyIiB4Mj0iMTguNTYzMSIgeTI9IjE3LjM2NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRkNDMDAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQ1X2xpbmVhcl82MDJfNDQwIiB4MT0iLTIuNjMxOTNlLTA2IiB5MT0iNzQuNSIgeDI9IjgxLjM1NjkiIHkyPSIyNC40MzEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZDNzA5QSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQ0MwMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDZfbGluZWFyXzYwMl80NDAiIHgxPSIyOC4zNTU3IiB5MT0iMzcuMjQxMyIgeDI9IjM3LjU3NjQiIHkyPSIzMS41MTY0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZDNzA5QSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQ0MwMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDdfbGluZWFyXzYwMl80NDAiIHgxPSIxNi41NTEzIiB5MT0iMzcuMjQxMyIgeDI9IjI1Ljc3MTkiIHkyPSIzMS41MTY0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZDNzA5QSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQ0MwMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDhfbGluZWFyXzYwMl80NDAiIHgxPSI0MC4xNTk5IiB5MT0iMzcuMjQxMyIgeDI9IjQ5LjM4MDYiIHkyPSIzMS41MTY0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZDNzA5QSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQ0MwMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPgo=") 0 0 no-repeat;
  background-size: contain;
}

.ins-dm-panel__gochat {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjYxIiBoZWlnaHQ9IjYxIiByeD0iMjIuNSIgZmlsbD0id2hpdGUiIHN0cm9rZT0idXJsKCNwYWludDBfbGluZWFyXzYwMl80NjIpIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMzQuNTAwNSA0MC45NjYzSDMzLjk5ODRMMzMuNTk3NSA0MS4yNjg2TDI2Ljk5OTYgNDYuMjQzM1Y0Mi40NjYzVjQwLjk2NjNIMjUuNDk5NkgxOS40OTk4QzE4LjEwNDkgNDAuOTY2MyAxNyAzOS44Njc5IDE3IDM4LjUwMTlWMjAuNDY0NEMxNyAxOS4xNDEgMTguMTE4OSAxOCAxOS40OTk4IDE4SDQzLjQ5ODlDNDQuOTE5OCAxOCA0NS45OTkyIDE5LjEyOCA0NiAyMC40NjUyVjM4LjUwMTlDNDYgMzkuODI1MiA0NC44ODExIDQwLjk2NjMgNDMuNTAwMiA0MC45NjYzSDM0LjUwMDVaIiBzdHJva2U9InVybCgjcGFpbnQxX2xpbmVhcl82MDJfNDYyKSIgc3Ryb2tlLXdpZHRoPSIzIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzYwMl80NjIiIHgxPSItMi42MzE5M2UtMDYiIHkxPSI3NCIgeDI9IjgxLjM1NjkiIHkyPSIyMy45MzEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZDNzA5QSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQ0MwMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzYwMl80NjIiIHgxPSIxNS41IiB5MT0iNDguNSIgeDI9IjQ3Ljg0NTIiIHkyPSIxNi44NTI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZCNzA5OSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0YwQUIxMyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPgo=") 0 0 no-repeat;
  background-size: contain;
}
.ins-dm-panel__wishlist {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMS41IiB5PSIxLjUiIHdpZHRoPSI2MSIgaGVpZ2h0PSI2MSIgcng9IjIyLjUiIGZpbGw9IndoaXRlIiBzdHJva2U9InVybCgjcGFpbnQwX2xpbmVhcl82MDNfMjE0NzcpIiBzdHJva2Utd2lkdGg9IjMiLz4KPHBhdGggZD0iTTM5Ljk5NzcgMTkuMTE3NUMzNy4zMjg4IDE4LjY3MTIgMzQuNjA3MiAxOS41NDU5IDMyLjY0MyAyMS40OTE1TDMxLjk5MTIgMjIuMjA1NUwzMS4yODY2IDIxLjQ5MTVDMjkuMzg0IDE5LjU0NTkgMjYuNjA5NSAxOC42NjIzIDIzLjk5MzUgMTkuMTE3NUMxOS45NTk1IDE5Ljc5NTggMTcgMjMuMzM5IDE3IDI3LjQ4OTFWMjcuODM3MkMxNyAzMC4zMDA1IDE4LjAxMjkgMzIuNjU2NyAxOS43OTIxIDM0LjMzNDZMMzAuMzc5MyA0NC4zNDg1QzMwLjgxOTcgNDQuNzY4IDMxLjQwMTEgNDUgMzIgNDVDMzIuNTk4OSA0NSAzMy4xODAzIDQ0Ljc2OCAzMy42MjA3IDQ0LjM0ODVMNDQuMjA3OSAzNC4zMzQ2QzQ1Ljk4NzEgMzIuNjU2NyA0NyAzMC4zMDA1IDQ3IDI3LjgzNzJWMjcuNDg5MUM0NyAyMy4zMzkgNDQuMDQwNSAxOS44MDQ3IDQwLjAwNjUgMTkuMTE3NUgzOS45OTc3WiIgc3Ryb2tlPSJ1cmwoI3BhaW50MV9saW5lYXJfNjAzXzIxNDc3KSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNjAzXzIxNDc3IiB4MT0iLTIuNjMxOTNlLTA2IiB5MT0iNzQiIHgyPSI4MS4zNTY5IiB5Mj0iMjMuOTMxMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkM3MDlBIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQ0MwMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfNjAzXzIxNDc3IiB4MT0iMTciIHkxPSI0NSIgeDI9IjQzLjA5NDUiIHkyPSIxNS41NDA2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==") 0 0 no-repeat;
  background-size: contain;
  margin-bottom: 0.75em;
}

.ins-dm-panel__wishlist[data-amount="0"]:hover,
.ins-dm-panel__wishlist[data-amount=""]:hover {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMjUiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjEuNSIgeT0iMS41IiB3aWR0aD0iNjEiIGhlaWdodD0iNjEiIHJ4PSIyMy41IiBzdHJva2U9IiM3Nzc3NzciIHN0cm9rZS1vcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMyIvPgo8cGF0aCBvcGFjaXR5PSIwLjQiIGQ9Ik0zOS45OTc3IDE5LjExNzVDMzcuMzI4OCAxOC42NzEyIDM0LjYwNzIgMTkuNTQ1OSAzMi42NDMgMjEuNDkxNUwzMS45OTEyIDIyLjIwNTVMMzEuMjg2NiAyMS40OTE1QzI5LjM4NCAxOS41NDU5IDI2LjYwOTUgMTguNjYyMyAyMy45OTM1IDE5LjExNzVDMTkuOTU5NSAxOS43OTU4IDE3IDIzLjMzOSAxNyAyNy40ODkxVjI3LjgzNzJDMTcgMzAuMzAwNSAxOC4wMTI5IDMyLjY1NjcgMTkuNzkyMSAzNC4zMzQ2TDMwLjM3OTMgNDQuMzQ4NUMzMC44MTk3IDQ0Ljc2OCAzMS40MDExIDQ1IDMyIDQ1QzMyLjU5ODkgNDUgMzMuMTgwMyA0NC43NjggMzMuNjIwNyA0NC4zNDg1TDQ0LjIwNzkgMzQuMzM0NkM0NS45ODcxIDMyLjY1NjcgNDcgMzAuMzAwNSA0NyAyNy44MzcyVjI3LjQ4OTFDNDcgMjMuMzM5IDQ0LjA0MDUgMTkuODA0NyA0MC4wMDY1IDE5LjExNzVIMzkuOTk3N1oiIHN0cm9rZT0iIzc3Nzc3NyIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjwvc3ZnPgo=") 0 0 no-repeat;
  background-size: contain;
}

.ins-dm-panel__wishlist:hover {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMS41IiB5PSIxLjUiIHdpZHRoPSI2MSIgaGVpZ2h0PSI2MSIgcng9IjIyLjUiIGZpbGw9IndoaXRlIiBzdHJva2U9InVybCgjcGFpbnQwX2xpbmVhcl82MDNfMjE0NzcpIiBzdHJva2Utd2lkdGg9IjMiLz4KPHBhdGggZD0iTTM5Ljk5NzcgMTkuMTE3NUMzNy4zMjg4IDE4LjY3MTIgMzQuNjA3MiAxOS41NDU5IDMyLjY0MyAyMS40OTE1TDMxLjk5MTIgMjIuMjA1NUwzMS4yODY2IDIxLjQ5MTVDMjkuMzg0IDE5LjU0NTkgMjYuNjA5NSAxOC42NjIzIDIzLjk5MzUgMTkuMTE3NUMxOS45NTk1IDE5Ljc5NTggMTcgMjMuMzM5IDE3IDI3LjQ4OTFWMjcuODM3MkMxNyAzMC4zMDA1IDE4LjAxMjkgMzIuNjU2NyAxOS43OTIxIDM0LjMzNDZMMzAuMzc5MyA0NC4zNDg1QzMwLjgxOTcgNDQuNzY4IDMxLjQwMTEgNDUgMzIgNDVDMzIuNTk4OSA0NSAzMy4xODAzIDQ0Ljc2OCAzMy42MjA3IDQ0LjM0ODVMNDQuMjA3OSAzNC4zMzQ2QzQ1Ljk4NzEgMzIuNjU2NyA0NyAzMC4zMDA1IDQ3IDI3LjgzNzJWMjcuNDg5MUM0NyAyMy4zMzkgNDQuMDQwNSAxOS44MDQ3IDQwLjAwNjUgMTkuMTE3NUgzOS45OTc3WiIgc3Ryb2tlPSJ1cmwoI3BhaW50MV9saW5lYXJfNjAzXzIxNDc3KSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNjAzXzIxNDc3IiB4MT0iLTIuNjMxOTNlLTA2IiB5MT0iNzQiIHgyPSI4MS4zNTY5IiB5Mj0iMjMuOTMxMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkM3MDlBIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQ0MwMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfNjAzXzIxNDc3IiB4MT0iMTciIHkxPSI0NSIgeDI9IjQzLjA5NDUiIHkyPSIxNS41NDA2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==") 0 0 no-repeat;
  background-size: contain;
}

.ins-dm-panel__resent {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMS41IiB5PSIxLjUiIHdpZHRoPSI2MSIgaGVpZ2h0PSI2MSIgcng9IjIyLjUiIGZpbGw9IndoaXRlIiBzdHJva2U9InVybCgjcGFpbnQwX2xpbmVhcl82MDNfMjE0NjkpIiBzdHJva2Utd2lkdGg9IjMiLz4KPHBhdGggZD0iTTMxLjY5ODMgMjJDMjIuNTg5IDIyIDE3LjYwMjUgMjguNjU4NSAxNiAzMS45OTY3QzE3Ljc3MSAzNS4yNTY3IDIzLjMyMyA0MS43MDA0IDMxLjU5NTMgNDJMMzIuNTMyIDQxLjk5NDlDNDAuNzM0IDQxLjYzNDMgNDYuMjM4MSAzNS4yNCA0OCAzMS45OTY3QzQ2LjM5NzUgMjguNjU4NSA0MS40MTEgMjIgMzIuMzAxNyAyMkgzMS42OTgzWiIgc3Ryb2tlPSJ1cmwoI3BhaW50MV9saW5lYXJfNjAzXzIxNDY5KSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxwYXRoIGQ9Ik0zNy40ODM0IDMxLjg3NzRDMzcuNDgzNCAzNC44NzM4IDM1LjAyODMgMzcuMzAyOSAzMS45OTk4IDM3LjMwMjlDMjguOTcxMyAzNy4zMDI5IDI2LjUxNjIgMzQuODczOCAyNi41MTYyIDMxLjg3NzRDMjYuNTE2MiAyOC44ODA5IDI4Ljk3MTMgMjYuNDUxOCAzMS45OTk4IDI2LjQ1MThDMzUuMDI4MyAyNi40NTE4IDM3LjQ4MzQgMjguODgwOSAzNy40ODM0IDMxLjg3NzRaIiBzdHJva2U9InVybCgjcGFpbnQyX2xpbmVhcl82MDNfMjE0NjkpIiBzdHJva2Utd2lkdGg9IjMiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl82MDNfMjE0NjkiIHgxPSItMi42MzE5M2UtMDYiIHkxPSI3NCIgeDI9IjgxLjM1NjkiIHkyPSIyMy45MzEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl82MDNfMjE0NjkiIHgxPSIxNiIgeTE9IjQyIiB4Mj0iMzQuMzQ2OCIgeTI9IjEzLjI3ODYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZCNzA5OSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGMEFCMTMiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzYwM18yMTQ2OSIgeDE9IjE2IiB5MT0iNDIiIHgyPSIzNC4zNDY4IiB5Mj0iMTMuMjc4NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkI3MDk5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0YwQUIxMyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=") 0 0 no-repeat;
  background-size: contain;
  margin-bottom: 0em;
}

.ins-dm-panel__resent[data-amount="0"]:hover,
.ins-dm-panel__resent[data-amount=""]:hover {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMjUiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjEuNSIgeT0iMS41IiB3aWR0aD0iNjEiIGhlaWdodD0iNjEiIHJ4PSIyMy41IiBzdHJva2U9IiM3Nzc3NzciIHN0cm9rZS1vcGFjaXR5PSIwLjQiIHN0cm9rZS13aWR0aD0iMyIvPgo8ZyBvcGFjaXR5PSIwLjQiPgo8cGF0aCBkPSJNMzEuNjk4MyAyMkMyMi41ODkgMjIgMTcuNjAyNSAyOC42NTg1IDE2IDMxLjk5NjdDMTcuNzcxIDM1LjI1NjcgMjMuMzIzIDQxLjcwMDQgMzEuNTk1MyA0MkwzMi41MzIgNDEuOTk0OUM0MC43MzQgNDEuNjM0MyA0Ni4yMzgxIDM1LjI0IDQ4IDMxLjk5NjdDNDYuMzk3NSAyOC42NTg1IDQxLjQxMSAyMiAzMi4zMDE3IDIySDMxLjY5ODNaIiBzdHJva2U9IiM3Nzc3NzciIHN0cm9rZS13aWR0aD0iMyIvPgo8cGF0aCBkPSJNMzcuNDgzNCAzMS44Nzc0QzM3LjQ4MzQgMzQuODczOCAzNS4wMjgzIDM3LjMwMjkgMzEuOTk5OCAzNy4zMDI5QzI4Ljk3MTMgMzcuMzAyOSAyNi41MTYyIDM0Ljg3MzggMjYuNTE2MiAzMS44Nzc0QzI2LjUxNjIgMjguODgwOSAyOC45NzEzIDI2LjQ1MTggMzEuOTk5OCAyNi40NTE4QzM1LjAyODMgMjYuNDUxOCAzNy40ODM0IDI4Ljg4MDkgMzcuNDgzNCAzMS44Nzc0WiIgc3Ryb2tlPSIjNzc3Nzc3IiBzdHJva2Utd2lkdGg9IjMiLz4KPC9nPgo8L3N2Zz4K") 0 0 no-repeat;
  background-size: contain;
}

.ins-dm-panel__resent:hover {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMS41IiB5PSIxLjUiIHdpZHRoPSI2MSIgaGVpZ2h0PSI2MSIgcng9IjIyLjUiIGZpbGw9IndoaXRlIiBzdHJva2U9InVybCgjcGFpbnQwX2xpbmVhcl82MDNfMjE0NjkpIiBzdHJva2Utd2lkdGg9IjMiLz4KPHBhdGggZD0iTTMxLjY5ODMgMjJDMjIuNTg5IDIyIDE3LjYwMjUgMjguNjU4NSAxNiAzMS45OTY3QzE3Ljc3MSAzNS4yNTY3IDIzLjMyMyA0MS43MDA0IDMxLjU5NTMgNDJMMzIuNTMyIDQxLjk5NDlDNDAuNzM0IDQxLjYzNDMgNDYuMjM4MSAzNS4yNCA0OCAzMS45OTY3QzQ2LjM5NzUgMjguNjU4NSA0MS40MTEgMjIgMzIuMzAxNyAyMkgzMS42OTgzWiIgc3Ryb2tlPSJ1cmwoI3BhaW50MV9saW5lYXJfNjAzXzIxNDY5KSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxwYXRoIGQ9Ik0zNy40ODM0IDMxLjg3NzRDMzcuNDgzNCAzNC44NzM4IDM1LjAyODMgMzcuMzAyOSAzMS45OTk4IDM3LjMwMjlDMjguOTcxMyAzNy4zMDI5IDI2LjUxNjIgMzQuODczOCAyNi41MTYyIDMxLjg3NzRDMjYuNTE2MiAyOC44ODA5IDI4Ljk3MTMgMjYuNDUxOCAzMS45OTk4IDI2LjQ1MThDMzUuMDI4MyAyNi40NTE4IDM3LjQ4MzQgMjguODgwOSAzNy40ODM0IDMxLjg3NzRaIiBzdHJva2U9InVybCgjcGFpbnQyX2xpbmVhcl82MDNfMjE0NjkpIiBzdHJva2Utd2lkdGg9IjMiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl82MDNfMjE0NjkiIHgxPSItMi42MzE5M2UtMDYiIHkxPSI3NCIgeDI9IjgxLjM1NjkiIHkyPSIyMy45MzEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl82MDNfMjE0NjkiIHgxPSIxNiIgeTE9IjQyIiB4Mj0iMzQuMzQ2OCIgeTI9IjEzLjI3ODYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZCNzA5OSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGMEFCMTMiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzYwM18yMTQ2OSIgeDE9IjE2IiB5MT0iNDIiIHgyPSIzNC4zNDY4IiB5Mj0iMTMuMjc4NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkI3MDk5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0YwQUIxMyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=") 0 0 no-repeat;
  background-size: contain;
}

.ins-dm-panel__note {
  position: absolute;
  background-size: contain;
  right: 100%;
  box-sizing: border-box;
  color: #000;
  font-weight: 400;
  top: 50%;
  z-index: -1;
  opacity: 0;
  pointer-events: none;
  transform: translate3d(0, 0%, 0);
  filter: drop-shadow(4px 4px 14px rgba(0,0,0,0.15));
  background-color: #fff;
  font-size: 1em;
  line-height: 1.1875em;
  margin-right: 8px;
  padding: 1em 1.5em;
  border-radius: 1.25em;
}

.ins-dm-panel__note:after {
  position: absolute;
  content: '';
  border-style: solid;
  width: 0;
  height: 0;
  border-width: 8px 0 8px 8px;
  border-color: transparent transparent transparent #fff;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
}

.ins-dm-panel__note__span--empty {
  display: none;
}

.ins-dm-panel__jivo {
  margin-top: 20px;
  background: linear-gradient(58.39deg, var(--myColor1) -5.95%, var(--myColor2) 102.54%) !important;
  transition: --myColor1 0.4s, --myColor2 0.4s;
  transform: rotate(-90deg) translate(0, 0px) !important;
  border-radius: 24px !important;
}

.ins-dm-panel__jivo:hover {
  --myColor1: #ff94b4;
  --myColor2: #fc709a;
}

.ins-dm-panel__jivo:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  animation-name: rotation-bg;
  animation-duration: 12s;
  animation-iteration-count: infinite;
  background-size: 64px 64px;
  transform: rotate(90deg);
  opacity: 1;
}

body {
  --myColor1: #fc709a;
  --myColor2: #fc0;
}

body .__jivoCallbackBtn {
  /*display: none !important;*/
}
body jdiv.__jivoCallbackBtn[class*=wrap_] {
    margin-bottom: 30px;
    width: 64px;
    height: 64px;
    border-radius: 24px!important;
    background: linear-gradient(58.39deg, var(--myColor1) -5.95%, var(--myColor2) 102.54%);
    cursor: pointer;
}
body jdiv.__jivoCallbackBtn[class*=wrap_] > * {
    display: none!important;
}
body jdiv.__jivoCallbackBtn[class*=wrap_]:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bWFzayBpZD0ibWFzazBfMzkyXzM1OCIgc3R5bGU9Im1hc2stdHlwZTphbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNEOUQ5RDkiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMF8zOTJfMzU4KSI+PHBhdGggZD0iTTQ1LjU4NjMgMzguNzkwOEw0NC4zMTQ3IDQ0LjMwM0M0NC4xMzYxIDQ1LjA4MjIgNDMuNDUxMSA0NS42Mjc0IDQyLjY0ODggNDUuNjI3NEMyOC44NTA0IDQ1LjYyNjMgMTcuNjI3NCAzNC40MDUgMTcuNjI3NCAyMC42MDgxQzE3LjYyNzQgMTkuODA2NCAxOC4xNzI3IDE5LjEyMDcgMTguOTUyMSAxOC45NDI5TDI0LjQ2NTEgMTcuNjcxNUMyNS4yNjggMTcuNDg1NSAyNi4wODg0IDE3LjkwMjIgMjYuNDIyIDE4LjY2MjRMMjguOTY2MyAyNC41OTU3QzI5LjI2MzcgMjUuMjk0NiAyOS4wNjMxIDI2LjEwODggMjguNDc1MiAyNi41ODlMMjUuNTMwNSAyOC45NTNDMjcuMzg5IDMyLjczODMgMzAuNDY3MSAzNS44MTU5IDM0LjI1NCAzNy42NzUyTDM2LjY2NDkgMzQuNzMzMUMzNy4xNCAzNC4xNDM2IDM3Ljk2MDUgMzMuOTM5NyAzOC42NTk1IDM0LjI0MjRMNDQuNTkzNyAzNi43ODU3QzQ1LjMwNzQgMzcuMTYxMiA0NS43NzIzIDM3Ljk5MjQgNDUuNTg2MyAzOC43OTA4WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZD0iTTQ1LjU4NjMgMzguNzkwOEw0NC4zMTQ3IDQ0LjMwM0M0NC4xMzYxIDQ1LjA4MjIgNDMuNDUxMSA0NS42Mjc0IDQyLjY0ODggNDUuNjI3NEMyOC44NTA0IDQ1LjYyNjMgMTcuNjI3NCAzNC40MDUgMTcuNjI3NCAyMC42MDgxQzE3LjYyNzQgMTkuODA2NCAxOC4xNzI3IDE5LjEyMDcgMTguOTUyMSAxOC45NDI5TDI0LjQ2NTEgMTcuNjcxNUMyNS4yNjggMTcuNDg1NSAyNi4wODg0IDE3LjkwMjIgMjYuNDIyIDE4LjY2MjRMMjguOTY2MyAyNC41OTU3QzI5LjI2MzcgMjUuMjk0NiAyOS4wNjMxIDI2LjEwODggMjguNDc1MiAyNi41ODlMMjUuNTMwNSAyOC45NTNDMjcuMzg5IDMyLjczODMgMzAuNDY3MSAzNS44MTU5IDM0LjI1NCAzNy42NzUyTDM2LjY2NDkgMzQuNzMzMUMzNy4xNCAzNC4xNDM2IDM3Ljk2MDUgMzMuOTM5NyAzOC42NTk1IDM0LjI0MjRMNDQuNTkzNyAzNi43ODU3QzQ1LjMwNzQgMzcuMTYxMiA0NS43NzIzIDM3Ljk5MjQgNDUuNTg2MyAzOC43OTA4WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+PC9nPjwvc3ZnPgo=) center / contain no-repeat;
}
body jdiv.__jivoCallbackBtn[class*=wrap_] .button_bac1:before {
    content: none;
}

body #jvlabelWrap {
  width: 64px;
  height: 64px;
  right: 20px !important;
  bottom: 30px !important;
  top: auto !important;
  transform: rotate(-90deg) translate(0, 0px) !important;
  border-radius: 24px !important;
  box-shadow: none;
  background: linear-gradient(58.39deg, var(--myColor1) -5.95%, var(--myColor2) 102.54%) !important;
  cursor: pointer;
  transition: --myColor1 0.4s, --myColor2 0.4s;
}

body #jvlabelWrap:hover {
  --myColor1: #fc709a;
  --myColor2: #fc0;
}

body #jvlabelWrap >*:not([class*=hoverl_]) {
  display: none;
}

body #jvlabelWrap jdiv[class*=menu_] > a,
body #jvlabelWrap jdiv[class*=menu_] > jdiv[class*=item_]:not(:last-child),
body [class*='menuWrap_'] jdiv[class*=menu_] > a,
body [class*='menuWrap_'] jdiv[class*=menu_] > jdiv[class*=item_]:not(:last-child) {
  border-bottom: 1px dashed transparent !important;
  position: relative;
  margin-bottom: 1px;
}

body #jvlabelWrap jdiv[class*=menu_] > a:before,
body #jvlabelWrap jdiv[class*=menu_] > jdiv[class*=item_]:not(:last-child):before,
body [class*='menuWrap_'] jdiv[class*=menu_] > a:before,
body [class*='menuWrap_'] jdiv[class*=menu_] > jdiv[class*=item_]:not(:last-child):before {
  position: absolute;
  content: '';
  display: block;
  border-bottom: 1px dashed #000;
  bottom: -1px;
  left: 18px;
  right: 18px;
}

body #jvlabelWrap jdiv[class*=menu_] > a jdiv[class*=title_],
body #jvlabelWrap jdiv[class*=menu_] > jdiv[class*=item_]:not(:last-child) jdiv[class*=title_],
body [class*='menuWrap_'] jdiv[class*=menu_] > a jdiv[class*=title_],
body [class*='menuWrap_'] jdiv[class*=menu_] > jdiv[class*=item_]:not(:last-child) jdiv[class*=title_] {
  color: #000 !important;
}

body #jvlabelWrap jdiv[class*=menu_] > a > jdiv,
body #jvlabelWrap jdiv[class*=menu_] > jdiv[class*=item_]:not(:last-child) > jdiv,
body [class*='menuWrap_'] jdiv[class*=menu_] > a > jdiv,
body [class*='menuWrap_'] jdiv[class*=menu_] > jdiv[class*=item_]:not(:last-child) > jdiv {
  padding-left: 18px !important;
  padding-right: 18px !important;
}

body #jvlabelWrap jdiv[class*=menu_] > a[href*="t.me"] jdiv[class*=telegramIcon_],
body [class*='menuWrap_'] jdiv[class*=menu_] > a[href*="t.me"] jdiv[class*=telegramIcon_] {
  width: 21px;
  height: 17px;
  margin-right: 19px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAyMSAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjk5NCAxLjQ3MjE5QzIwLjY5OTQgNC40NTkyNCAxOS40NDA0IDExLjcwMzcgMTguNzk5NiAxNS4wNTQ4QzE4LjUyOSAxNi40Njk5IDE3Ljk5NTEgMTYuOTQ1MiAxNy40NzQzIDE2Ljk5MTZDMTYuMzUxNyAxNy4wOTIyIDE1LjQ5OTcgMTYuMjY2NiAxNC40MTIyIDE1LjU2OTdDMTIuNzEwNCAxNC40ODA2IDExLjc0OTIgMTMuODAyIDEwLjA5NzMgMTIuNzM4OEM4LjE4ODk2IDExLjUwOTUgOS40MjYxMiAxMC44MzQ3IDEwLjUxMzYgOS43MzAzNkMxMC43OTgyIDkuNDQwOTYgMTUuNzQ1MiA1LjA0NTY5IDE1Ljg0MTEgNC42NDY2MkMxNS44NTI4IDQuNTk3MTIgMTUuODY0NSA0LjQxMDUxIDE1Ljc1MDcgNC4zMTNDMTUuNjM2OSA0LjIxNTU0IDE1LjQ3MDggNC4yNDgyNyAxNS4zNTA4IDQuMjc0OTRDMTUuMTc5OCA0LjMxMjUyIDEyLjQ2MTUgNi4wNjc3NyA3LjE5NTgzIDkuNTQwNzNDNi40MjQwNiAxMC4wNTgxIDUuNzI1MjkgMTAuMzEwMiA1LjA5OTU1IDEwLjI5N0M0LjQwODg2IDEwLjI4MjUgMy4wODEyOCA5LjkxNjIgMi4wOTQzNyA5LjYwMjQ0QzAuODgzNjg2IDkuMjE3ODMgLTAuMDc5MDU4IDkuMDE0NDUgMC4wMDUxMzA2NyA4LjM2MTc0QzAuMDQ4NzgyMiA4LjAyMTU5IDAuNTI4MTk0IDcuNjczNzUgMS40NDM0MiA3LjMxODM3QzcuMDc4NjMgNC45MTkyNSAxMC44MzY2IDMuMzM3NjMgMTIuNzE3NCAyLjU3MzQ3QzE4LjA4NzEgMC4zOTE0NzYgMTkuMjAyNiAwLjAxMjkyNzQgMTkuOTMgMEMyMC4wODk4IDAgMjAuNDQ2OCAwLjAzNTgwMjcgMjAuNjc5MSAwLjIxOTMzNEMyMC44MzI4IDAuMzUwNTc4IDIwLjkzMDkgMC41MzMwNTIgMjAuOTU0MyAwLjczMTE0NUMyMC45OTU3IDAuOTc1OTQ5IDIxLjAwOSAxLjIyNDUgMjAuOTk0IDEuNDcyMTlaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTI4XzgyMCkiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xMjhfODIwIiB4MT0iLTguNjM2MDNlLTA3IiB5MT0iMTkuNjU2MiIgeDI9IjIzLjMyNTIiIHkyPSIxLjkyMzc5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==") !important;
}

body #jvlabelWrap jdiv[class*=menu_] > a[href*="vk"] jdiv[class*=vkIcon_],
body [class*='menuWrap_'] jdiv[class*=menu_] > a[href*="vk"] jdiv[class*=vkIcon_] {
  width: 23px;
  height: 14px;
  margin-right: 17px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMyAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMC4zNzI1NTlMMy45MzY0NCAwLjM3MjU1OUM0LjA2NTczIDYuNzg5MDggNi45Njc4NSA5LjUwNjUxIDkuMjY2NjMgMTAuMDY3MVYwLjM3MjU1OUwxMi45NzMgMC4zNzI1NTlWNS45MDg3N0MxNS4yNDI1IDUuNjcwMTEgMTcuNjI3NSAzLjE0ODU0IDE4LjQzMTcgMC4zNzQ3OTFMMjIuMTM4MSAwLjM3NDc5MUMyMS44MzUzIDEuODEzODcgMjEuMjMxMiAzLjE3NjUyIDIwLjM2MzYgNC4zNzc0N0MxOS40OTU5IDUuNTc4MzkgMTguMzgzNCA2LjU5MTc4IDE3LjA5NTcgNy4zNTQxN0MxOC41MzMgOC4wNTAxNiAxOS44MDI1IDkuMDM1NjIgMjAuODIwMyAxMC4yNDU1QzIxLjgzODEgMTEuNDU1MyAyMi41ODEgMTIuODYyIDIzIDE0LjM3MjZIMTguOTIxMUMxOC41NDUgMTMuMDYwNSAxNy43Nzk5IDExLjg4NiAxNi43MjE5IDEwLjk5NjNDMTUuNjYzOCAxMC4xMDY2IDE0LjM1OTkgOS41NDEzNSAxMi45NzM4IDkuMzcxNDRWMTQuMzcyNkgxMi41MjgyQzQuNjY4MzUgMTQuMzY3MyAwLjE4NjI0IDkuMTE0MDIgMCAwLjM3MjU1OVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xMjhfODI0KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzEyOF84MjQiIHgxPSItOS40NTg1MWUtMDciIHkxPSIxNi41NjAxIiB4Mj0iMTkuOTM0MSIgeTI9Ii0zLjU5NDM0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==") !important;
}

body #jvlabelWrap jdiv[class*=menu_] > a[href*="vk"] jdiv[class*=subTitle_],
body [class*='menuWrap_'] jdiv[class*=menu_] > a[href*="vk"] jdiv[class*=subTitle_] {
  display: none;
}

body #jvlabelWrap jdiv[class*=menu_] > a[href*="wa.me"] jdiv[class*=icon_],
body [class*='menuWrap_'] jdiv[class*=menu_] > a[href*="wa.me"] jdiv[class*=icon_] {
  width: 23px;
  height: 23px;
  margin-right: 17px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyMyAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjU1NTEgMy43MTQ3NUMxNy40MDQgMS41NTg1IDE0LjUzOTMgMC4zNzI1NTkgMTEuNDk0OSAwLjM3MjU1OUM1LjIxMDk0IDAuMzcyNTU5IDAuMDk3NTQ0NiA1LjQ4NTk1IDAuMDk3NTQ0NiAxMS43Njk5QzAuMDk3NTQ0NiAxMy43NzcyIDAuNjIxMjA1IDE1LjczODQgMS42MTcxOSAxNy40Njg1TDAgMjMuMzcyNkw2LjA0MjYzIDIxLjc4NjJDNy43MDYwMyAyMi42OTQ5IDkuNTc5OTEgMjMuMTcyMyAxMS40ODk3IDIzLjE3MjNIMTEuNDk0OUMxNy43NzM3IDIzLjE3MjMgMjMgMTguMDU4OSAyMyAxMS43NzVDMjMgOC43MzA1OSAyMS43MDYzIDUuODcxIDE5LjU1NTEgMy43MTQ3NVpNMTEuNDk0OSAyMS4yNTIyQzkuNzkwNCAyMS4yNTIyIDguMTIxODcgMjAuNzk1MyA2LjY2ODk3IDE5LjkzMjhMNi4zMjUgMTkuNzI3NUwyLjc0MTUyIDIwLjY2N0wzLjY5NjQzIDE3LjE3MDhMMy40NzA1NCAxNi44MTE0QzIuNTIwNzYgMTUuMzAyIDIuMDIyNzcgMTMuNTYxNiAyLjAyMjc3IDExLjc2OTlDMi4wMjI3NyA2LjU0ODY4IDYuMjczNjYgMi4yOTc3OCAxMS41IDIuMjk3NzhDMTQuMDMxIDIuMjk3NzggMTYuNDA4IDMuMjgzNSAxOC4xOTQ2IDUuMDc1MjRDMTkuOTgxMyA2Ljg2Njk4IDIxLjA3OTkgOS4yNDM5OSAyMS4wNzQ4IDExLjc3NUMyMS4wNzQ4IDE3LjAwMTQgMTYuNzE2MSAyMS4yNTIyIDExLjQ5NDkgMjEuMjUyMlpNMTYuNjkwNCAxNC4xNTcyQzE2LjQwOCAxNC4wMTM0IDE1LjAwNjUgMTMuMzI1NSAxNC43NDQ2IDEzLjIzMzFDMTQuNDgyOCAxMy4xMzU1IDE0LjI5MjkgMTMuMDg5MyAxNC4xMDI5IDEzLjM3NjhDMTMuOTEyOSAxMy42NjQzIDEzLjM2ODggMTQuMzAwOSAxMy4xOTkzIDE0LjQ5NkMxMy4wMzUgMTQuNjg2IDEyLjg2NTYgMTQuNzExNiAxMi41ODMzIDE0LjU2NzlDMTAuOTA5NiAxMy43MzEgOS44MTA5NCAxMy4wNzM5IDguNzA3MTQgMTEuMTc5NUM4LjQxNDUxIDEwLjY3NjQgOC45OTk3OCAxMC43MTIzIDkuNTQzOTcgOS42MjM5QzkuNjM2MzggOS40MzM5NCA5LjU5MDE4IDkuMjY5NjYgOS41MTgzIDkuMTI1OTFDOS40NDY0MyA4Ljk4MjE2IDguODc2NTYgNy41ODA1OSA4LjY0MDQgNy4wMTA3M0M4LjQwOTM4IDYuNDU2MjYgOC4xNzMyMSA2LjUzMzI3IDcuOTk4NjYgNi41MjMwMUM3LjgzNDM4IDYuNTEyNzQgNy42NDQ0MiA2LjUxMjc0IDcuNDU0NDYgNi41MTI3NEM3LjI2NDUxIDYuNTEyNzQgNi45NTY0NyA2LjU4NDYxIDYuNjk0NjQgNi44NjY5OEM2LjQzMjgxIDcuMTU0NDggNS42OTg2NiA3Ljg0MjQyIDUuNjk4NjYgOS4yNDM5OUM1LjY5ODY2IDEwLjY0NTUgNi43MjAzMSAxMi4wMDA5IDYuODU4OTMgMTIuMTkwOUM3LjAwMjY4IDEyLjM4MDggOC44NjYyOSAxNS4yNTU4IDExLjcyNTkgMTYuNDkzMUMxMy41MzMgMTcuMjczNSAxNC4yNDE1IDE3LjM0MDIgMTUuMTQ1MSAxNy4yMDY3QzE1LjY5NDQgMTcuMTI0NiAxNi44MjkgMTYuNTE4OCAxNy4wNjUyIDE1Ljg1MTRDMTcuMzAxMyAxNS4xODM5IDE3LjMwMTMgMTQuNjE0MSAxNy4yMjk1IDE0LjQ5NkMxNy4xNjI3IDE0LjM2NzYgMTYuOTcyOCAxNC4yOTU4IDE2LjY5MDQgMTQuMTU3MloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xMjhfODI4KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzEyOF84MjgiIHgxPSItOS40NTg1MWUtMDciIHkxPSIyNi45NjYzIiB4Mj0iMjkuMjM3NiIgeTI9IjguOTcyODIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZDNzA5QSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRkNDMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K") !important;
}

body #jvlabelWrap jdiv[class*=menu_] > a[href*="sms://open?service=iMessage"] jdiv[class*=icon_],
body [class*='menuWrap_'] jdiv[class*=menu_] > a[href*="sms://open?service=iMessage"] jdiv[class*=icon_] {
  width: 23px;
  height: 23px;
  margin-right: 17px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
}

body #jvlabelWrap jdiv[class*=menu_] > jdiv[class*=item_]:nth-last-child(2) jdiv[class*=icon_],
body [class*='menuWrap_'] jdiv[class*=menu_] > jdiv[class*=item_]:nth-last-child(2) jdiv[class*=icon_] {
  width: 21px;
  height: 21px;
  margin-right: 19px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxLjk2OTIgMTcuMjQ1TDIxLjAxNTUgMjEuMzc5MkMyMC44ODE1IDIxLjk2MzcgMjAuMzY3OCAyMi4zNzI2IDE5Ljc2NiAyMi4zNzI2QzkuNDE3MiAyMi4zNzE3IDEgMTMuOTU1OCAxIDMuNjA4MDRDMSAzLjAwNjc4IDEuNDA4OTIgMi40OTI0NyAxLjk5MzQ5IDIuMzU5MThMNi4xMjgyNiAxLjQwNTYxQzYuNzMwNDMgMS4yNjYwOCA3LjM0NTcyIDEuNTc4NjEgNy41OTU5NCAyLjE0ODc4TDkuNTA0MTYgNi41OTg3NUM5LjcyNzIzIDcuMTIyOSA5LjU3Njc3IDcuNzMzNTkgOS4xMzU4MSA4LjA5MzY5TDYuOTI3MzIgOS44NjY3MUM4LjMyMTE2IDEyLjcwNTcgMTAuNjI5NyAxNS4wMTM5IDEzLjQ2OTkgMTYuNDA4NEwxNS4yNzgxIDE0LjIwMThDMTUuNjM0NCAxMy43NTk3IDE2LjI0OTggMTMuNjA2NyAxNi43NzQxIDEzLjgzMzdMMjEuMjI0NyAxNS43NDEzQzIxLjc2IDE2LjAyMjggMjIuMTA4NiAxNi42NDYyIDIxLjk2OTIgMTcuMjQ1WiIgc3Ryb2tlPSJ1cmwoI3BhaW50MF9saW5lYXJfMTI4XzgzMikiIHN0cm9rZS13aWR0aD0iMiIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzEyOF84MzIiIHgxPSIwLjk5OTk5OSIgeTE9IjI1LjY1MzgiIHgyPSIyNy42OTUyIiB5Mj0iOS4yMjQ5NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkM3MDlBIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQ0MwMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=") !important;
}

body #jvlabelWrap jdiv[class*=menu_] > jdiv[class*=item_]:nth-last-child(1) jdiv[class*=icon_],
body [class*='menuWrap_'] jdiv[class*=menu_] > jdiv[class*=item_]:nth-last-child(1) jdiv[class*=icon_] {
  width: 23px;
  height: 24px;
  margin-right: 17px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyMyAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjY1NjYgMTguODQ3M0gxMy4zMTA0TDEzLjAzODMgMTkuMDYxM0w4LjE4NzIyIDIyLjg3OFYxOS44NDczVjE4Ljg0NzNINy4xODcyMkgyLjg3NDg5QzEuODcwMTUgMTguODQ3MyAxIDE4LjAwOTUgMSAxNi44NzRMMSAzLjM0NTgzQzEgMi4yNDMzMyAxLjg3OTI3IDEuMzcyNTYgMi44NzQ4OSAxLjM3MjU2TDIwLjEyNDIgMS4zNzI1NkMyMS4xNDk0IDEuMzcyNTYgMjEuOTk5NCAyLjIzNDUgMjIgMy4zNDYzOVYxNi44NzRDMjIgMTcuOTc2NSAyMS4xMjA3IDE4Ljg0NzMgMjAuMTI1MSAxOC44NDczSDEzLjY1NjZaIiBzdHJva2U9InVybCgjcGFpbnQwX2xpbmVhcl8xMjhfODM2KSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTI4XzgzNiIgeDE9Ii05LjQ1ODUxZS0wNyIgeTE9IjI4LjEyMjYiIHgyPSIyOS45MDgiIHkyPSIxMC40ODM0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==") !important;
}

body #jvlabelWrap jdiv[class*=menu_] > jdiv[class*=item_] > jdiv,
body [class*='menuWrap_'] jdiv[class*=menu_] > jdiv[class*=item_] > jdiv {
  padding-left: 18px !important;
  padding-right: 18px !important;
}

body #jvlabelWrap:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  animation-name: rotation-bg1;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swXzM5Ml8zNTgiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+CjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0Q5RDlEOSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfMzkyXzM1OCkiPgo8cGF0aCBkPSJNNDUuNTg2MyAzOC43OTA4TDQ0LjMxNDcgNDQuMzAzQzQ0LjEzNjEgNDUuMDgyMiA0My40NTExIDQ1LjYyNzQgNDIuNjQ4OCA0NS42Mjc0QzI4Ljg1MDQgNDUuNjI2MyAxNy42Mjc0IDM0LjQwNSAxNy42Mjc0IDIwLjYwODFDMTcuNjI3NCAxOS44MDY0IDE4LjE3MjcgMTkuMTIwNyAxOC45NTIxIDE4Ljk0MjlMMjQuNDY1MSAxNy42NzE1QzI1LjI2OCAxNy40ODU1IDI2LjA4ODQgMTcuOTAyMiAyNi40MjIgMTguNjYyNEwyOC45NjYzIDI0LjU5NTdDMjkuMjYzNyAyNS4yOTQ2IDI5LjA2MzEgMjYuMTA4OCAyOC40NzUyIDI2LjU4OUwyNS41MzA1IDI4Ljk1M0MyNy4zODkgMzIuNzM4MyAzMC40NjcxIDM1LjgxNTkgMzQuMjU0IDM3LjY3NTJMMzYuNjY0OSAzNC43MzMxQzM3LjE0IDM0LjE0MzYgMzcuOTYwNSAzMy45Mzk3IDM4LjY1OTUgMzQuMjQyNEw0NC41OTM3IDM2Ljc4NTdDNDUuMzA3NCAzNy4xNjEyIDQ1Ljc3MjMgMzcuOTkyNCA0NS41ODYzIDM4Ljc5MDhaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiLz4KPHBhdGggZD0iTTQ1LjU4NjMgMzguNzkwOEw0NC4zMTQ3IDQ0LjMwM0M0NC4xMzYxIDQ1LjA4MjIgNDMuNDUxMSA0NS42Mjc0IDQyLjY0ODggNDUuNjI3NEMyOC44NTA0IDQ1LjYyNjMgMTcuNjI3NCAzNC40MDUgMTcuNjI3NCAyMC42MDgxQzE3LjYyNzQgMTkuODA2NCAxOC4xNzI3IDE5LjEyMDcgMTguOTUyMSAxOC45NDI5TDI0LjQ2NTEgMTcuNjcxNUMyNS4yNjggMTcuNDg1NSAyNi4wODg0IDE3LjkwMjIgMjYuNDIyIDE4LjY2MjRMMjguOTY2MyAyNC41OTU3QzI5LjI2MzcgMjUuMjk0NiAyOS4wNjMxIDI2LjEwODggMjguNDc1MiAyNi41ODlMMjUuNTMwNSAyOC45NTNDMjcuMzg5IDMyLjczODMgMzAuNDY3MSAzNS44MTU5IDM0LjI1NCAzNy42NzUyTDM2LjY2NDkgMzQuNzMzMUMzNy4xNCAzNC4xNDM2IDM3Ljk2MDUgMzMuOTM5NyAzOC42NTk1IDM0LjI0MjRMNDQuNTkzNyAzNi43ODU3QzQ1LjMwNzQgMzcuMTYxMiA0NS43NzIzIDM3Ljk5MjQgNDUuNTg2MyAzOC43OTA4WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjwvZz4KPC9zdmc+Cg==") 50% 50% no-repeat;
  background-size: 64px 64px;
  opacity: 1;
  /*transform: rotate(180deg);*/
  transform: rotate(90deg);
}

body #jvlabelWrap:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  animation-name: rotation-bg2;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swXzM5Ml8zNTgiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+CjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0Q5RDlEOSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfMzkyXzM1OCkiPgo8cGF0aCBkPSJNMjcuMTI3MSA0Mi41OTM3VjQxLjA5MzdIMjUuNjI3MUgxOS42MjczQzE4LjIzMjMgNDEuMDkzNyAxNy4xMjc0IDM5Ljk5NTMgMTcuMTI3NCAzOC42MjkzVjIwLjU5MThDMTcuMTI3NCAxOS4yNjg1IDE4LjI0NjMgMTguMTI3NCAxOS42MjczIDE4LjEyNzRINDMuNjI2M0M0NS4wNDczIDE4LjEyNzQgNDYuMTI2NyAxOS4yNTU1IDQ2LjEyNzQgMjAuNTkyN1YzOC42MjkzQzQ2LjEyNzQgMzkuOTUyNyA0NS4wMDg2IDQxLjA5MzcgNDMuNjI3NiA0MS4wOTM3SDM0LjYyNzlIMzQuMTI1OEwzMy43MjQ5IDQxLjM5NkwyNy4xMjcxIDQ2LjM3MDdWNDIuNTkzN1oiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIvPgo8L2c+Cjwvc3ZnPgo=") 50% 50% no-repeat;
  background-size: 64px 64px;
  opacity: 0;
  transform: rotate(90deg);
}

body #jcont[style*=WidgetContainer_MIN_WIDGET] jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=main_] {
  background-color: transparent !important;
}

body #jcont {
  width: 396px !important;
  min-width: 396px !important;
  margin-bottom: -6px !important;
}

body #jcont > jdiv[class*=__short_]:not([class*=__active_]) {
  height: 64px !important;
  width: 270px !important;
}

body #jcont jdiv[class*=headerBox_] {
  height: 64px !important;
}

body #jcont jdiv[class*=headerBox_] >jdiv[class*=header_] {
  height: 64px !important;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] {
  background: linear-gradient(58.39deg, #fc709a -5.95%, #fc0 102.54%), #fff !important;
  border-radius: 24px !important;
  position: relative;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=leaf_] {
  display: none !important;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=pattern_] {
  background: none !important;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=header_] {
  margin: 0;
  padding: 0;
  width: auto;
  height: 64px;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=header_] * {
  height: 64px !important;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=header_] jdiv[class*=callMe_] {
  width: 28px;
  height: 28px !important;
  right: 60px;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=header_] jdiv[class*=callMe_] jdiv[class*=callIcon_] {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzEiIGhlaWdodD0iMzEiIHZpZXdCb3g9IjAgMCAzMSAzMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI4Ljk1ODkgMjIuNzkwM0wyNy42ODczIDI4LjMwMjVDMjcuNTA4NyAyOS4wODE3IDI2LjgyMzcgMjkuNjI3IDI2LjAyMTQgMjkuNjI3QzEyLjIyMjkgMjkuNjI1OSAxIDE4LjQwNDYgMSA0LjYwNzU5QzEgMy44MDU5MSAxLjU0NTIzIDMuMTIwMTcgMi4zMjQ2NiAyLjk0MjQ0TDcuODM3NjggMS42NzEwMkM4LjY0MDU3IDEuNDg0OTkgOS40NjA5NiAxLjkwMTY4IDkuNzk0NTggMi42NjE5MUwxMi4zMzg5IDguNTk1MkMxMi42MzYzIDkuMjk0MDggMTIuNDM1NyAxMC4xMDgzIDExLjg0NzcgMTAuNTg4NUw4LjkwMzA5IDEyLjk1MjVDMTAuNzYxNSAxNi43Mzc4IDEzLjgzOTcgMTkuODE1NCAxNy42MjY2IDIxLjY3NDdMMjAuMDM3NCAxOC43MzI3QzIwLjUxMjYgMTguMTQzMiAyMS4zMzMxIDE3LjkzOTIgMjIuMDMyMSAxOC4yNDE5TDI3Ljk2NjIgMjAuNzg1M0MyOC42OCAyMS4xNjA3IDI5LjE0NDkgMjEuOTkxOSAyOC45NTg5IDIyLjc5MDNaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==") 0 0 no-repeat;
  background-size: 28px 28px;
  width: 28px;
  height: 28px !important;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=agentName_] {
  max-height: 64px;
  padding: 0 44px 0 80px;
  color: transparent !important;
  font-size: 14px !important;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: #fff !important;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=agentName_]:before {
  content: 'Для начала чата с оператором, пожалуйста, укажите свои данные.';
  color: #fff !important;
  min-width: 100%;
  flex-grow: 1;
  display: none;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=agentName_]:after {
  position: absolute;
  content: '';
  display: block;
  left: 0;
  top: 0;
  width: 64px;
  height: 64px;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMjQiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xMjhfODkzKSIvPgo8cGF0aCBkPSJNMjcuMTI3MSA0Mi41OTM3VjQxLjA5MzdIMjUuNjI3MUgxOS42MjczQzE4LjIzMjMgNDEuMDkzNyAxNy4xMjc0IDM5Ljk5NTMgMTcuMTI3NCAzOC42MjkzVjIwLjU5MThDMTcuMTI3NCAxOS4yNjg1IDE4LjI0NjMgMTguMTI3NCAxOS42MjczIDE4LjEyNzRINDMuNjI2M0M0NS4wNDczIDE4LjEyNzQgNDYuMTI2NyAxOS4yNTU1IDQ2LjEyNzQgMjAuNTkyN1YzOC42MjkzQzQ2LjEyNzQgMzkuOTUyNyA0NS4wMDg2IDQxLjA5MzcgNDMuNjI3NiA0MS4wOTM3SDM0LjYyNzlIMzQuMTI1OEwzMy43MjQ5IDQxLjM5NkwyNy4xMjcxIDQ2LjM3MDdWNDIuNTkzN1oiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzEyOF84OTMiIHgxPSItMi42MzE5M2UtMDYiIHkxPSI3NCIgeDI9IjgxLjM1NjkiIHkyPSIyMy45MzEyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==") 0 0 no-repeat;
  background-size: contain;
  filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.25));
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=avatar_] + jdiv[class*=info_] jdiv[class*=agentName_] {
  color: #fff !important;
  padding: 0 0 0 16px;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=avatar_] + jdiv[class*=info_] jdiv[class*=agentName_]:after {
  display: none;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=avatar_] {
  width: 64px;
  height: 64px;
  padding: 0;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=avatar_] jdiv[class*=lightAvatar_] {
  width: 64px;
  height: 64px;
  margin: 0;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=avatar_] jdiv[class*=avatarImg_] {
  border-radius: 22px !important;
  background-size: 60px 60px !important;
  width: 60px;
  height: 60px !important;
  margin: 0;
  border: 2px solid #fff;
  filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.25)) !important;
}

body #jcont jdiv[class*=headerBox_] jdiv[class*=headerBox_] jdiv[class*=avatar_] jdiv[class*=onlineBadge_] {
  display: none;
}

body #jcont jdiv[class*=contentWrapper_] > jdiv[class*=main_] {
  box-shadow: none;
  border-radius: 24px !important;
}

body #jcont jdiv[class*=contentWrapper_] > jdiv[class*=main_] >jdiv[class*=input_] {
  width: 100%;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] {
  width: 396px !important;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] jdiv[class*=popupContainer_] {
  width: 396px;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=main_] {
  background-color: #fff !important;
  border-radius: 30px 30px 24px 24px !important;
  box-shadow: 0 20px 40px 8px rgba(0,0,0,0.25);
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=main_] > jdiv > jdiv[class*=popup_] {
  left: 0;
  right: 0;
  width: 100%;
  top: 64px !important;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=main_] > jdiv > jdiv[class*=popup_] > jdiv {
  background-color: rgba(0,0,0,0.5);
  left: 0;
  right: 0;
  bottom: 0;
  height: 1000px !important;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=main_] > jdiv > jdiv[class*=popup_] jdiv[class*=main_] {
  background-color: #fff;
  border-radius: 0 0 24px 24px;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=main_] > jdiv > jdiv[class*=popup_] jdiv[class*=main_] jdiv[class*=pin_] {
  right: 64px !important;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=main_] > jdiv > jdiv[class*=popup_] jdiv[class*=main_] jdiv[class*=inputButton_] {
  position: static;
  text-align: center;
  width: auto;
  height: auto;
  display: block;
  background: none;
  padding: 20px 0 0 0;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=main_] > jdiv > jdiv[class*=popup_] jdiv[class*=main_] jdiv[class*=inputButton_] jdiv[class*=buttonIcon_] {
  position: static;
  display: inline-flex;
  margin: 0 auto;
  color: #fff;
  background: #0093d0 !important;
  width: auto;
  min-width: 180px;
  height: auto;
  min-height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  transition: all 0.4s;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=main_] > jdiv > jdiv[class*=popup_] jdiv[class*=main_] jdiv[class*=inputButton_] jdiv[class*=buttonIcon_]:hover,
body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=main_] > jdiv > jdiv[class*=popup_] jdiv[class*=main_] jdiv[class*=inputButton_] jdiv[class*=buttonIcon_]:active {
  background: #0078ac !important;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=main_] > jdiv > jdiv[class*=popup_] jdiv[class*=main_] jdiv[class*=inputButton_] jdiv[class*=buttonIcon_]:before {
  content: 'Продолжить';
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] {
  background-color: #fff !important;
  border-radius: 30px 30px 24px 24px !important;
  box-shadow: 0 20px 40px 8px rgba(0,0,0,0.25);
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv > jdiv[class*=header_] > jdiv[class*=main_] {
  background: linear-gradient(58.39deg, #fc709a -5.95%, #fc0 102.54%), #fff !important;
  border-radius: 24px !important;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv > jdiv[class*=header_] > jdiv[class*=main_] > jdiv[class*=pattern_] {
  background: none !important;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv > jdiv[class*=header_] > jdiv[class*=main_] > jdiv[class*=pattern_] >jdiv[class*=leaf_] {
  display: none;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv > jdiv[class*=header_] > jdiv[class*=main_] > jdiv[class*=pattern_] jdiv[class*=callText_] {
  color: #fff !important;
  padding-left: 64px;
  padding-right: 64px;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv > jdiv[class*=body_] {
  width: auto;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv > jdiv[class*=body_] jdiv[class*=formBox_] jdiv[class*=inputWrap_] {
  border: 2px solid #f2f2f2 !important;
  border-radius: 8px !important;
  padding-left: 14px;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv > jdiv[class*=body_] jdiv[class*=formBox_] jdiv[class*=__error_] {
  border-color: #f00 !important;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv > jdiv[class*=body_] jdiv[class*=formBox_] jdiv[class*=button_] {
  display: block;
  margin: 0 auto;
  background: #0093d0 !important;
  width: auto;
  max-width: 180px;
  height: auto;
  min-height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv > jdiv[class*=body_] jdiv[class*=formBox_] jdiv[class*=button_]:hover,
body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv > jdiv[class*=body_] jdiv[class*=formBox_] jdiv[class*=button_]:active {
  background: #0078ac !important;
}

body #jcont jdiv[class*=__show_] + jdiv[class*=__short_] + jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv > jdiv[class*=body_] jdiv[class*=formBox_] jdiv[class*=button_] > jdiv {
  padding: 0;
}

body #jcont jdiv[class*=closeButton_] {
  width: 24px !important;
  height: 24px !important;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI1IDFMMSAyNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTI1IDI1TDEgMC45OTk5OTkiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=") 0 0 no-repeat;
  background-size: contain;
  margin: 18px 16px 0 auto !important;
  position: relative;
  z-index: 10;
}

body #jcont jdiv[class*=closeButton_] >* {
  width: 24px !important;
  height: 24px !important;
  background: none !important;
}

body #jcont form jdiv[class*=button_] {
  background-color: #0093d0;
  width: 180px;
  margin-left: auto;
  margin-right: auto;
}

body #jcont form jdiv[class*=fieldWrap_] {
  padding-bottom: 12px;
}

body #jcont form jdiv[class*=fieldWrap_] input[type="text"],
body #jcont form jdiv[class*=fieldWrap_] input[type="tel"],
body #jcont form jdiv[class*=fieldWrap_] input[type="email"],
body #jcont form jdiv[class*=fieldWrap_] textarea {
  border: none !important;
  box-shadow: inset 0 0 0 2px #f2f2f2 !important;
}

body #jcont form jdiv[class*=fieldWrap_] input[type="text"]:hover,
body #jcont form jdiv[class*=fieldWrap_] input[type="tel"]:hover,
body #jcont form jdiv[class*=fieldWrap_] input[type="email"]:hover,
body #jcont form jdiv[class*=fieldWrap_] textarea:hover,
body #jcont form jdiv[class*=fieldWrap_] input[type="text"]:active,
body #jcont form jdiv[class*=fieldWrap_] input[type="tel"]:active,
body #jcont form jdiv[class*=fieldWrap_] input[type="email"]:active,
body #jcont form jdiv[class*=fieldWrap_] textarea:active,
body #jcont form jdiv[class*=fieldWrap_] input[type="text"]:focus,
body #jcont form jdiv[class*=fieldWrap_] input[type="tel"]:focus,
body #jcont form jdiv[class*=fieldWrap_] input[type="email"]:focus,
body #jcont form jdiv[class*=fieldWrap_] textarea:focus {
  box-shadow: inset 0 0 0 2px #f5a621 !important;
}

body #jcont form jdiv[class*=fieldWrap_] input[type="text"][class*=_error_],
body #jcont form jdiv[class*=fieldWrap_] input[type="tel"][class*=_error_],
body #jcont form jdiv[class*=fieldWrap_] input[type="email"][class*=_error_],
body #jcont form jdiv[class*=fieldWrap_] textarea[class*=_error_] {
  box-shadow: inset 0 0 0 2px #f01420 !important;
}

body #jcont jdiv[class*=main_] jdiv[class*=__client_] jdiv[class*=_grey_] {
  background-color: #0192d1 !important;
}

body jdiv[class*=__jivoMobileButton] jdiv[class*=button_],
body jdiv[class*=__jivoDesktopButton] jdiv[class*=button_] {
  width: 64px;
  height: 64px;
  transform: rotate(-90deg) translate(0, 0px) !important;
  border-radius: 24px !important;
  box-shadow: none;
  /*background: linear-gradient(58.39deg, var(--myColor1) -5.95%, var(--myColor2) 102.54%) !important;*/
    background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iNjIuNSIgeT0iMS41IiB3aWR0aD0iNjEiIGhlaWdodD0iNjEiIHJ4PSIyMi41IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2Mi41IDEuNSkiIGZpbGw9IndoaXRlIiBzdHJva2U9InVybCgjcGFpbnQwX2xpbmVhcl83MThfNTk2KSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNzE4XzU5NiIgeDE9IjY0IiB5MT0iNzQiIHgyPSIxNDUuMzU3IiB5Mj0iMjMuOTMxMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkM3MDlBIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQ0MwMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=") center / cover no-repeat !important;
  cursor: pointer;
  margin: 0 20px 105px 0 !important;
}

body jdiv[class*=__jivoMobileButton] jdiv[class*=button_]:before,
body jdiv[class*=__jivoDesktopButton] jdiv[class*=button_]:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  animation-name: rotation-bg1;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swXzM5Ml8zNTgiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+CjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0Q5RDlEOSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfMzkyXzM1OCkiPgo8cGF0aCBkPSJNNDUuNTg2MyAzOC43OTA4TDQ0LjMxNDcgNDQuMzAzQzQ0LjEzNjEgNDUuMDgyMiA0My40NTExIDQ1LjYyNzQgNDIuNjQ4OCA0NS42Mjc0QzI4Ljg1MDQgNDUuNjI2MyAxNy42Mjc0IDM0LjQwNSAxNy42Mjc0IDIwLjYwODFDMTcuNjI3NCAxOS44MDY0IDE4LjE3MjcgMTkuMTIwNyAxOC45NTIxIDE4Ljk0MjlMMjQuNDY1MSAxNy42NzE1QzI1LjI2OCAxNy40ODU1IDI2LjA4ODQgMTcuOTAyMiAyNi40MjIgMTguNjYyNEwyOC45NjYzIDI0LjU5NTdDMjkuMjYzNyAyNS4yOTQ2IDI5LjA2MzEgMjYuMTA4OCAyOC40NzUyIDI2LjU4OUwyNS41MzA1IDI4Ljk1M0MyNy4zODkgMzIuNzM4MyAzMC40NjcxIDM1LjgxNTkgMzQuMjU0IDM3LjY3NTJMMzYuNjY0OSAzNC43MzMxQzM3LjE0IDM0LjE0MzYgMzcuOTYwNSAzMy45Mzk3IDM4LjY1OTUgMzQuMjQyNEw0NC41OTM3IDM2Ljc4NTdDNDUuMzA3NCAzNy4xNjEyIDQ1Ljc3MjMgMzcuOTkyNCA0NS41ODYzIDM4Ljc5MDhaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiLz4KPHBhdGggZD0iTTQ1LjU4NjMgMzguNzkwOEw0NC4zMTQ3IDQ0LjMwM0M0NC4xMzYxIDQ1LjA4MjIgNDMuNDUxMSA0NS42Mjc0IDQyLjY0ODggNDUuNjI3NEMyOC44NTA0IDQ1LjYyNjMgMTcuNjI3NCAzNC40MDUgMTcuNjI3NCAyMC42MDgxQzE3LjYyNzQgMTkuODA2NCAxOC4xNzI3IDE5LjEyMDcgMTguOTUyMSAxOC45NDI5TDI0LjQ2NTEgMTcuNjcxNUMyNS4yNjggMTcuNDg1NSAyNi4wODg0IDE3LjkwMjIgMjYuNDIyIDE4LjY2MjRMMjguOTY2MyAyNC41OTU3QzI5LjI2MzcgMjUuMjk0NiAyOS4wNjMxIDI2LjEwODggMjguNDc1MiAyNi41ODlMMjUuNTMwNSAyOC45NTNDMjcuMzg5IDMyLjczODMgMzAuNDY3MSAzNS44MTU5IDM0LjI1NCAzNy42NzUyTDM2LjY2NDkgMzQuNzMzMUMzNy4xNCAzNC4xNDM2IDM3Ljk2MDUgMzMuOTM5NyAzOC42NTk1IDM0LjI0MjRMNDQuNTkzNyAzNi43ODU3QzQ1LjMwNzQgMzcuMTYxMiA0NS43NzIzIDM3Ljk5MjQgNDUuNTg2MyAzOC43OTA4WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjwvZz4KPC9zdmc+Cg==") 50% 50% no-repeat;
  background-size: 64px 64px;
  background-size: 100% 100%;
  opacity: 1;
  transform: rotate(180deg);
}

body jdiv[class*=__jivoMobileButton] jdiv[class*=button_]:after,
body jdiv[class*=__jivoDesktopButton] jdiv[class*=button_]:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  animation-name: rotation-bg2;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPG1hc2sgaWQ9Im1hc2swXzM5Ml8zNTgiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+CjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0Q5RDlEOSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfMzkyXzM1OCkiPgo8cGF0aCBkPSJNMjcuMTI3MSA0Mi41OTM3VjQxLjA5MzdIMjUuNjI3MUgxOS42MjczQzE4LjIzMjMgNDEuMDkzNyAxNy4xMjc0IDM5Ljk5NTMgMTcuMTI3NCAzOC42MjkzVjIwLjU5MThDMTcuMTI3NCAxOS4yNjg1IDE4LjI0NjMgMTguMTI3NCAxOS42MjczIDE4LjEyNzRINDMuNjI2M0M0NS4wNDczIDE4LjEyNzQgNDYuMTI2NyAxOS4yNTU1IDQ2LjEyNzQgMjAuNTkyN1YzOC42MjkzQzQ2LjEyNzQgMzkuOTUyNyA0NS4wMDg2IDQxLjA5MzcgNDMuNjI3NiA0MS4wOTM3SDM0LjYyNzlIMzQuMTI1OEwzMy43MjQ5IDQxLjM5NkwyNy4xMjcxIDQ2LjM3MDdWNDIuNTkzN1oiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIvPgo8L2c+Cjwvc3ZnPgo=") 50% 50% no-repeat;
  background-size: 64px 64px;
  background-size: 100% 100%;
  opacity: 0;
  transform: rotate(90deg);
}

body jdiv[class*=__jivoMobileButton] jdiv[class*=button_] > jdiv,
body jdiv[class*=__jivoDesktopButton] jdiv[class*=button_] > jdiv {
  display: none;
}

body jdiv[class*=globalClass_] > jdiv[class*=mobileContainer_] > jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv[class*=header_] {
  background: linear-gradient(58.39deg, #fc709a -5.95%, #fc0 102.54%), #fff !important;
  border-radius: 24px;
}

body jdiv[class*=globalClass_] > jdiv[class*=mobileContainer_] > jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv[class*=header_] jdiv[class*=pattern_] {
  background: none !important;
}

body jdiv[class*=globalClass_] > jdiv[class*=mobileContainer_] > jdiv[class*=contentWrapper_] > jdiv[class*=wrap_] > jdiv[class*=container_] jdiv[class*=button_] {
  margin: 0 auto;
  width: auto;
  max-width: 180px;
  height: auto;
  min-height: 40px;
  line-height: 40px;
  background: #0093d0 !important;
  border-radius: 3px !important;
  box-shadow: none;
}

body jdiv[class*=globalClass_] > jdiv[class*=mobileContainer_] > jdiv[class*=contentWrapper_] > jdiv[class*=mobile_] jdiv[class*=headerBox_] jdiv[class*=headerBox_] {
  background: linear-gradient(58.39deg, #fc709a -5.95%, #fc0 102.54%), #fff !important;
  border-radius: 24px;
  border-top-left-radius: 24px !important;
  border-top-right-radius: 24px !important;
}

body jdiv[class*=globalClass_] > jdiv[class*=mobileContainer_] > jdiv[class*=contentWrapper_] > jdiv[class*=mobile_] jdiv[class*=headerBox_] jdiv[class*=pattern_] {
  background: none !important;
}

body jdiv[class*=globalClass_] > jdiv[class*=mobileContainer_] > jdiv[class*=contentWrapper_] > jdiv[class*=mobile_] jdiv[class*=main_] jdiv[class*=main_] jdiv[class*=button_] {
  margin: 0 auto;
  width: auto;
  max-width: 180px;
  height: auto;
  min-height: 40px;
  line-height: 40px;
  background: #0093d0 !important;
  border-radius: 3px !important;
  box-shadow: none;
}

body jdiv[class*=globalClass_] > jdiv[class*=mobileContainer_] > jdiv[class*=contentWrapper_] > jdiv[class*=mobile_] jdiv[class*=main_] jdiv[class*=main_] textarea[class*=__textarea_],
body jdiv[class*=globalClass_] > jdiv[class*=mobileContainer_] > jdiv[class*=contentWrapper_] > jdiv[class*=mobile_] jdiv[class*=main_] jdiv[class*=main_] input[type="email"],
body jdiv[class*=globalClass_] > jdiv[class*=mobileContainer_] > jdiv[class*=contentWrapper_] > jdiv[class*=mobile_] jdiv[class*=main_] jdiv[class*=main_] input[type="tel"],
body jdiv[class*=globalClass_] > jdiv[class*=mobileContainer_] > jdiv[class*=contentWrapper_] > jdiv[class*=mobile_] jdiv[class*=main_] jdiv[class*=main_] input[type="text"] {
  border: 2px solid #f2f2f2 !important;
  border-radius: 8px !important;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > a,
body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > jdiv[class*=item_]:not(:last-child) {
  border-bottom: 1px dashed transparent !important;
  position: relative;
  margin-bottom: 1px;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > a:before,
body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > jdiv[class*=item_]:not(:last-child):before {
  position: absolute;
  content: '';
  display: block;
  border-bottom: 1px dashed #000;
  bottom: -1px;
  left: 18px;
  right: 18px;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > a jdiv[class*=title_],
body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > jdiv[class*=item_]:not(:last-child) jdiv[class*=title_] {
  color: #000 !important;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > a > jdiv,
body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > jdiv[class*=item_]:not(:last-child) > jdiv {
  padding-left: 18px !important;
  padding-right: 18px !important;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > a[href*="tg://resolve/"] jdiv[class*=telegramIcon_] {
  width: 21px;
  height: 17px;
  margin-right: 19px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAyMSAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjk5NCAxLjQ3MjE5QzIwLjY5OTQgNC40NTkyNCAxOS40NDA0IDExLjcwMzcgMTguNzk5NiAxNS4wNTQ4QzE4LjUyOSAxNi40Njk5IDE3Ljk5NTEgMTYuOTQ1MiAxNy40NzQzIDE2Ljk5MTZDMTYuMzUxNyAxNy4wOTIyIDE1LjQ5OTcgMTYuMjY2NiAxNC40MTIyIDE1LjU2OTdDMTIuNzEwNCAxNC40ODA2IDExLjc0OTIgMTMuODAyIDEwLjA5NzMgMTIuNzM4OEM4LjE4ODk2IDExLjUwOTUgOS40MjYxMiAxMC44MzQ3IDEwLjUxMzYgOS43MzAzNkMxMC43OTgyIDkuNDQwOTYgMTUuNzQ1MiA1LjA0NTY5IDE1Ljg0MTEgNC42NDY2MkMxNS44NTI4IDQuNTk3MTIgMTUuODY0NSA0LjQxMDUxIDE1Ljc1MDcgNC4zMTNDMTUuNjM2OSA0LjIxNTU0IDE1LjQ3MDggNC4yNDgyNyAxNS4zNTA4IDQuMjc0OTRDMTUuMTc5OCA0LjMxMjUyIDEyLjQ2MTUgNi4wNjc3NyA3LjE5NTgzIDkuNTQwNzNDNi40MjQwNiAxMC4wNTgxIDUuNzI1MjkgMTAuMzEwMiA1LjA5OTU1IDEwLjI5N0M0LjQwODg2IDEwLjI4MjUgMy4wODEyOCA5LjkxNjIgMi4wOTQzNyA5LjYwMjQ0QzAuODgzNjg2IDkuMjE3ODMgLTAuMDc5MDU4IDkuMDE0NDUgMC4wMDUxMzA2NyA4LjM2MTc0QzAuMDQ4NzgyMiA4LjAyMTU5IDAuNTI4MTk0IDcuNjczNzUgMS40NDM0MiA3LjMxODM3QzcuMDc4NjMgNC45MTkyNSAxMC44MzY2IDMuMzM3NjMgMTIuNzE3NCAyLjU3MzQ3QzE4LjA4NzEgMC4zOTE0NzYgMTkuMjAyNiAwLjAxMjkyNzQgMTkuOTMgMEMyMC4wODk4IDAgMjAuNDQ2OCAwLjAzNTgwMjcgMjAuNjc5MSAwLjIxOTMzNEMyMC44MzI4IDAuMzUwNTc4IDIwLjkzMDkgMC41MzMwNTIgMjAuOTU0MyAwLjczMTE0NUMyMC45OTU3IDAuOTc1OTQ5IDIxLjAwOSAxLjIyNDUgMjAuOTk0IDEuNDcyMTlaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTI4XzgyMCkiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xMjhfODIwIiB4MT0iLTguNjM2MDNlLTA3IiB5MT0iMTkuNjU2MiIgeDI9IjIzLjMyNTIiIHkyPSIxLjkyMzc5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==") !important;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > a[href*="vk"] jdiv[class*=vkIcon_] {
  width: 23px;
  height: 14px;
  margin-right: 17px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMyAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMC4zNzI1NTlMMy45MzY0NCAwLjM3MjU1OUM0LjA2NTczIDYuNzg5MDggNi45Njc4NSA5LjUwNjUxIDkuMjY2NjMgMTAuMDY3MVYwLjM3MjU1OUwxMi45NzMgMC4zNzI1NTlWNS45MDg3N0MxNS4yNDI1IDUuNjcwMTEgMTcuNjI3NSAzLjE0ODU0IDE4LjQzMTcgMC4zNzQ3OTFMMjIuMTM4MSAwLjM3NDc5MUMyMS44MzUzIDEuODEzODcgMjEuMjMxMiAzLjE3NjUyIDIwLjM2MzYgNC4zNzc0N0MxOS40OTU5IDUuNTc4MzkgMTguMzgzNCA2LjU5MTc4IDE3LjA5NTcgNy4zNTQxN0MxOC41MzMgOC4wNTAxNiAxOS44MDI1IDkuMDM1NjIgMjAuODIwMyAxMC4yNDU1QzIxLjgzODEgMTEuNDU1MyAyMi41ODEgMTIuODYyIDIzIDE0LjM3MjZIMTguOTIxMUMxOC41NDUgMTMuMDYwNSAxNy43Nzk5IDExLjg4NiAxNi43MjE5IDEwLjk5NjNDMTUuNjYzOCAxMC4xMDY2IDE0LjM1OTkgOS41NDEzNSAxMi45NzM4IDkuMzcxNDRWMTQuMzcyNkgxMi41MjgyQzQuNjY4MzUgMTQuMzY3MyAwLjE4NjI0IDkuMTE0MDIgMCAwLjM3MjU1OVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xMjhfODI0KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzEyOF84MjQiIHgxPSItOS40NTg1MWUtMDciIHkxPSIxNi41NjAxIiB4Mj0iMTkuOTM0MSIgeTI9Ii0zLjU5NDM0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==") !important;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > a[href*="vk"] jdiv[class*=subTitle_] {
  display: none;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > a[href*="viber://"] jdiv[class*=viberIcon_] {
  width: 23px;
  margin-right: 17px;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > a[href*="wa.me"] jdiv[class*=icon_] {
  width: 23px;
  height: 23px;
  margin-right: 17px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyMyAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjU1NTEgMy43MTQ3NUMxNy40MDQgMS41NTg1IDE0LjUzOTMgMC4zNzI1NTkgMTEuNDk0OSAwLjM3MjU1OUM1LjIxMDk0IDAuMzcyNTU5IDAuMDk3NTQ0NiA1LjQ4NTk1IDAuMDk3NTQ0NiAxMS43Njk5QzAuMDk3NTQ0NiAxMy43NzcyIDAuNjIxMjA1IDE1LjczODQgMS42MTcxOSAxNy40Njg1TDAgMjMuMzcyNkw2LjA0MjYzIDIxLjc4NjJDNy43MDYwMyAyMi42OTQ5IDkuNTc5OTEgMjMuMTcyMyAxMS40ODk3IDIzLjE3MjNIMTEuNDk0OUMxNy43NzM3IDIzLjE3MjMgMjMgMTguMDU4OSAyMyAxMS43NzVDMjMgOC43MzA1OSAyMS43MDYzIDUuODcxIDE5LjU1NTEgMy43MTQ3NVpNMTEuNDk0OSAyMS4yNTIyQzkuNzkwNCAyMS4yNTIyIDguMTIxODcgMjAuNzk1MyA2LjY2ODk3IDE5LjkzMjhMNi4zMjUgMTkuNzI3NUwyLjc0MTUyIDIwLjY2N0wzLjY5NjQzIDE3LjE3MDhMMy40NzA1NCAxNi44MTE0QzIuNTIwNzYgMTUuMzAyIDIuMDIyNzcgMTMuNTYxNiAyLjAyMjc3IDExLjc2OTlDMi4wMjI3NyA2LjU0ODY4IDYuMjczNjYgMi4yOTc3OCAxMS41IDIuMjk3NzhDMTQuMDMxIDIuMjk3NzggMTYuNDA4IDMuMjgzNSAxOC4xOTQ2IDUuMDc1MjRDMTkuOTgxMyA2Ljg2Njk4IDIxLjA3OTkgOS4yNDM5OSAyMS4wNzQ4IDExLjc3NUMyMS4wNzQ4IDE3LjAwMTQgMTYuNzE2MSAyMS4yNTIyIDExLjQ5NDkgMjEuMjUyMlpNMTYuNjkwNCAxNC4xNTcyQzE2LjQwOCAxNC4wMTM0IDE1LjAwNjUgMTMuMzI1NSAxNC43NDQ2IDEzLjIzMzFDMTQuNDgyOCAxMy4xMzU1IDE0LjI5MjkgMTMuMDg5MyAxNC4xMDI5IDEzLjM3NjhDMTMuOTEyOSAxMy42NjQzIDEzLjM2ODggMTQuMzAwOSAxMy4xOTkzIDE0LjQ5NkMxMy4wMzUgMTQuNjg2IDEyLjg2NTYgMTQuNzExNiAxMi41ODMzIDE0LjU2NzlDMTAuOTA5NiAxMy43MzEgOS44MTA5NCAxMy4wNzM5IDguNzA3MTQgMTEuMTc5NUM4LjQxNDUxIDEwLjY3NjQgOC45OTk3OCAxMC43MTIzIDkuNTQzOTcgOS42MjM5QzkuNjM2MzggOS40MzM5NCA5LjU5MDE4IDkuMjY5NjYgOS41MTgzIDkuMTI1OTFDOS40NDY0MyA4Ljk4MjE2IDguODc2NTYgNy41ODA1OSA4LjY0MDQgNy4wMTA3M0M4LjQwOTM4IDYuNDU2MjYgOC4xNzMyMSA2LjUzMzI3IDcuOTk4NjYgNi41MjMwMUM3LjgzNDM4IDYuNTEyNzQgNy42NDQ0MiA2LjUxMjc0IDcuNDU0NDYgNi41MTI3NEM3LjI2NDUxIDYuNTEyNzQgNi45NTY0NyA2LjU4NDYxIDYuNjk0NjQgNi44NjY5OEM2LjQzMjgxIDcuMTU0NDggNS42OTg2NiA3Ljg0MjQyIDUuNjk4NjYgOS4yNDM5OUM1LjY5ODY2IDEwLjY0NTUgNi43MjAzMSAxMi4wMDA5IDYuODU4OTMgMTIuMTkwOUM3LjAwMjY4IDEyLjM4MDggOC44NjYyOSAxNS4yNTU4IDExLjcyNTkgMTYuNDkzMUMxMy41MzMgMTcuMjczNSAxNC4yNDE1IDE3LjM0MDIgMTUuMTQ1MSAxNy4yMDY3QzE1LjY5NDQgMTcuMTI0NiAxNi44MjkgMTYuNTE4OCAxNy4wNjUyIDE1Ljg1MTRDMTcuMzAxMyAxNS4xODM5IDE3LjMwMTMgMTQuNjE0MSAxNy4yMjk1IDE0LjQ5NkMxNy4xNjI3IDE0LjM2NzYgMTYuOTcyOCAxNC4yOTU4IDE2LjY5MDQgMTQuMTU3MloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xMjhfODI4KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzEyOF84MjgiIHgxPSItOS40NTg1MWUtMDciIHkxPSIyNi45NjYzIiB4Mj0iMjkuMjM3NiIgeTI9IjguOTcyODIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZDNzA5QSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRkNDMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K") !important;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > jdiv[class*=item_]:nth-child(6) jdiv[class*=icon_] {
  width: 21px;
  height: 21px;
  margin-right: 19px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxLjk2OTIgMTcuMjQ1TDIxLjAxNTUgMjEuMzc5MkMyMC44ODE1IDIxLjk2MzcgMjAuMzY3OCAyMi4zNzI2IDE5Ljc2NiAyMi4zNzI2QzkuNDE3MiAyMi4zNzE3IDEgMTMuOTU1OCAxIDMuNjA4MDRDMSAzLjAwNjc4IDEuNDA4OTIgMi40OTI0NyAxLjk5MzQ5IDIuMzU5MThMNi4xMjgyNiAxLjQwNTYxQzYuNzMwNDMgMS4yNjYwOCA3LjM0NTcyIDEuNTc4NjEgNy41OTU5NCAyLjE0ODc4TDkuNTA0MTYgNi41OTg3NUM5LjcyNzIzIDcuMTIyOSA5LjU3Njc3IDcuNzMzNTkgOS4xMzU4MSA4LjA5MzY5TDYuOTI3MzIgOS44NjY3MUM4LjMyMTE2IDEyLjcwNTcgMTAuNjI5NyAxNS4wMTM5IDEzLjQ2OTkgMTYuNDA4NEwxNS4yNzgxIDE0LjIwMThDMTUuNjM0NCAxMy43NTk3IDE2LjI0OTggMTMuNjA2NyAxNi43NzQxIDEzLjgzMzdMMjEuMjI0NyAxNS43NDEzQzIxLjc2IDE2LjAyMjggMjIuMTA4NiAxNi42NDYyIDIxLjk2OTIgMTcuMjQ1WiIgc3Ryb2tlPSJ1cmwoI3BhaW50MF9saW5lYXJfMTI4XzgzMikiIHN0cm9rZS13aWR0aD0iMiIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzEyOF84MzIiIHgxPSIwLjk5OTk5OSIgeTE9IjI1LjY1MzgiIHgyPSIyNy42OTUyIiB5Mj0iOS4yMjQ5NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkM3MDlBIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQ0MwMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=") !important;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > jdiv[class*=item_]:nth-child(7) jdiv[class*=icon_] {
  width: 23px;
  height: 24px;
  margin-right: 17px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyMyAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjY1NjYgMTguODQ3M0gxMy4zMTA0TDEzLjAzODMgMTkuMDYxM0w4LjE4NzIyIDIyLjg3OFYxOS44NDczVjE4Ljg0NzNINy4xODcyMkgyLjg3NDg5QzEuODcwMTUgMTguODQ3MyAxIDE4LjAwOTUgMSAxNi44NzRMMSAzLjM0NTgzQzEgMi4yNDMzMyAxLjg3OTI3IDEuMzcyNTYgMi44NzQ4OSAxLjM3MjU2TDIwLjEyNDIgMS4zNzI1NkMyMS4xNDk0IDEuMzcyNTYgMjEuOTk5NCAyLjIzNDUgMjIgMy4zNDYzOVYxNi44NzRDMjIgMTcuOTc2NSAyMS4xMjA3IDE4Ljg0NzMgMjAuMTI1MSAxOC44NDczSDEzLjY1NjZaIiBzdHJva2U9InVybCgjcGFpbnQwX2xpbmVhcl8xMjhfODM2KSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTI4XzgzNiIgeDE9Ii05LjQ1ODUxZS0wNyIgeTE9IjI4LjEyMjYiIHgyPSIyOS45MDgiIHkyPSIxMC40ODM0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQzcwOUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkZDQzAwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==") !important;
}

body jdiv[class*=globalClass_] jdiv[class*=menuWrapper] jdiv[class*=menu_] > jdiv > jdiv[class*=item_] > jdiv {
  padding-left: 18px !important;
  padding-right: 18px !important;
}


@keyframes rotation-bg1 {
  0%, 15% {
      /* phone1 */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDQ4QzIzLjE2MzQgNDggMTYgNDAuODM2NiAxNiAzMkMxNiAyMy4xNjM0IDIzLjE2MzQgMTYgMzIgMTZDNDAuODM2NiAxNiA0OCAyMy4xNjM0IDQ4IDMyQzQ4IDQwLjgzNjYgNDAuODM2NiA0OCAzMiA0OFpNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NSAzNi43MDIxQzI3LjI5OSAzNi43MDk2IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUyIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl83MjFfNTU2KSIvPgo8cGF0aCBkPSJNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NiAzNi43MDIxQzI3LjI5OSAzNi43MDk3IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUzIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMuNCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzcyMV81NTYiIHgxPSIxNiIgeTE9IjQ4IiB4Mj0iNDguMzQ1MiIgeTI9IjE2LjM1MjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZCNzA5OSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGMEFCMTMiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K");
    transform: rotate(90deg);
    opacity: 1;
  }

  19% {
      /* phone1 */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDQ4QzIzLjE2MzQgNDggMTYgNDAuODM2NiAxNiAzMkMxNiAyMy4xNjM0IDIzLjE2MzQgMTYgMzIgMTZDNDAuODM2NiAxNiA0OCAyMy4xNjM0IDQ4IDMyQzQ4IDQwLjgzNjYgNDAuODM2NiA0OCAzMiA0OFpNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NSAzNi43MDIxQzI3LjI5OSAzNi43MDk2IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUyIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl83MjFfNTU2KSIvPgo8cGF0aCBkPSJNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NiAzNi43MDIxQzI3LjI5OSAzNi43MDk3IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUzIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMuNCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzcyMV81NTYiIHgxPSIxNiIgeTE9IjQ4IiB4Mj0iNDguMzQ1MiIgeTI9IjE2LjM1MjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZCNzA5OSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGMEFCMTMiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K");
    transform: rotate(0deg);
    opacity: 0;
  }

  20%, 35% {
      /*telegram*/
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ0Ljc5MTggMjIuMDc4NEM0NC4zODc3IDI2LjI5NTQgNDIuNjYxMSAzNi41MjI5IDQxLjc4MjMgNDEuMjUzOUM0MS40MTEzIDQzLjI1MTcgNDAuNjc5IDQzLjkyMjYgMzkuOTY0OCA0My45ODgyQzM4LjQyNTIgNDQuMTMwMSAzNy4yNTY3IDQyLjk2NDYgMzUuNzY1MyA0MS45ODA4QzMzLjQzMTUgNDAuNDQzMiAzMi4xMTMzIDM5LjQ4NTEgMjkuODQ3OCAzNy45ODQxQzI3LjIzMDYgMzYuMjQ4OCAyOC45MjczIDM1LjI5NjEgMzAuNDE4NyAzMy43MzdDMzAuODA4OSAzMy4zMjg0IDM3LjU5MzUgMjcuMTIzMyAzNy43MjUgMjYuNTU5OUMzNy43NDEgMjYuNDkwMSAzNy43NTcxIDI2LjIyNjYgMzcuNjAxIDI2LjA4ODlDMzcuNDQ0OSAyNS45NTE0IDM3LjIxNzEgMjUuOTk3NiAzNy4wNTI1IDI2LjAzNTJDMzYuODE4MSAyNi4wODgzIDMzLjA5IDI4LjU2NjMgMjUuODY4NiAzMy40NjkzQzI0LjgxMDEgMzQuMTk5NyAyMy44NTE4IDM0LjU1NTYgMjIuOTkzNyAzNC41MzdDMjIuMDQ2NCAzNC41MTY1IDIwLjIyNTggMzMuOTk5MyAxOC44NzIzIDMzLjU1NjRDMTcuMjExOSAzMy4wMTM0IDE1Ljg5MTYgMzIuNzI2MyAxNi4wMDcgMzEuODA0OEMxNi4wNjY5IDMxLjMyNDYgMTYuNzI0NCAzMC44MzM1IDE3Ljk3OTUgMzAuMzMxOEMyNS43MDc4IDI2Ljk0NDggMzAuODYxNyAyNC43MTIgMzMuNDQxIDIzLjYzMzFDNDAuODA1MSAyMC41NTI3IDQyLjMzNSAyMC4wMTgzIDQzLjMzMjUgMjBDNDMuNTUxNyAyMCA0NC4wNDEzIDIwLjA1MDUgNDQuMzU5OSAyMC4zMDk2QzQ0LjU3MDcgMjAuNDk0OSA0NC43MDUyIDIwLjc1MjUgNDQuNzM3MyAyMS4wMzIyQzQ0Ljc5NDEgMjEuMzc3OCA0NC44MTI0IDIxLjcyODcgNDQuNzkxOCAyMi4wNzg0WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzcxOF82NDMpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNzE4XzY0MyIgeDE9IjE2IiB5MT0iNDQiIHgyPSIzOS45NTU0IiB5Mj0iMTUuODczOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkI3MDk5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0YwQUIxMyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=");
    transform: rotate(180deg);
    opacity: 0;
  }

  40%, 55% {
      /*telegram*/
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ0Ljc5MTggMjIuMDc4NEM0NC4zODc3IDI2LjI5NTQgNDIuNjYxMSAzNi41MjI5IDQxLjc4MjMgNDEuMjUzOUM0MS40MTEzIDQzLjI1MTcgNDAuNjc5IDQzLjkyMjYgMzkuOTY0OCA0My45ODgyQzM4LjQyNTIgNDQuMTMwMSAzNy4yNTY3IDQyLjk2NDYgMzUuNzY1MyA0MS45ODA4QzMzLjQzMTUgNDAuNDQzMiAzMi4xMTMzIDM5LjQ4NTEgMjkuODQ3OCAzNy45ODQxQzI3LjIzMDYgMzYuMjQ4OCAyOC45MjczIDM1LjI5NjEgMzAuNDE4NyAzMy43MzdDMzAuODA4OSAzMy4zMjg0IDM3LjU5MzUgMjcuMTIzMyAzNy43MjUgMjYuNTU5OUMzNy43NDEgMjYuNDkwMSAzNy43NTcxIDI2LjIyNjYgMzcuNjAxIDI2LjA4ODlDMzcuNDQ0OSAyNS45NTE0IDM3LjIxNzEgMjUuOTk3NiAzNy4wNTI1IDI2LjAzNTJDMzYuODE4MSAyNi4wODgzIDMzLjA5IDI4LjU2NjMgMjUuODY4NiAzMy40NjkzQzI0LjgxMDEgMzQuMTk5NyAyMy44NTE4IDM0LjU1NTYgMjIuOTkzNyAzNC41MzdDMjIuMDQ2NCAzNC41MTY1IDIwLjIyNTggMzMuOTk5MyAxOC44NzIzIDMzLjU1NjRDMTcuMjExOSAzMy4wMTM0IDE1Ljg5MTYgMzIuNzI2MyAxNi4wMDcgMzEuODA0OEMxNi4wNjY5IDMxLjMyNDYgMTYuNzI0NCAzMC44MzM1IDE3Ljk3OTUgMzAuMzMxOEMyNS43MDc4IDI2Ljk0NDggMzAuODYxNyAyNC43MTIgMzMuNDQxIDIzLjYzMzFDNDAuODA1MSAyMC41NTI3IDQyLjMzNSAyMC4wMTgzIDQzLjMzMjUgMjBDNDMuNTUxNyAyMCA0NC4wNDEzIDIwLjA1MDUgNDQuMzU5OSAyMC4zMDk2QzQ0LjU3MDcgMjAuNDk0OSA0NC43MDUyIDIwLjc1MjUgNDQuNzM3MyAyMS4wMzIyQzQ0Ljc5NDEgMjEuMzc3OCA0NC44MTI0IDIxLjcyODcgNDQuNzkxOCAyMi4wNzg0WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzcxOF82NDMpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNzE4XzY0MyIgeDE9IjE2IiB5MT0iNDQiIHgyPSIzOS45NTU0IiB5Mj0iMTUuODczOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkI3MDk5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0YwQUIxMyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=");
      transform: rotate(90deg);
      opacity: 1;
  }

  59% {
      /*telegram*/
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ0Ljc5MTggMjIuMDc4NEM0NC4zODc3IDI2LjI5NTQgNDIuNjYxMSAzNi41MjI5IDQxLjc4MjMgNDEuMjUzOUM0MS40MTEzIDQzLjI1MTcgNDAuNjc5IDQzLjkyMjYgMzkuOTY0OCA0My45ODgyQzM4LjQyNTIgNDQuMTMwMSAzNy4yNTY3IDQyLjk2NDYgMzUuNzY1MyA0MS45ODA4QzMzLjQzMTUgNDAuNDQzMiAzMi4xMTMzIDM5LjQ4NTEgMjkuODQ3OCAzNy45ODQxQzI3LjIzMDYgMzYuMjQ4OCAyOC45MjczIDM1LjI5NjEgMzAuNDE4NyAzMy43MzdDMzAuODA4OSAzMy4zMjg0IDM3LjU5MzUgMjcuMTIzMyAzNy43MjUgMjYuNTU5OUMzNy43NDEgMjYuNDkwMSAzNy43NTcxIDI2LjIyNjYgMzcuNjAxIDI2LjA4ODlDMzcuNDQ0OSAyNS45NTE0IDM3LjIxNzEgMjUuOTk3NiAzNy4wNTI1IDI2LjAzNTJDMzYuODE4MSAyNi4wODgzIDMzLjA5IDI4LjU2NjMgMjUuODY4NiAzMy40NjkzQzI0LjgxMDEgMzQuMTk5NyAyMy44NTE4IDM0LjU1NTYgMjIuOTkzNyAzNC41MzdDMjIuMDQ2NCAzNC41MTY1IDIwLjIyNTggMzMuOTk5MyAxOC44NzIzIDMzLjU1NjRDMTcuMjExOSAzMy4wMTM0IDE1Ljg5MTYgMzIuNzI2MyAxNi4wMDcgMzEuODA0OEMxNi4wNjY5IDMxLjMyNDYgMTYuNzI0NCAzMC44MzM1IDE3Ljk3OTUgMzAuMzMxOEMyNS43MDc4IDI2Ljk0NDggMzAuODYxNyAyNC43MTIgMzMuNDQxIDIzLjYzMzFDNDAuODA1MSAyMC41NTI3IDQyLjMzNSAyMC4wMTgzIDQzLjMzMjUgMjBDNDMuNTUxNyAyMCA0NC4wNDEzIDIwLjA1MDUgNDQuMzU5OSAyMC4zMDk2QzQ0LjU3MDcgMjAuNDk0OSA0NC43MDUyIDIwLjc1MjUgNDQuNzM3MyAyMS4wMzIyQzQ0Ljc5NDEgMjEuMzc3OCA0NC44MTI0IDIxLjcyODcgNDQuNzkxOCAyMi4wNzg0WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzcxOF82NDMpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNzE4XzY0MyIgeDE9IjE2IiB5MT0iNDQiIHgyPSIzOS45NTU0IiB5Mj0iMTUuODczOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkI3MDk5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0YwQUIxMyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=");
      transform: rotate(0deg);
    opacity: 0;
  }

  60%, 75% {
    /*  whatsapp */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NSA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ0LjIwNzEgMjEuNjVDNDEuMjE0MyAxOC42NSAzNy4yMjg2IDE3IDMyLjk5MjkgMTdDMjQuMjUgMTcgMTcuMTM1NyAyNC4xMTQzIDE3LjEzNTcgMzIuODU3MUMxNy4xMzU3IDM1LjY1IDE3Ljg2NDMgMzguMzc4NiAxOS4yNSA0MC43ODU3TDE3IDQ5TDI1LjQwNzEgNDYuNzkyOUMyNy43MjE0IDQ4LjA1NzEgMzAuMzI4NiA0OC43MjE0IDMyLjk4NTcgNDguNzIxNEgzMi45OTI5QzQxLjcyODYgNDguNzIxNCA0OSA0MS42MDcxIDQ5IDMyLjg2NDNDNDkgMjguNjI4NiA0Ny4yIDI0LjY1IDQ0LjIwNzEgMjEuNjVaTTMyLjk5MjkgNDYuMDVDMzAuNjIxNCA0Ni4wNSAyOC4zIDQ1LjQxNDMgMjYuMjc4NiA0NC4yMTQzTDI1LjggNDMuOTI4NkwyMC44MTQzIDQ1LjIzNTdMMjIuMTQyOSA0MC4zNzE0TDIxLjgyODYgMzkuODcxNEMyMC41MDcxIDM3Ljc3MTQgMTkuODE0MyAzNS4zNSAxOS44MTQzIDMyLjg1NzFDMTkuODE0MyAyNS41OTI5IDI1LjcyODYgMTkuNjc4NiAzMyAxOS42Nzg2QzM2LjUyMTQgMTkuNjc4NiAzOS44Mjg2IDIxLjA1IDQyLjMxNDMgMjMuNTQyOUM0NC44IDI2LjAzNTcgNDYuMzI4NiAyOS4zNDI5IDQ2LjMyMTQgMzIuODY0M0M0Ni4zMjE0IDQwLjEzNTcgNDAuMjU3MSA0Ni4wNSAzMi45OTI5IDQ2LjA1Wk00MC4yMjE0IDM2LjE3ODZDMzkuODI4NiAzNS45Nzg2IDM3Ljg3ODYgMzUuMDIxNCAzNy41MTQzIDM0Ljg5MjlDMzcuMTUgMzQuNzU3MSAzNi44ODU3IDM0LjY5MjkgMzYuNjIxNCAzNS4wOTI5QzM2LjM1NzEgMzUuNDkyOSAzNS42IDM2LjM3ODYgMzUuMzY0MyAzNi42NUMzNS4xMzU3IDM2LjkxNDMgMzQuOSAzNi45NSAzNC41MDcxIDM2Ljc1QzMyLjE3ODYgMzUuNTg1NyAzMC42NSAzNC42NzE0IDI5LjExNDMgMzIuMDM1N0MyOC43MDcxIDMxLjMzNTcgMjkuNTIxNCAzMS4zODU3IDMwLjI3ODYgMjkuODcxNEMzMC40MDcxIDI5LjYwNzEgMzAuMzQyOSAyOS4zNzg2IDMwLjI0MjkgMjkuMTc4NkMzMC4xNDI5IDI4Ljk3ODYgMjkuMzUgMjcuMDI4NiAyOS4wMjE0IDI2LjIzNTdDMjguNyAyNS40NjQzIDI4LjM3MTQgMjUuNTcxNCAyOC4xMjg2IDI1LjU1NzFDMjcuOSAyNS41NDI5IDI3LjYzNTcgMjUuNTQyOSAyNy4zNzE0IDI1LjU0MjlDMjcuMTA3MSAyNS41NDI5IDI2LjY3ODYgMjUuNjQyOSAyNi4zMTQzIDI2LjAzNTdDMjUuOTUgMjYuNDM1NyAyNC45Mjg2IDI3LjM5MjkgMjQuOTI4NiAyOS4zNDI5QzI0LjkyODYgMzEuMjkyOSAyNi4zNSAzMy4xNzg2IDI2LjU0MjkgMzMuNDQyOUMyNi43NDI5IDMzLjcwNzEgMjkuMzM1NyAzNy43MDcxIDMzLjMxNDMgMzkuNDI4NkMzNS44Mjg2IDQwLjUxNDMgMzYuODE0MyA0MC42MDcxIDM4LjA3MTQgNDAuNDIxNEMzOC44MzU3IDQwLjMwNzEgNDAuNDE0MyAzOS40NjQzIDQwLjc0MjkgMzguNTM1N0M0MS4wNzE0IDM3LjYwNzEgNDEuMDcxNCAzNi44MTQzIDQwLjk3MTQgMzYuNjVDNDAuODc4NiAzNi40NzE0IDQwLjYxNDMgMzYuMzcxNCA0MC4yMjE0IDM2LjE3ODZaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfNzE4XzY1NykiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl83MThfNjU3IiB4MT0iMTciIHkxPSI0OSIgeDI9IjQ5LjM0NTIiIHkyPSIxNy4zNTI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQjcwOTkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjBBQjEzIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==");
    transform: rotate(180deg);
    opacity: 0;
  }

  80%, 95% {
      /*  whatsapp */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NSA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ0LjIwNzEgMjEuNjVDNDEuMjE0MyAxOC42NSAzNy4yMjg2IDE3IDMyLjk5MjkgMTdDMjQuMjUgMTcgMTcuMTM1NyAyNC4xMTQzIDE3LjEzNTcgMzIuODU3MUMxNy4xMzU3IDM1LjY1IDE3Ljg2NDMgMzguMzc4NiAxOS4yNSA0MC43ODU3TDE3IDQ5TDI1LjQwNzEgNDYuNzkyOUMyNy43MjE0IDQ4LjA1NzEgMzAuMzI4NiA0OC43MjE0IDMyLjk4NTcgNDguNzIxNEgzMi45OTI5QzQxLjcyODYgNDguNzIxNCA0OSA0MS42MDcxIDQ5IDMyLjg2NDNDNDkgMjguNjI4NiA0Ny4yIDI0LjY1IDQ0LjIwNzEgMjEuNjVaTTMyLjk5MjkgNDYuMDVDMzAuNjIxNCA0Ni4wNSAyOC4zIDQ1LjQxNDMgMjYuMjc4NiA0NC4yMTQzTDI1LjggNDMuOTI4NkwyMC44MTQzIDQ1LjIzNTdMMjIuMTQyOSA0MC4zNzE0TDIxLjgyODYgMzkuODcxNEMyMC41MDcxIDM3Ljc3MTQgMTkuODE0MyAzNS4zNSAxOS44MTQzIDMyLjg1NzFDMTkuODE0MyAyNS41OTI5IDI1LjcyODYgMTkuNjc4NiAzMyAxOS42Nzg2QzM2LjUyMTQgMTkuNjc4NiAzOS44Mjg2IDIxLjA1IDQyLjMxNDMgMjMuNTQyOUM0NC44IDI2LjAzNTcgNDYuMzI4NiAyOS4zNDI5IDQ2LjMyMTQgMzIuODY0M0M0Ni4zMjE0IDQwLjEzNTcgNDAuMjU3MSA0Ni4wNSAzMi45OTI5IDQ2LjA1Wk00MC4yMjE0IDM2LjE3ODZDMzkuODI4NiAzNS45Nzg2IDM3Ljg3ODYgMzUuMDIxNCAzNy41MTQzIDM0Ljg5MjlDMzcuMTUgMzQuNzU3MSAzNi44ODU3IDM0LjY5MjkgMzYuNjIxNCAzNS4wOTI5QzM2LjM1NzEgMzUuNDkyOSAzNS42IDM2LjM3ODYgMzUuMzY0MyAzNi42NUMzNS4xMzU3IDM2LjkxNDMgMzQuOSAzNi45NSAzNC41MDcxIDM2Ljc1QzMyLjE3ODYgMzUuNTg1NyAzMC42NSAzNC42NzE0IDI5LjExNDMgMzIuMDM1N0MyOC43MDcxIDMxLjMzNTcgMjkuNTIxNCAzMS4zODU3IDMwLjI3ODYgMjkuODcxNEMzMC40MDcxIDI5LjYwNzEgMzAuMzQyOSAyOS4zNzg2IDMwLjI0MjkgMjkuMTc4NkMzMC4xNDI5IDI4Ljk3ODYgMjkuMzUgMjcuMDI4NiAyOS4wMjE0IDI2LjIzNTdDMjguNyAyNS40NjQzIDI4LjM3MTQgMjUuNTcxNCAyOC4xMjg2IDI1LjU1NzFDMjcuOSAyNS41NDI5IDI3LjYzNTcgMjUuNTQyOSAyNy4zNzE0IDI1LjU0MjlDMjcuMTA3MSAyNS41NDI5IDI2LjY3ODYgMjUuNjQyOSAyNi4zMTQzIDI2LjAzNTdDMjUuOTUgMjYuNDM1NyAyNC45Mjg2IDI3LjM5MjkgMjQuOTI4NiAyOS4zNDI5QzI0LjkyODYgMzEuMjkyOSAyNi4zNSAzMy4xNzg2IDI2LjU0MjkgMzMuNDQyOUMyNi43NDI5IDMzLjcwNzEgMjkuMzM1NyAzNy43MDcxIDMzLjMxNDMgMzkuNDI4NkMzNS44Mjg2IDQwLjUxNDMgMzYuODE0MyA0MC42MDcxIDM4LjA3MTQgNDAuNDIxNEMzOC44MzU3IDQwLjMwNzEgNDAuNDE0MyAzOS40NjQzIDQwLjc0MjkgMzguNTM1N0M0MS4wNzE0IDM3LjYwNzEgNDEuMDcxNCAzNi44MTQzIDQwLjk3MTQgMzYuNjVDNDAuODc4NiAzNi40NzE0IDQwLjYxNDMgMzYuMzcxNCA0MC4yMjE0IDM2LjE3ODZaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfNzE4XzY1NykiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl83MThfNjU3IiB4MT0iMTciIHkxPSI0OSIgeDI9IjQ5LjM0NTIiIHkyPSIxNy4zNTI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQjcwOTkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjBBQjEzIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==");
    transform: rotate(90deg);
    opacity: 1;
  }

  98% {
      /*  whatsapp */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NSA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ0LjIwNzEgMjEuNjVDNDEuMjE0MyAxOC42NSAzNy4yMjg2IDE3IDMyLjk5MjkgMTdDMjQuMjUgMTcgMTcuMTM1NyAyNC4xMTQzIDE3LjEzNTcgMzIuODU3MUMxNy4xMzU3IDM1LjY1IDE3Ljg2NDMgMzguMzc4NiAxOS4yNSA0MC43ODU3TDE3IDQ5TDI1LjQwNzEgNDYuNzkyOUMyNy43MjE0IDQ4LjA1NzEgMzAuMzI4NiA0OC43MjE0IDMyLjk4NTcgNDguNzIxNEgzMi45OTI5QzQxLjcyODYgNDguNzIxNCA0OSA0MS42MDcxIDQ5IDMyLjg2NDNDNDkgMjguNjI4NiA0Ny4yIDI0LjY1IDQ0LjIwNzEgMjEuNjVaTTMyLjk5MjkgNDYuMDVDMzAuNjIxNCA0Ni4wNSAyOC4zIDQ1LjQxNDMgMjYuMjc4NiA0NC4yMTQzTDI1LjggNDMuOTI4NkwyMC44MTQzIDQ1LjIzNTdMMjIuMTQyOSA0MC4zNzE0TDIxLjgyODYgMzkuODcxNEMyMC41MDcxIDM3Ljc3MTQgMTkuODE0MyAzNS4zNSAxOS44MTQzIDMyLjg1NzFDMTkuODE0MyAyNS41OTI5IDI1LjcyODYgMTkuNjc4NiAzMyAxOS42Nzg2QzM2LjUyMTQgMTkuNjc4NiAzOS44Mjg2IDIxLjA1IDQyLjMxNDMgMjMuNTQyOUM0NC44IDI2LjAzNTcgNDYuMzI4NiAyOS4zNDI5IDQ2LjMyMTQgMzIuODY0M0M0Ni4zMjE0IDQwLjEzNTcgNDAuMjU3MSA0Ni4wNSAzMi45OTI5IDQ2LjA1Wk00MC4yMjE0IDM2LjE3ODZDMzkuODI4NiAzNS45Nzg2IDM3Ljg3ODYgMzUuMDIxNCAzNy41MTQzIDM0Ljg5MjlDMzcuMTUgMzQuNzU3MSAzNi44ODU3IDM0LjY5MjkgMzYuNjIxNCAzNS4wOTI5QzM2LjM1NzEgMzUuNDkyOSAzNS42IDM2LjM3ODYgMzUuMzY0MyAzNi42NUMzNS4xMzU3IDM2LjkxNDMgMzQuOSAzNi45NSAzNC41MDcxIDM2Ljc1QzMyLjE3ODYgMzUuNTg1NyAzMC42NSAzNC42NzE0IDI5LjExNDMgMzIuMDM1N0MyOC43MDcxIDMxLjMzNTcgMjkuNTIxNCAzMS4zODU3IDMwLjI3ODYgMjkuODcxNEMzMC40MDcxIDI5LjYwNzEgMzAuMzQyOSAyOS4zNzg2IDMwLjI0MjkgMjkuMTc4NkMzMC4xNDI5IDI4Ljk3ODYgMjkuMzUgMjcuMDI4NiAyOS4wMjE0IDI2LjIzNTdDMjguNyAyNS40NjQzIDI4LjM3MTQgMjUuNTcxNCAyOC4xMjg2IDI1LjU1NzFDMjcuOSAyNS41NDI5IDI3LjYzNTcgMjUuNTQyOSAyNy4zNzE0IDI1LjU0MjlDMjcuMTA3MSAyNS41NDI5IDI2LjY3ODYgMjUuNjQyOSAyNi4zMTQzIDI2LjAzNTdDMjUuOTUgMjYuNDM1NyAyNC45Mjg2IDI3LjM5MjkgMjQuOTI4NiAyOS4zNDI5QzI0LjkyODYgMzEuMjkyOSAyNi4zNSAzMy4xNzg2IDI2LjU0MjkgMzMuNDQyOUMyNi43NDI5IDMzLjcwNzEgMjkuMzM1NyAzNy43MDcxIDMzLjMxNDMgMzkuNDI4NkMzNS44Mjg2IDQwLjUxNDMgMzYuODE0MyA0MC42MDcxIDM4LjA3MTQgNDAuNDIxNEMzOC44MzU3IDQwLjMwNzEgNDAuNDE0MyAzOS40NjQzIDQwLjc0MjkgMzguNTM1N0M0MS4wNzE0IDM3LjYwNzEgNDEuMDcxNCAzNi44MTQzIDQwLjk3MTQgMzYuNjVDNDAuODc4NiAzNi40NzE0IDQwLjYxNDMgMzYuMzcxNCA0MC4yMjE0IDM2LjE3ODZaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfNzE4XzY1NykiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl83MThfNjU3IiB4MT0iMTciIHkxPSI0OSIgeDI9IjQ5LjM0NTIiIHkyPSIxNy4zNTI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQjcwOTkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjBBQjEzIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==");
    transform: rotate(0deg);
    opacity: 0;
  }

  99.999% {
      /* phone1 */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDQ4QzIzLjE2MzQgNDggMTYgNDAuODM2NiAxNiAzMkMxNiAyMy4xNjM0IDIzLjE2MzQgMTYgMzIgMTZDNDAuODM2NiAxNiA0OCAyMy4xNjM0IDQ4IDMyQzQ4IDQwLjgzNjYgNDAuODM2NiA0OCAzMiA0OFpNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NSAzNi43MDIxQzI3LjI5OSAzNi43MDk2IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUyIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl83MjFfNTU2KSIvPgo8cGF0aCBkPSJNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NiAzNi43MDIxQzI3LjI5OSAzNi43MDk3IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUzIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMuNCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzcyMV81NTYiIHgxPSIxNiIgeTE9IjQ4IiB4Mj0iNDguMzQ1MiIgeTI9IjE2LjM1MjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZCNzA5OSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGMEFCMTMiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K");
    transform: rotate(90deg);
    opacity: 0;
  }

  100% {
      /* phone1 */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDQ4QzIzLjE2MzQgNDggMTYgNDAuODM2NiAxNiAzMkMxNiAyMy4xNjM0IDIzLjE2MzQgMTYgMzIgMTZDNDAuODM2NiAxNiA0OCAyMy4xNjM0IDQ4IDMyQzQ4IDQwLjgzNjYgNDAuODM2NiA0OCAzMiA0OFpNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NSAzNi43MDIxQzI3LjI5OSAzNi43MDk2IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUyIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl83MjFfNTU2KSIvPgo8cGF0aCBkPSJNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NiAzNi43MDIxQzI3LjI5OSAzNi43MDk3IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUzIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMuNCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzcyMV81NTYiIHgxPSIxNiIgeTE9IjQ4IiB4Mj0iNDguMzQ1MiIgeTI9IjE2LjM1MjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZCNzA5OSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGMEFCMTMiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K");
    transform: rotate(90deg);
    opacity: 1;
  }
}

@keyframes rotation-bg2 {
  0%, 15% {
    /* chat */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NSA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI4LjQ5OTYgNDIuOTY2M1Y0MS40NjYzSDI2Ljk5OTZIMjAuOTk5OEMxOS42MDQ5IDQxLjQ2NjMgMTguNSA0MC4zNjc5IDE4LjUgMzkuMDAxOVYyMC45NjQ0QzE4LjUgMTkuNjQxIDE5LjYxODkgMTguNSAyMC45OTk4IDE4LjVINDQuOTk4OUM0Ni40MTk4IDE4LjUgNDcuNDk5MiAxOS42MjggNDcuNSAyMC45NjUyVjM5LjAwMTlDNDcuNSA0MC4zMjUyIDQ2LjM4MTEgNDEuNDY2MyA0NS4wMDAyIDQxLjQ2NjNIMzYuMDAwNUgzNS40OTg0TDM1LjA5NzUgNDEuNzY4NkwyOC40OTk2IDQ2Ljc0MzNWNDIuOTY2M1oiIHN0cm9rZT0idXJsKCNwYWludDBfbGluZWFyXzcxOV81ODMpIiBzdHJva2Utd2lkdGg9IjMiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl83MTlfNTgzIiB4MT0iMTciIHkxPSI0OSIgeDI9IjQ5LjM0NTIiIHkyPSIxNy4zNTI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQjcwOTkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjBBQjEzIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==");
    transform: rotate(180deg);
    opacity: 0;
  }

  20%, 35% {
      /* chat */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NSA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI4LjQ5OTYgNDIuOTY2M1Y0MS40NjYzSDI2Ljk5OTZIMjAuOTk5OEMxOS42MDQ5IDQxLjQ2NjMgMTguNSA0MC4zNjc5IDE4LjUgMzkuMDAxOVYyMC45NjQ0QzE4LjUgMTkuNjQxIDE5LjYxODkgMTguNSAyMC45OTk4IDE4LjVINDQuOTk4OUM0Ni40MTk4IDE4LjUgNDcuNDk5MiAxOS42MjggNDcuNSAyMC45NjUyVjM5LjAwMTlDNDcuNSA0MC4zMjUyIDQ2LjM4MTEgNDEuNDY2MyA0NS4wMDAyIDQxLjQ2NjNIMzYuMDAwNUgzNS40OTg0TDM1LjA5NzUgNDEuNzY4NkwyOC40OTk2IDQ2Ljc0MzNWNDIuOTY2M1oiIHN0cm9rZT0idXJsKCNwYWludDBfbGluZWFyXzcxOV81ODMpIiBzdHJva2Utd2lkdGg9IjMiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl83MTlfNTgzIiB4MT0iMTciIHkxPSI0OSIgeDI9IjQ5LjM0NTIiIHkyPSIxNy4zNTI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQjcwOTkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjBBQjEzIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==");
    transform: rotate(90deg);
    opacity: 1;
  }

  39% {
      /* chat */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NSA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI4LjQ5OTYgNDIuOTY2M1Y0MS40NjYzSDI2Ljk5OTZIMjAuOTk5OEMxOS42MDQ5IDQxLjQ2NjMgMTguNSA0MC4zNjc5IDE4LjUgMzkuMDAxOVYyMC45NjQ0QzE4LjUgMTkuNjQxIDE5LjYxODkgMTguNSAyMC45OTk4IDE4LjVINDQuOTk4OUM0Ni40MTk4IDE4LjUgNDcuNDk5MiAxOS42MjggNDcuNSAyMC45NjUyVjM5LjAwMTlDNDcuNSA0MC4zMjUyIDQ2LjM4MTEgNDEuNDY2MyA0NS4wMDAyIDQxLjQ2NjNIMzYuMDAwNUgzNS40OTg0TDM1LjA5NzUgNDEuNzY4NkwyOC40OTk2IDQ2Ljc0MzNWNDIuOTY2M1oiIHN0cm9rZT0idXJsKCNwYWludDBfbGluZWFyXzcxOV81ODMpIiBzdHJva2Utd2lkdGg9IjMiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl83MTlfNTgzIiB4MT0iMTciIHkxPSI0OSIgeDI9IjQ5LjM0NTIiIHkyPSIxNy4zNTI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQjcwOTkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjBBQjEzIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==");
    transform: rotate(0deg);
    opacity: 0;
  }

  40%, 54% {
    /* VK */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NSA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDIzSDIxLjQ3NjhDMjEuNjU2NyAzMi4xNjY1IDI1LjY5NDQgMzYuMDQ4NSAyOC44OTI3IDM2Ljg0OTRWMjNIMzQuMDQ5NFYzMC45MDg5QzM3LjIwNyAzMC41Njc5IDQwLjUyNTIgMjYuOTY1NyA0MS42NDQxIDIzLjAwMzJINDYuODAwOEM0Ni4zNzk2IDI1LjA1OSA0NS41MzkxIDI3LjAwNTcgNDQuMzMxOSAyOC43MjEzQzQzLjEyNDcgMzAuNDM2OSA0MS41NzY5IDMxLjg4NDYgMzkuNzg1MyAzMi45NzM3QzQxLjc4NSAzMy45NjggNDMuNTUxMyAzNS4zNzU4IDQ0Ljk2NzMgMzcuMTA0MkM0Ni4zODM0IDM4LjgzMjUgNDcuNDE3IDQwLjg0MiA0OCA0M0g0Mi4zMjUxQzQxLjgwMTcgNDEuMTI1NiA0MC43MzcyIDM5LjQ0NzcgMzkuMjY1MiAzOC4xNzY3QzM3Ljc5MzIgMzYuOTA1NyAzNS45NzkgMzYuMDk4MyAzNC4wNTA1IDM1Ljg1NTVWNDNIMzMuNDMwNUMyMi40OTUxIDQyLjk5MjUgMTYuMjU5MSAzNS40ODc4IDE2IDIzWiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzcxOV81NjkpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNzE5XzU2OSIgeDE9IjE2IiB5MT0iNDMiIHgyPSIzNC4zNDY4IiB5Mj0iMTQuMjc4NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkI3MDk5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0YwQUIxMyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=");
    transform: rotate(180deg);
    opacity: 0;
  }

  60%, 75% {
      /* VK */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NSA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDIzSDIxLjQ3NjhDMjEuNjU2NyAzMi4xNjY1IDI1LjY5NDQgMzYuMDQ4NSAyOC44OTI3IDM2Ljg0OTRWMjNIMzQuMDQ5NFYzMC45MDg5QzM3LjIwNyAzMC41Njc5IDQwLjUyNTIgMjYuOTY1NyA0MS42NDQxIDIzLjAwMzJINDYuODAwOEM0Ni4zNzk2IDI1LjA1OSA0NS41MzkxIDI3LjAwNTcgNDQuMzMxOSAyOC43MjEzQzQzLjEyNDcgMzAuNDM2OSA0MS41NzY5IDMxLjg4NDYgMzkuNzg1MyAzMi45NzM3QzQxLjc4NSAzMy45NjggNDMuNTUxMyAzNS4zNzU4IDQ0Ljk2NzMgMzcuMTA0MkM0Ni4zODM0IDM4LjgzMjUgNDcuNDE3IDQwLjg0MiA0OCA0M0g0Mi4zMjUxQzQxLjgwMTcgNDEuMTI1NiA0MC43MzcyIDM5LjQ0NzcgMzkuMjY1MiAzOC4xNzY3QzM3Ljc5MzIgMzYuOTA1NyAzNS45NzkgMzYuMDk4MyAzNC4wNTA1IDM1Ljg1NTVWNDNIMzMuNDMwNUMyMi40OTUxIDQyLjk5MjUgMTYuMjU5MSAzNS40ODc4IDE2IDIzWiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzcxOV81NjkpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNzE5XzU2OSIgeDE9IjE2IiB5MT0iNDMiIHgyPSIzNC4zNDY4IiB5Mj0iMTQuMjc4NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkI3MDk5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0YwQUIxMyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=");
    transform: rotate(90deg);
    opacity: 1;
  }

  79% {
      /* VK */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NSA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDIzSDIxLjQ3NjhDMjEuNjU2NyAzMi4xNjY1IDI1LjY5NDQgMzYuMDQ4NSAyOC44OTI3IDM2Ljg0OTRWMjNIMzQuMDQ5NFYzMC45MDg5QzM3LjIwNyAzMC41Njc5IDQwLjUyNTIgMjYuOTY1NyA0MS42NDQxIDIzLjAwMzJINDYuODAwOEM0Ni4zNzk2IDI1LjA1OSA0NS41MzkxIDI3LjAwNTcgNDQuMzMxOSAyOC43MjEzQzQzLjEyNDcgMzAuNDM2OSA0MS41NzY5IDMxLjg4NDYgMzkuNzg1MyAzMi45NzM3QzQxLjc4NSAzMy45NjggNDMuNTUxMyAzNS4zNzU4IDQ0Ljk2NzMgMzcuMTA0MkM0Ni4zODM0IDM4LjgzMjUgNDcuNDE3IDQwLjg0MiA0OCA0M0g0Mi4zMjUxQzQxLjgwMTcgNDEuMTI1NiA0MC43MzcyIDM5LjQ0NzcgMzkuMjY1MiAzOC4xNzY3QzM3Ljc5MzIgMzYuOTA1NyAzNS45NzkgMzYuMDk4MyAzNC4wNTA1IDM1Ljg1NTVWNDNIMzMuNDMwNUMyMi40OTUxIDQyLjk5MjUgMTYuMjU5MSAzNS40ODc4IDE2IDIzWiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzcxOV81NjkpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNzE5XzU2OSIgeDE9IjE2IiB5MT0iNDMiIHgyPSIzNC4zNDY4IiB5Mj0iMTQuMjc4NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkI3MDk5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0YwQUIxMyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=");
    transform: rotate(0deg);
    opacity: 0;
  }

  80%, 95% {
      /* phone1 */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDQ4QzIzLjE2MzQgNDggMTYgNDAuODM2NiAxNiAzMkMxNiAyMy4xNjM0IDIzLjE2MzQgMTYgMzIgMTZDNDAuODM2NiAxNiA0OCAyMy4xNjM0IDQ4IDMyQzQ4IDQwLjgzNjYgNDAuODM2NiA0OCAzMiA0OFpNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NSAzNi43MDIxQzI3LjI5OSAzNi43MDk2IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUyIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl83MjFfNTU2KSIvPgo8cGF0aCBkPSJNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NiAzNi43MDIxQzI3LjI5OSAzNi43MDk3IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUzIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMuNCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzcyMV81NTYiIHgxPSIxNiIgeTE9IjQ4IiB4Mj0iNDguMzQ1MiIgeTI9IjE2LjM1MjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZCNzA5OSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGMEFCMTMiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K");
    transform: rotate(180deg);
    opacity: 0;
  }

  99.999% {
      /* phone1 */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDQ4QzIzLjE2MzQgNDggMTYgNDAuODM2NiAxNiAzMkMxNiAyMy4xNjM0IDIzLjE2MzQgMTYgMzIgMTZDNDAuODM2NiAxNiA0OCAyMy4xNjM0IDQ4IDMyQzQ4IDQwLjgzNjYgNDAuODM2NiA0OCAzMiA0OFpNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NSAzNi43MDIxQzI3LjI5OSAzNi43MDk2IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUyIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl83MjFfNTU2KSIvPgo8cGF0aCBkPSJNMzEuOTczIDM3Ljg4NzFDMzYuNTEwNyAzNy44ODcxIDQwLjE4OTMgMzQuOTE2OCA0MC4xODkzIDMxLjI1MjhDNDAuMTg5MyAyNy41ODg3IDM2LjUxMDcgMjQuNjE4NSAzMS45NzI5IDI0LjYxODVDMjcuNDM1MiAyNC42MTg1IDIzLjc1NjYgMjcuNTg4OCAyMy43NTY2IDMxLjI1MjhDMjMuNzU2NiAzMy40OTExIDI1LjEyOTMgMzUuNDcwNCAyNy4yMzIxIDM2LjY3MTlMMjcuMjg1NiAzNi43MDIxQzI3LjI5OSAzNi43MDk3IDI3LjMxMDcgMzYuNzIgMjcuMzE5OSAzNi43MzI1QzI3LjMyOSAzNi43NDQ5IDI3LjMzNTQgMzYuNzU5MiAyNy4zMzg1IDM2Ljc3NDNDMjcuNTE5NCAzNy42Mzg1IDI2LjMzNjEgMzguNDEzNSAyNS41NDUzIDM4LjkzMDdDMjguMTY2NSAzOS4wOTU3IDI5LjQ4OTEgMzguMDQ2MiAyOS44Njc1IDM3LjcwMjJDMzAuNTA5MiAzNy44MzIxIDMxLjI4MTQgMzcuODg3MSAzMS45NzMgMzcuODg3MVoiIGZpbGw9IndoaXRlIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMuNCIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzcyMV81NTYiIHgxPSIxNiIgeTE9IjQ4IiB4Mj0iNDguMzQ1MiIgeTI9IjE2LjM1MjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZCNzA5OSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGMEFCMTMiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K");
    transform: rotate(90deg);
    opacity: 1;
  }

  100% {
      /* chat */
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iNjUiIHZpZXdCb3g9IjAgMCA2NSA2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI4LjQ5OTYgNDIuOTY2M1Y0MS40NjYzSDI2Ljk5OTZIMjAuOTk5OEMxOS42MDQ5IDQxLjQ2NjMgMTguNSA0MC4zNjc5IDE4LjUgMzkuMDAxOVYyMC45NjQ0QzE4LjUgMTkuNjQxIDE5LjYxODkgMTguNSAyMC45OTk4IDE4LjVINDQuOTk4OUM0Ni40MTk4IDE4LjUgNDcuNDk5MiAxOS42MjggNDcuNSAyMC45NjUyVjM5LjAwMTlDNDcuNSA0MC4zMjUyIDQ2LjM4MTEgNDEuNDY2MyA0NS4wMDAyIDQxLjQ2NjNIMzYuMDAwNUgzNS40OTg0TDM1LjA5NzUgNDEuNzY4NkwyOC40OTk2IDQ2Ljc0MzNWNDIuOTY2M1oiIHN0cm9rZT0idXJsKCNwYWludDBfbGluZWFyXzcxOV81ODMpIiBzdHJva2Utd2lkdGg9IjMiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl83MTlfNTgzIiB4MT0iMTciIHkxPSI0OSIgeDI9IjQ5LjM0NTIiIHkyPSIxNy4zNTI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQjcwOTkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjBBQjEzIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==");
    transform: rotate(180deg);
    opacity: 0;
  }
}

@media screen and (min-width: 576px) {
  .dm-ins-wish-list__add2--cabinet {
    padding: 11px 9px 0 9px;
    border-bottom: none;
    font-size: 10px;
    height: 34px;
  }

  .dm-ins-wish-list__add2--cabinet:before {
    background-color: #d0d0d0;
    position: absolute;
    left: 0;
    top: 12px;
    height: 20px;
    width: 2px;
    content: '';
    opacity: 0.5;
  }

  .dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__title {
    font-size: 10px;
    color: #9b9b9b;
    font-weight: 500;
    display: none;
  }

  .container-topside .dm-ins-wish-list__add2--cabinet {
    display: block;
  }
}

@media screen and (min-width: 769px) {
  .dm-ins-wish-list__tour {
    width: 55.5em;
    padding: 0;
    border-radius: 1.25em;
    margin: 0;
  }

  .dm-ins-wish-list__tour + .dm-ins-wish-list__tour {
    margin-top: 0.75em;
  }

  .dm-ins-wish-list__inner {
    display: flex;
  }

  .dm-ins-wish-list__row--1 {
    width: 17.875em;
    max-width: 17.875em;
    min-width: 17.875em;
    flex: 0 0 17.875em;
  }

  .dm-ins-wish-list__row--2 {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: 1.25em;
  }

  .dm-ins-wish-list__row--3 {
    flex: 0 0 15.5em;
    width: 15.5em;
    max-width: 15.5em;
    min-width: 15.5em;
    display: flex;
    flex-direction: column;
    padding: 1em 1.25em;
    justify-content: space-between;
  }

  .dm-ins-wish-list__img-wrap {
    margin-bottom: 0;
    width: 17.875em;
    height: 100%;
    min-height: 11.125em;
    position: relative;
    overflow: hidden;
    border-radius: 1.25em;
  }

  .dm-ins-wish-list__img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 17.875em;
    height: 100%;
    border-radius: 0em;
  }

  .dm-ins-wish-list__rating {
    justify-content: start;
    margin-bottom: 1em;
  }

  .dm-ins-wish-list__rating-item {
    width: 1.0625em;
    height: 1em;
    margin: 0 0.375em 0 0;
  }

  .dm-ins-wish-list__rating-text {
    font-size: 1.25em;
    line-height: 0.8em;
  }

  .dm-ins-wish-list__title {
    font-size: 1.25em;
    line-height: 1.2em;
    padding: 0;
    text-align: left;
    margin-bottom: 0;
  }

  .dm-ins-wish-list__location {
    font-size: 1em;
    line-height: 1.5em;
    padding: 0.75em 0 0 0;
    text-align: left;
    margin-bottom: 0;
  }

  .dm-ins-wish-list__seen {
    font-size: 0.75em;
    line-height: 1.166666666666667em;
    text-align: left;
    padding: 0;
    margin: auto 0 0 0;
    order: 10;
    display: block;
  }

  .dm-ins-wish-list__note {
    font-size: 0.75em;
    line-height: 1.166666666666667em;
    text-align: left;
    padding: 0;
    margin: auto 0 0 0;
    order: 10;
  }

  .dm-ins-wish-list__nights {
    font-size: 0.75em;
    line-height: 1.166666666666667em;
    text-align: left;
    margin-bottom: 1em;
  }

  .dm-ins-wish-list__price {
    font-size: 1.5em;
    line-height: 1.208333333333333em;
    text-align: left;
    margin-bottom: 0.5em;
  }

  .dm-ins-wish-list__btn-wrap {
    text-align: left;
    margin-bottom: 0;
  }

  .dm-ins-wish-list__btn {
    width: 100%;
    font-size: 1.25em !important;
    line-height: 1.2em !important;
    min-height: 2em;
    min-width: 0;
  }

  .dm-ins-wish-list__del-wrap {
    order: -1;
    text-align: right;
    margin-bottom: 0.75em;
  }

  .dm-ins-wish-list__del-title {
    font-size: 0.875em;
  }

  .dm-ins-wish-list__del-img {
    width: 0.875em;
    height: 0.875em;
    margin-left: 0.625em;
  }

  .dm-ins-wish-list__add-wrap {
    order: -1;
    text-align: right;
    margin-bottom: 0.75em;
    text-align: left;
  }

  .dm-ins-wish-list__add-title {
    font-size: 0.75em;
    line-height: 1.166666666666667em;
  }

  .dm-ins-wish-list__add-amount {
    font-size: 0.875em;
    line-height: 1.214285714285714em;
  }

  .dm-ins-wish-list__add-svg {
    width: 1.1875em;
    margin-right: 0.5em;
  }

  .dm-ins-wish-list__popup .dm-popover__close {
    width: 1.875em;
    height: 1.875em;
    top: 1.5em;
    right: 1.5em;
  }

  .dm-ins-wish-list__popup__title {
    font-size: 2em;
    line-height: 1.125em;
    margin-bottom: 0.75em;
  }

  .dm-ins-wish-list__popup__title__span {
    text-align: left;
    margin-bottom: 0.5em;
  }

  .dm-ins-wish-list__popup__title__span--delete {
    align-self: flex-end;
  }

  .dm-ins-wish-list__popup__title--resent {
    margin-bottom: 0.75em;
  }

  .dm-ins-wish-list__slider-wrap {
    padding: 1.5em;
    width: auto;
  }

  .dm-ins-wish-list__slider.owl-carousel {
    display: block;
  }

  .dm-ins-wish-list__timer-wrap {
    padding: 1.125em 1.75em;
  }

  .dm-ins-wish-list__timer__item {
    width: 2.25em;
  }

  .dm-ins-wish-list__timer__item + .dm-ins-wish-list__timer__item {
    margin-left: 1.5em;
  }

  .dm-ins-wish-list__timer__item__num {
    font-size: 2em;
    line-height: 1.1875em;
  }

  .dm-ins-wish-list__timer__item__unit {
    font-size: 0.75em;
    line-height: 1.166666666666667em;
  }

  .dm-ins-wish-list__timer__text {
    font-size: 1.125em;
    line-height: 1.222222222222222em;
    width: 14.444444444444445em;
  }

  .dm-ins-wish-list__sm-hidden {
    display: block !important;
  }

  .dm-ins-wish-list__lg-hidden {
    display: none !important;
  }
}

@media screen and (min-width: 1006px) {
  .dm-ins-wish-list__add2__amount--1:before {
    white-space: nowrap;
  }

  .contentheader>.row {
    flex-wrap: nowrap;
  }
}

@media screen and (min-width: 1007px) {
  .dm-ins-wish-list__add2__btn {
    margin-right: 26px;
  }

  .dm-ins-wish-list__add2__svg {
    margin-right: 10px;
  }

  .dm-ins-wish-list__add2__amount--1 {
    margin-right: 0.4em;
  }

  .dm-ins-wish-list__add2__amount--1:before {
    content: attr(data-text-empty);
  }

  .dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__title {
    display: block;
  }

  .dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__svg {
    transform: scale(0.8);
  }

  .dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__svg path {
    stroke: #9b9b9b;
  }

  .dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__added .dm-ins-wish-list__add2__svg path,
  .dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__btn--has-amount .dm-ins-wish-list__add2__svg path {
    stroke: #de0000;
  }

  .dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__added .dm-ins-wish-list__add2__title:hover,
  .dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__btn--has-amount .dm-ins-wish-list__add2__title:hover {
    color: #000;
  }

  .dm-ins-wish-list__add2--added .dm-ins-wish-list__add2__svg path {
    stroke: #de0000;
  }

  .dm-ins-wish-list__add2--added .dm-ins-wish-list__add2__amount--1:before {
    content: attr(data-text-has);
  }

  .dm-ins-wish-list__add--added .dm-ins-wish-list__add-svg path {
    stroke: #de0000;
  }
}

@media screen and (min-width: 1200px) {
  .dm-ins-wish-list__add2--cabinet {
    height: 39px;
    padding: 12px 13.5px 0 13.5px;
  }

  .dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__title {
    font-size: 12px;
  }

  .dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__svg {
    transform: scale(1);
    margin-right: 8px;
  }
}

@media all and (min-width: 1440px) {
  .dm-ins-wish-list__font-size {
    font-size: 16px;
  }

  .dm-ins-wish-list__add2 {
    font-size: 16px;
  }

  .dm-ins-wish-list__popup {
    font-size: 16px;
  }

  .dm-ins-wish-list__popup .dm-popover__body {
    font-size: 16px;
  }
}

@media screen and (max-width: 1440px) {
  .hoteldetailpage .contentheader .hoteltitlesub {
    flex-direction: column;
  }

  .hoteldetailpage .contentheader .hoteltitlesub .eliteicon {
    justify-content: flex-start !important;
    margin-top: 16px;
  }
}

@media screen and (max-width: 1439px) {
  .dm-ins-wish-list__font-size {
    font-size: 13.197080291970803px;
  }

  .dm-ins-wish-list__add2 {
    font-size: 13.197080291970803px;
  }

  .dm-ins-wish-list__popup {
    font-size: 13.197080291970803px;
  }

  .dm-ins-wish-list__popup .dm-popover__body {
    font-size: 13.197080291970803px;
  }
}

@media screen and (max-width: 1199px) {
  .dm-ins-wish-list__font-size {
    font-size: 1.142857142857143vw;
  }

  .dm-ins-wish-list__add2 {
    font-size: 1.142857142857143vw;
  }

  .dm-ins-wish-list__popup {
    font-size: 1.142857142857143vw;
  }

  .dm-ins-wish-list__popup .dm-popover__body {
    font-size: 1.142857142857143vw;
  }
}

@media screen and (max-width: 1007px) {
  .dm-ins-wish-list__add2--istour .dm-ins-wish-list__add2__amount.dm-ins-wish-list__add2__amount--1 {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .dm-ins-wish-list__font-size {
    font-size: 2.222222222222222vw;
  }

  .dm-ins-wish-list__add2 {
    font-size: 2.083333333333333vw;
  }

  .dm-ins-wish-list__popup {
    font-size: 2.222222222222222vw;
  }

  .dm-ins-wish-list__popup .dm-popover__body {
    font-size: 2.222222222222222vw;
  }
}

@media (max-width: 575px) {
  .ins-dm-panel__wishlist,
  .ins-dm-panel__resent,
  .ins-dm-panel__jivo {
    display: none !important;
  }

  body jdiv[class*=__jivoMobileButton][class*=_orientationRight_],
  body jdiv[class*=__jivoDesktopButton][class*=_orientationRight_] {
    margin-bottom: 20vw !important;
  }

  body jdiv[class*=__jivoMobileButton] jdiv[class*=button_],
  body jdiv[class*=__jivoDesktopButton] jdiv[class*=button_] {
    margin-bottom: 0 !important;
    margin: 0 3vw 0 0 !important;
    border-radius: 4vw !important;
    width: 14vw;
    height: 14vw;
  }
}

@media (max-width: 440px) {
  .ins-dm-panel__note {
    font-size: 0.6em;
  }
}
</style>
    `;
$('body').append(defaultStyles);

/* wishlist start */
/* wishlist global flags */
var isInsertHtml = false;
var isInsertShare = false;
var isInsertFavoriteBtnHtml = false;
var isPopup = false;
/* wishlist global flags end */

/* wishlist html for insert */
var HOTEL_ADD_BTN_HTML = `<div class="dm-ins-wish-list__add2 dm-ins-wish-list__add2--istour">
                                <div class="dm-ins-wish-list__add2__btn">
                                    <div class="dm-ins-wish-list__add2__icon js--add-to-wishlist">
                                        <svg class="dm-ins-wish-list__add2__svg" width="26" height="21">
                                            <path d="M14.9454 1.55953L15.0224 1.5716H15.023C17.1853 1.9514 18.6981 3.72284 18.6981 5.72545V5.93973C18.6981 7.16035 18.163 8.34117 17.2024 9.19058L17.2013 9.19156L10.2497 15.3564L10.2471 15.3587C10.1461 15.4489 10.0033 15.5057 9.84905 15.5057C9.69483 15.5057 9.55199 15.4489 9.45101 15.3587L9.44841 15.3564L2.49682 9.19156L2.49573 9.19058C1.53508 8.34117 1 7.16035 1 5.93973V5.72545C1 3.69831 2.54903 1.90602 4.74771 1.5594L4.74771 1.55941L4.75299 1.55855C6.17045 1.32731 7.67342 1.78164 8.68849 2.75494L8.68849 2.75495L8.69182 2.75812L9.15449 3.19768L9.87065 3.87806L10.5598 3.17029L10.9693 2.74963C12.0299 1.77472 13.4997 1.33287 14.9454 1.55953Z" stroke="#0093D0" stroke-width="2"></path>
                                        </svg>
                                    </div>
                                    <div class="dm-ins-wish-list__add2__title">
                                        <div class="dm-ins-wish-list__add2__amount dm-ins-wish-list__add2__amount--1 js--add-to-wishlist" data-text-empty="Добавить в избранное" data-text-has="В избранном "></div>
                                        <div class="dm-ins-wish-list__add2__amount dm-ins-wish-list__add2__amount--2" data-amount="(0)"></div>
                                    </div>
                                </div>
                                <div class="dm-ins-wish-list__add2__msg">
                                    <div class="dm-ins-wish-list__add2__msg-title">Отель добавлен в избранное</div>
                                    <a class="dm-ins-wish-list__add2__msg-btn js--show-wishlist" href="#dm-ins-wish-list__add2-show">Смотреть</a>
                                </div>
                            </div>`;
var HOTEL_SHARE_SVG_HTML = `<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5.0909" cy="10.8182" r="3.45455" stroke="#0093D0" stroke-width="2"/><circle cx="16.5455" cy="4.45455" r="3.45455" stroke="#0093D0" stroke-width="2"/><circle cx="16.5455" cy="16.5455" r="3.45455" stroke="#0093D0" stroke-width="2"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4064 14.3234C13.237 14.6313 12.85 14.7435 12.5421 14.5741L8.83531 12.5346C8.52739 12.3651 8.41512 11.9782 8.58454 11.6703C8.75397 11.3623 9.14093 11.2501 9.44885 11.4195L13.1556 13.459C13.4635 13.6285 13.5758 14.0154 13.4064 14.3234Z" fill="#0093D0"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4064 6.74879C13.237 6.44087 12.85 6.3286 12.5421 6.49802L8.83531 8.53757C8.52739 8.707 8.41512 9.09396 8.58454 9.40188C8.75397 9.7098 9.14093 9.82208 9.44885 9.65265L13.1556 7.6131C13.4635 7.44368 13.5758 7.05671 13.4064 6.74879Z" fill="#0093D0"/></svg>`;

var HOTEL_WISHLIST_BTN_CABINET_HTML = `
<div class="dm-ins-wish-list__add2 dm-ins-wish-list__add2--cabinet">
    <div class="dm-ins-wish-list__add2__btn">
        <div class="dm-ins-wish-list__add2__icon">
            <svg class="dm-ins-wish-list__add2__svg" width="26" height="21">
                <path d="M14.9454 1.55953L15.0224 1.5716H15.023C17.1853 1.9514 18.6981 3.72284 18.6981 5.72545V5.93973C18.6981 7.16035 18.163 8.34117 17.2024 9.19058L17.2013 9.19156L10.2497 15.3564L10.2471 15.3587C10.1461 15.4489 10.0033 15.5057 9.84905 15.5057C9.69483 15.5057 9.55199 15.4489 9.45101 15.3587L9.44841 15.3564L2.49682 9.19156L2.49573 9.19058C1.53508 8.34117 1 7.16035 1 5.93973V5.72545C1 3.69831 2.54903 1.90602 4.74771 1.5594L4.74771 1.55941L4.75299 1.55855C6.17045 1.32731 7.67342 1.78164 8.68849 2.75494L8.68849 2.75495L8.69182 2.75812L9.15449 3.19768L9.87065 3.87806L10.5598 3.17029L10.9693 2.74963C12.0299 1.77472 13.4997 1.33287 14.9454 1.55953Z" stroke="#0093D0" stroke-width="2"></path>
            </svg>
        </div>
        <div class="dm-ins-wish-list__add2__title">
            <div class="dm-ins-wish-list__add2__amount dm-ins-wish-list__add2__amount--3" data-text-empty="Избранное" data-text-has="Избранное"></div>
            <div class="dm-ins-wish-list__add2__amount dm-ins-wish-list__add2__amount--2" data-amount="(0)"></div>
        </div>
    </div>
</div>
`;
var HOTEL_WISHLIST_TIMER_HTML = `
<div class="dm-ins-wish-list__timer-wrap">
<div class="dm-ins-wish-list__timer__text">Добавленные&nbsp;отели<br>сохраняются в&nbsp;разделе&nbsp;<b>3&nbsp;дня</b></div>
<div class="dm-ins-wish-list__timer">
<div class="dm-ins-wish-list__timer__item">
<div class="dm-ins-wish-list__timer__item__num">%days%</div>
<div class="dm-ins-wish-list__timer__item__unit">%DAYS%</div>
</div>
<div class="dm-ins-wish-list__timer__item">
<div class="dm-ins-wish-list__timer__item__num">%hours%</div>
<div class="dm-ins-wish-list__timer__item__unit">%HOURS%</div>
</div>
<div class="dm-ins-wish-list__timer__item">
<div class="dm-ins-wish-list__timer__item__num">%minuts%</div>
<div class="dm-ins-wish-list__timer__item__unit">%MINUTS%</div>
</div>
<div class="dm-ins-wish-list__timer__item">
<div class="dm-ins-wish-list__timer__item__num">%seconds%</div>
<div class="dm-ins-wish-list__timer__item__unit">%SECONDS%</div>
</div>
</div>
</div>
`;

/* wishlist html for insert end */


(function () {
    (function ($, window) {
        var Plugin, defaults, locales, pluginName;
        pluginName = 'timer';
        locales = {
            ru: {
                days: ['день', 'дня', 'дней'],
                hours: ['час', 'часа', 'часов'],
                minuts: ['минута', 'минуты', 'минут'],
                seconds: ['секунда', 'секунды', 'секунд']
            },
            eng: {
                days: ['day', 'days', 'days'],
                hours: ['hour', 'hours', 'hours'],
                minuts: ['minut', 'minuts', 'minuts'],
                seconds: ['second', 'seconds', 'seconds']
            }
        };
        defaults = {
            lang: 'ru',
            updateTime: 1000,
            onEnd: $.noop
        };
        Plugin = (function () {
            function Plugin(el, options) {
                this.el = el;
                this.$el = $(this.el);
                $.extend(this, defaults, this.$el.data(), options);
                if (!this.locale) {
                    this.locale = locales[this.lang];
                }
                this.startDate = new Date();
                this.template = this.$el.html();
                if (Object.prototype.toString.call(this.endDate) !== '[object Date]') {
                    this.endDate = this.parseDate(this.endDate, this.dateFormat);
                }
                this.start();
            }

            Plugin.prototype.parseDate = function (str, format) {
                var data, now;
                str = str + '';
                str = str.split(/[^\d]/g);
                format = format + '';
                format = format.split(/[^%yMdhms]/g);
                now = new Date();
                data = {
                    y: now.getFullYear(),
                    M: now.getMonth() + 1,
                    d: now.getDate(),
                    h: 0,
                    m: 0,
                    s: 0
                };

                format.forEach(function (val, index) {
                    var key;
                    key = val.slice(1);
                    return data[key] = str[index];
                });
                return new Date(data.y, data.M - 1, data.d, data.h, data.m, data.s);
            };

            Plugin.prototype.start = function () {
                this.interval = setInterval((function (_this) {
                    return function () {
                        return _this.update();
                    };
                })(this), this.updateTime);
                return this.update();
            };

            Plugin.prototype.end = function () {
                clearInterval(this.interval);
                this.$el.trigger("" + pluginName + ":stop");
                return this.onEnd();
            };

            Plugin.prototype.update = function () {
                var days, devider, hours, minuts, now, range, seconds;
                now = new Date();
                range = this.endDate - now;
                if (range <= 0) {
                    this.end();
                    return;
                }
                devider = 1000 * 60 * 60 * 24;
                days = Math.floor(range / devider);
                range = range - days * devider;
                devider = 1000 * 60 * 60;
                hours = Math.floor(range / devider);
                range = range - hours * devider;
                devider = 1000 * 60;
                minuts = Math.floor(range / devider);
                range = range - minuts * devider;
                devider = 1000;
                seconds = Math.floor(range / devider);
                return this.render({
                    days: days,
                    hours: hours,
                    minuts: minuts,
                    seconds: seconds
                }), this.circle(seconds, 60, 'seconds'), this.circle(minuts, 60, 'minuts'), this.circle(hours, 24, 'hours'), this.circle(days, 21, 'days');
            };

            Plugin.prototype.circle = function (key, value, type) {

                // var progressBarSecond = this.$el.prev().find('.timer__circle-second .timer__circle-path'),
                //     progressBarMinut = this.$el.prev().find('.timer__circle-minut .timer__circle-path'),
                //     progressBarHour = this.$el.prev().find('.timer__circle-hour .timer__circle-path'),
                //     progressBarDay = this.$el.prev().find('.timer__circle-day .timer__circle-path'),
                //     pathAmount = 36,
                //     progressBar,
                //     kcoefficient;

                // kcoefficient = Math.ceil( pathAmount * key / value );

                // if( type == 'seconds'){
                //     progressBar = progressBarSecond;
                // }
                // else if(type == 'minuts'){
                //     progressBar = progressBarMinut;
                // }
                // else if(type == 'hours'){
                //     progressBar = progressBarHour;
                // }
                // else {
                //     progressBar = progressBarDay;
                // };

                // function update_circle(){
                //     progressBar.addClass('timer__circle-path-active');
                //     progressBar.each(function(){
                //         var $bar = $(this),
                //             barIndex = $bar.index();
                //         if( barIndex < progressBar.length && barIndex >= kcoefficient ){
                //             $bar.removeClass('timer__circle-path-active');
                //         }
                //     });
                // }
                // update_circle();

            };

            Plugin.prototype.render = function (data) {

                var html;
                html = this.template;

                $.each(this.locale, (function (_this) {
                    return function (key, values) {
                        return html = html.replace(new RegExp('%' + key + '%', 'g'), _this.leadingZero(data[key])).replace(new RegExp('%' + key.toUpperCase() + '%', 'g'), _this.spellCount(data[key], values));
                    };
                })(this));
                return this.$el.html(html);
            };

            Plugin.prototype.spellCount = function (num, variants) {
                if ($.isArray(variants)) {
                    if (num % 10 === 1 && num % 100 !== 11) {
                        return variants[0];
                    } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
                        return variants[1];
                    } else {
                        return variants[2];
                    }
                } else {
                    return variants;
                }
            };

            Plugin.prototype.leadingZero = function (num) {
                var result = '';

                if (num < 10) {
                    num = '0' + num;
                }
                ;
                num = num + '';

                for (var i = 0; i < num.length; i++) {
                    result += '<span>' + num[i] + '</span>';
                }
                ;

                return result;
            };

            return Plugin;

        })();
        return $.fn[pluginName] = function (options) {
            return this.each(function () {
                if (!$.data(this, pluginName)) {
                    return $.data(this, pluginName, new Plugin(this, options));
                }
            });
        };
    })(jQuery, window);

}).call(this);

/* wishlist functions */
var sortByHeight = function (a, b) {
    var a = $(a).attr('data-wishlist-price');
    var b = $(b).attr('data-wishlist-price');
    console.log(a)
    console.log(b)
    return a > b ? 1 : -1;
};

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('.');
}

function byField(field) {
    return (a, b) => parseInt(a[field]) > parseInt(b[field]) ? 1 : -1;
}

function getHotelPrice(prices) {
    var arr1 = prices;
    var arr2 = [];
    arr1.each(function () {
        var $this = $(this);
        var $num = $this.text().trim();
        var $order = $this.css('order');
        var $width = $this.width();

        if ($width > 1 && $order < 20) {
            var number = {
                order: $order,
                num: $num,
            };
            arr2.push(number);
        }
    });
    arr2.sort(byField('order'));
    var price = '';
    for (var i = 0; i < arr2.length; i++) {
        price += arr2[i].num.toString();
    }
    return price;
}

function getCurrentHotel(hotelSelector) {
    var $hotel = $(hotelSelector);

    if ($hotel.length) {
        var hotelId = $hotel.find('h1[data-hotelid]').data('hotelid') || false;
        var hotelName = $hotel.find('h1[data-hotelid]').text().trim() || false;
        var hotelUrl = document.location.href || false;
        var hotelImg = $hotel.find('.gallery-layout > img').attr('src');
        var hotelImgDefault = '//cdn.coral.ru/content/insider/russia/abandoned_cart/default.jpg';
        var hotelRating = $hotel.find('h1[data-hotelid]').next().find('.material-icons').length || 0;
        var hotelAddedDate = new Date();
        var hotelDateOfFlight = $('#departureDateRangePickerInput').val() || false;
        var hotelPrice = 0;
        var hotelParams = $('[data-module="hoteldetail"]').length ? $('[data-module="hoteldetail"]').attr('data-itemparams') : '';
        var hotelLocation = $('.hoteltitlesub .location > span').length ? $('.hoteltitlesub .location > span').text() : '';
        hotelAddedDate.setHours(0, 0, 0, 0);
        /* */
        var isHotelPage = $('.hoteldetailpage') || false;

        if (isHotelPage.length) {
            var hasPrice = $('.priceInnerWrap .price .price-big') || false;
            var $container = $('.noroomavailable .card');

            if (hasPrice.length && !$container.length) {
                hotelPrice = getHotelPrice($('.priceInnerWrap .price .price-big > *'));
            }
        }

        if (hotelImg.indexOf('/' + hotelId + '/') !== -1 && hotelId) {
            hotelImg = hotelImg;
        } else {
            hotelImg = hotelImgDefault;
        }
        /* */

        var storage = localStorage.getItem("dmfavoritehotels2");
        storage = JSON.parse(storage);

        if (storage && storage.hasOwnProperty('hotels') && storage.hotels.length) {
            for (var i = 0; i < storage.hotels.length; i++) {
                var tempHotel = storage.hotels[i];
                var tempPrice = tempHotel.price;
                var tempParams = tempHotel.hotelParams;
                var tempId = tempHotel.id;
                var isExist = 'isExist';
                if (tempPrice == hotelPrice && tempParams == hotelParams && tempId == hotelId) {
                    return isExist
                }
            }
        }
        /* */

        var hotel = {
            id: hotelId,
            name: hotelName,
            url: hotelUrl,
            img: hotelImg,
            rating: hotelRating,
            addedDate: hotelAddedDate,
            dateOfFlight: hotelDateOfFlight,
            price: hotelPrice,
            hotelParams: hotelParams,
            hotelLocation: hotelLocation,
        };
        return hotel
    }
    return null
}

function addHotel() {
    var hotel = getCurrentHotel('.hoteldetailpage');
    var storage = localStorage.getItem("dmfavoritehotels2");
    if (hotel != 'isExist') {
        if (storage) {
            storage = JSON.parse(storage);
            storage.hotels.unshift(hotel);
            localStorage.setItem("dmfavoritehotels2", JSON.stringify(storage));
        } else {
            var currentTimeAsMs = Date.now();
            var adjustedTimeAsMs = currentTimeAsMs + (1000 * 60 * 60 * 24 * 3);
            var firstAddedHotelDateMil = new Date(adjustedTimeAsMs);

            var dmfavoritehotels2 = {
                hotels: [],
                firstAddedHotelDate: firstAddedHotelDateMil,
            };
            dmfavoritehotels2.hotels.unshift(hotel);
            localStorage.setItem("dmfavoritehotels2", JSON.stringify(dmfavoritehotels2));
        }
        ym(553380, 'reachGoal', 'favorites1', {hotel: hotel.name});
    }
}

function showAddedMsg() {
    var $msg = $('.dm-ins-wish-list__add2__msg');
    $msg.addClass('dm-ins-wish-list__add2__msg--show');
}

function hideAddedMsg() {
    var $msg = $('.dm-ins-wish-list__add2__msg');
    $msg.removeClass('dm-ins-wish-list__add2__msg--show');
}

function refreshWishlist() {
    var storage = JSON.parse(localStorage.getItem("dmfavoritehotels2"));

    if (storage) {
        var cur_date = Date.now();
        var end_date = new Date(storage.firstAddedHotelDate);
        var end_date2 = end_date.getTime();
    }

    var amountHotels = 0;
    if (storage && cur_date < end_date2) {
        var hotels = storage.hotels;
        var amount = hotels.length || 0;
        amountHotels = amount;
    } else {
        localStorage.removeItem('dmfavoritehotels2');
    }
    $('.dm-ins-wish-list__add2__amount--2').attr('data-amount', '(' + amountHotels + ')');
    $('.ins-dm-panel__wishlist').attr('data-amount', amountHotels);
    $('.dm-ins-wish-list__add-amount').attr('data-amount', amountHotels);
    if (amountHotels > 0) {
        $('.dm-ins-wish-list__add2__amount--2').closest('.dm-ins-wish-list__add2--cabinet').addClass('dm-ins-wish-list__add2--added');
        $('.dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__btn').addClass('js--show-wishlist');
        $('.dm-ins-wish-list__add2--istour .dm-ins-wish-list__add2__amount--1').addClass('js--show-wishlist');
        $('.dm-ins-wish-list__add2--istour .dm-ins-wish-list__add2__amount--2').addClass('js--show-wishlist');
        $('.dm-ins-wish-list__add2--istour .dm-ins-wish-list__add2__icon').addClass('js--show-wishlist');
        $('.ins-dm-panel__wishlist').addClass('js--show-wishlist');
        $('.shortcut.wish-offers').addClass('active');
    } else {
        $('.dm-ins-wish-list__add2__amount--2').closest('.dm-ins-wish-list__add2--cabinet').removeClass('dm-ins-wish-list__add2--added');
        $('.dm-ins-wish-list__add2--cabinet .dm-ins-wish-list__add2__btn').removeClass('js--show-wishlist');
        $('.dm-ins-wish-list__add2--istour .dm-ins-wish-list__add2__amount--1').removeClass('js--show-wishlist');
        $('.dm-ins-wish-list__add2--istour .dm-ins-wish-list__add2__amount--2').removeClass('js--show-wishlist');
        $('.dm-ins-wish-list__add2--istour .dm-ins-wish-list__add2__icon').removeClass('js--show-wishlist');
        $('.ins-dm-panel__wishlist').removeClass('js--show-wishlist');
        $('.shortcut.wish-offers').removeClass('active');
    }

    var hotel = getCurrentHotel('.hoteldetailpage');
    if (hotel == 'isExist') {
        $('.dm-ins-wish-list__add2--istour').addClass('dm-ins-wish-list__add2--added');
        $('.dm-ins-wish-list__add2--istour').find('.dm-ins-wish-list__add2__amount--2').addClass('js--add-to-wishlist');
    } else {
        $('.dm-ins-wish-list__add2--istour').removeClass('dm-ins-wish-list__add2--added');
        $('.dm-ins-wish-list__add2--istour').find('.dm-ins-wish-list__add2__amount--2').removeClass('js--add-to-wishlist');
    }
}

function deleteHotel(id, price, params) {
    var deleteHotelId = id;
    var deleteHotelPrice = price;
    var deleteHotelParams = params;
    var storage = localStorage.getItem("dmfavoritehotels2");

    if (storage && deleteHotelId != 0 && deleteHotelPrice && deleteHotelParams) {
        storage = JSON.parse(storage);
        var hotels = storage.hotels;
        for (var i = 0; i < hotels.length; i++) {
            var hotel = hotels[i];
            var hotelId = hotel.id;
            var hotelPrice = hotel.price;
            var hotelParams = hotel.hotelParams;
            if (deleteHotelId == hotelId && deleteHotelPrice == hotelPrice && deleteHotelParams == hotelParams) {
                hotels.splice(i, 1);
            }
        }
        storage.hotels = hotels;
        localStorage.setItem("dmfavoritehotels2", JSON.stringify(storage));
    }
}

/* wishlist functions end */
function timer() {
    var $timer = $('.dm-ins-wish-list__timer');
    var storage = JSON.parse(localStorage.getItem("dmfavoritehotels2"));

    function flTimerEnd() {
        $timer.find('div').each(function () {
            var $this = $(this),
                $text = $this.text();
            if ($text == '%days%' || $text == '%hours%' || $text == '%minuts%' || $text == '%seconds%') {
                $this.text('00');
            } else if ($text == '%DAYS%') {
                $this.text('дней');
            } else if ($text == '%HOURS%') {
                $this.text('часов');
            } else if ($text == '%MINUTS%') {
                $this.text('мин');
            } else if ($text == '%SECONDS%') {
                $this.text('сек');
            }
        });
        refreshWishlist();
        if (isPopup) {
            myo.close();
        }
    }

    function flTimer() {
        if (storage && storage.hasOwnProperty('firstAddedHotelDate')) {
            var end_date = new Date(storage.firstAddedHotelDate);
            var cur_date = Date.now();
            var end_date2 = end_date.getTime();
            if (cur_date < end_date2) {
                $timer.timer({
                    endDate: end_date,
                    locale: {
                        days: ['день', 'дня', 'дней'],
                        hours: ['час', 'часа', 'часов'],
                        minuts: ['мин', 'мин', 'мин'],
                        seconds: ['сек', 'сек', 'сек']
                    },
                    onEnd: function (param) {
                        flTimerEnd();
                    }
                });
                $timer.removeAttr('data-end-date');
            } else {
                flTimerEnd();
            }
        } else {
            flTimerEnd();
        }
    }

    flTimer();
}

function renderHotels(arr) {
    var hotelsArr = arr;
    var hotelsHTML = '';
    if (hotelsArr.length) {

        hotelsArr.sort(byField('price'));

        for (var i = 0; i < hotelsArr.length; i++) {

            var hotel = hotelsArr[i];

            var hotelId = hotel.id;
            var hotelName = hotel.name;
            var hotelUrl = hotel.url;
            var hotelImg = hotel.img;
            var hotelRating = hotel.rating;
            var hotelPrice = hotel.price || 0;
            var hotelPricePure = hotel.price || 0;
            var hotelHTML = '';
            var hotelRatingHTML = '';
            var hotelParams = hotel.hotelParams;
            var hotelParamsHTML = '';
            var hotelLocation = hotel.hotelLocation;
            var hotelLocationHTML = '';

            if (hotelRating > 0) {
                for (var j = 0; j < hotelRating; j++) {
                    hotelRatingHTML += '<div class="dm-ins-wish-list__rating-item">&nbsp;</div>';
                }
            } else {
                hotelRatingHTML = '<div class="dm-ins-wish-list__rating-text">Без звёзд</div>';
            }
            var hotelPriceHTML = '';
            if (hotelPrice > 0) {
                hotelPrice = parseInt(hotelPrice).toLocaleString();
                hotelPriceHTML = `<div class="dm-ins-wish-list__price">от ${hotelPrice} ₽</div>`;
            } else {
                hotelPriceHTML = `<div class="dm-ins-wish-list__price"></div>`;
            }


            var hotelParamsArr = hotelParams.split(',');
            var child = hotelParamsArr[2].trim();
            var nights = hotelParamsArr[0].trim();
            var adult = hotelParamsArr[1].trim();
            var childHTML = '';

            if (child != 0) {
                childHTML = `| ${hotelParamsArr[2]} детей`;
            }

            if (hotelLocation != '') {
                hotelLocationHTML = `<div class="dm-ins-wish-list__location">${hotelLocation}</div>`;
            }

            hotelParamsHTML = `${adult} взрослых ${childHTML} | ${nights} ночей`;

            hotelHTML = `
<div class="dm-ins-wish-list__tour dm-ins-wish-list__font-size" data-wishlist-price="${hotelPricePure}">
    <div class="dm-ins-wish-list__inner">
        <div class="dm-ins-wish-list__row dm-ins-wish-list__row--1">
            <div class="dm-ins-wish-list__img-wrap"><img class="dm-ins-wish-list__img" src="${hotelImg}" alt=""></div>
        </div>
        <div class="dm-ins-wish-list__row dm-ins-wish-list__row--2">
            <!--div class="dm-ins-wish-list__seen">этот отель забронировали <b>4</b> раза</div-->
            <div class="dm-ins-wish-list__rating">${hotelRatingHTML}</div>
            <div class="dm-ins-wish-list__title">${hotelName}</div>
            ${hotelLocationHTML}
            <div class="dm-ins-wish-list__note dm-ins-wish-list__sm-hidden">*&nbsp;Цена&nbsp;актуальна&nbsp;на&nbsp;момент добавления&nbsp;в&nbsp;Избранное</div>
        </div>
        <div class="dm-ins-wish-list__row dm-ins-wish-list__row--3">
            <div class="dm-ins-wish-list__nights">${hotelParamsHTML}</div>
            ${hotelPriceHTML}
            <div class="dm-ins-wish-list__note dm-ins-wish-list__lg-hidden">*&nbsp;Цена&nbsp;актуальна&nbsp;на&nbsp;момент добавления&nbsp;в&nbsp;Избранное</div>
            <div class="dm-ins-wish-list__btn-wrap"><a class="dm-ins-wish-list__btn" onclick="ym(553380,'reachGoal','jivo_custom_favourite_chooseroom')" href="${hotelUrl}" target="_blank">Выбрать номер</a></div>
            <div class="dm-ins-wish-list__del-wrap">
                <div class="dm-ins-wish-list__del js__delete-from-wishlist" data-hotel-id="${hotelId}" data-hotel-params="${hotelParams}" data-price="${hotelPricePure}">
                    <div class="dm-ins-wish-list__del-title">Удалить</div>
                    <div class="dm-ins-wish-list__del-img"></div>
                </div>
            </div>
            <!--div class="dm-ins-wish-list__add-wrap">
                <div class="dm-ins-wish-list__add">
                    <div class="dm-ins-wish-list__add-svg-wrap js__add-to-wishlist">
                        <svg class="dm-ins-wish-list__add-svg" width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.4347 1.62555L30.5485 1.64311H30.5542C35.2194 2.42776 38.5 6.18506 38.5 10.4467V10.8751C38.5 13.4545 37.3515 15.9479 35.2923 17.7405L35.2906 17.742L21.1744 30.0667L21.1704 30.0702C20.8664 30.3375 20.4467 30.4985 20 30.4985C19.5533 30.4985 19.1336 30.3375 18.8296 30.0701L18.8256 30.0667L4.70938 17.742L4.70772 17.7405C2.64849 15.9479 1.5 13.4545 1.5 10.8751V10.4467C1.5 6.14877 4.83515 2.35789 9.55478 1.62536L9.55478 1.62538L9.56259 1.62413C12.6091 1.13482 15.8348 2.09387 18.0191 4.15578L18.019 4.15579L18.0241 4.16051L18.9636 5.03928L20.029 6.03579L21.0548 4.99854L21.8964 4.14752C24.1706 2.08338 27.3278 1.14601 30.4347 1.62555Z" stroke="black" stroke-width="3"></path>                            
                        </svg>
                    </div>
                    <div class="dm-ins-wish-list__add-title js__add-to-wishlist" data-added="в избранном" data-add="добавить в избранное"></div>
                    <div class="dm-ins-wish-list__add-amount js__show-wishlist" data-amount-left="(" data-amount="0" data-amount-right=")"></div>
                </div>
            </div-->
        </div>
    </div>
</div>
            `;
            hotelsHTML += hotelHTML;
        }
    }
    return hotelsHTML
}

function showWishlist() {

    function showWishlistInn() {
        var POPUP_HTML = '';
        var HOTELS_HTML = '';
        var HOTELS_FULL_HTML = '';

        var storage = JSON.parse(localStorage.getItem("dmfavoritehotels2"));
        var hotelsArr;
        if (storage.hasOwnProperty('hotels') && storage.hotels.length) {
            hotelsArr = storage.hotels;
            HOTELS_HTML = renderHotels(hotelsArr);

            HOTELS_FULL_HTML = `
                <div class="dm-ins-wish-list__slider-wrap">
                    <h3 class="dm-ins-wish-list__popup__title">Избранное</h3>
                    <div class="dm-ins-wish-list__slider owl-carousel">${HOTELS_HTML}</div>
                </div>
            `;
        }

        POPUP_HTML = HOTELS_FULL_HTML + HOTEL_WISHLIST_TIMER_HTML;

        myo.open({
            clas: 'dm-ins-wish-list__popup',
            html: POPUP_HTML,
            beforeOpen: function () {
                hideAddedMsg();
                isPopup = true;
                slider();
                timer();
            },
            afterClose: function () {
                this.bodyDiv.html('');
                isPopup = false;
            },
            afterOpen: function () {
                ym(553380, 'reachGoal', 'jivo_custom_favourite');

            },
        });
    }

    if (typeof window.myo != 'object' && typeof window.myo == 'undefined') {
        $.getScript("https://cdn.coral.ru/content/insider/russia/libs/popup.txt", function (data, textStatus, jqxhr) {
            showWishlistInn();
        });
    } else {
        showWishlistInn();
    }
};

function sliderOwl() {
    if (window.innerWidth <= 768) {
        var startPosition = 0;
        var items = $('.dm-ins-wish-list__slider .dm-ins-wish-list__tour');
        var dmOwl = $('.dm-ins-wish-list__slider.owl-carousel');
        if (items.length > 2) {
            startPosition = Math.floor(items.length / 2);
        }
        dmOwl.owlCarousel({
            loop: false,
            margin: 0,
            dots: false,
            nav: true,
            autoWidth: true,
            items: 1,
            center: 1,
            startPosition: startPosition,
            navText: ["менее<br />дорогие ОТЕЛИ", "Более<br />дорогие ОТЕЛИ"],
            onInitialized: function () {

            },
        });
    } else {
        $('.dm-ins-wish-list__slider.owl-carousel').trigger('destroy.owl.carousel');
    }
}

function slider() {
    if (typeof $.fn.owlCarousel != 'function' && typeof $.fn.owlCarousel == 'undefined' && !jQuery().owlCarousel) {
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js", function (data, textStatus, jqxhr) {
            sliderOwl();
        });
    } else {
        sliderOwl();
    }
}

function ins_wishlist_default() {
    if (!isInsertHtml) {
        var $elem = $('.sharebtn');
        if ($elem.length) {
            $elem.closest('.shortcuts').find('>div').append('<div class="d-flex">' + HOTEL_ADD_BTN_HTML + '</div>');
        }
        isInsertHtml = true;
    }
    if (!isInsertShare) {
        $('.hoteldetailpage .contentheader .shortcuts .sharebtn .shareicon').html(HOTEL_SHARE_SVG_HTML);
        isInsertShare = true;
    }
    if (!isInsertFavoriteBtnHtml) {
        $('.topItem.geolocation').before(HOTEL_WISHLIST_BTN_CABINET_HTML);
        $('.profilemenuwrapper').after(HOTEL_WISHLIST_BTN_CABINET_HTML);
        isInsertFavoriteBtnHtml = true;
    }
    refreshWishlist();
}

/* wishlist start */
ins_wishlist_default();
$(document).on('click', '.js--add-to-wishlist', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $par = $this.closest('.dm-ins-wish-list__add2');
    var added = $par.hasClass('dm-ins-wish-list__add2--added');
    if (added) {
        // $('.js--show-wishlist').trigger('click');
        // showAddedMsg();
        // showWishlist();
        return
    } else {
        $par.addClass('dm-ins-wish-list__add2--added');
        showAddedMsg();
        addHotel();
    }
    refreshWishlist();
});
$(document).on('click', '.js--show-wishlist', function (e) {
    e.preventDefault();
    showWishlist();
});
$(document).on('click', '.js__delete-from-wishlist', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $parent = $this.closest('.dm-ins-wish-list__tour');
    var deleteId = $this.attr('data-hotel-id');
    var deletePrice = $this.attr('data-price');
    var deleteParams = $this.attr('data-hotel-params');
    var caruselItemParent = $this.closest('.dm-ins-wish-list__slider.owl-carousel');

    deleteHotel(deleteId, deletePrice, deleteParams);

    if (window.innerWidth <= 768) {

        var caruselItem = $this.closest('.owl-item');
        var caruselItems = caruselItemParent.find('.owl-item');
        var $index = 0;
        $index = caruselItems.index(caruselItem);
        caruselItem.find('.dm-ins-wish-list__tour').addClass('dm-ins-wish-list__tour--detele');

        setTimeout(function () {
            $('.dm-ins-wish-list__slider.owl-carousel').trigger('remove.owl.carousel', $index).trigger('refresh.owl.carousel');
            if (!caruselItemParent.find('.owl-item').length && isPopup == true) {
                $('.dm-popover__close').trigger('click');
                $('.dm-popup__html').remove();
                localStorage.removeItem("dmfavoritehotels2");
            }
            refreshWishlist();
            $(window).trigger('resize');
        }, 400);
    } else {
        $parent.addClass('dm-ins-wish-list__tour--detele');
        setTimeout(function () {
            $parent.remove();
            if (!caruselItemParent.find('.dm-ins-wish-list__tour').length && isPopup == true) {
                $('.dm-popover__close').trigger('click');
                $('.dm-popup__html').remove();
                localStorage.removeItem("dmfavoritehotels2");
            }
            refreshWishlist();
        }, 400);
    }
    ym(553380, 'reachGoal', 'jivo_custom_favourite_clearhistory');
});
$(document).on('click', function (e) {
    if (!$(e.target).closest('.dm-ins-wish-list__add2__msg, .dm-ins-wish-list__add2').length) {
        hideAddedMsg();
    }
    ;
});
$(window).on('resize', function () {
    slider();
});
/* wishlist end */
/* resent start */
var dmPath = document.location.pathname;
var dmResentHotelsLimit = 19;

/* resent functions */
function refreshResent() {
    var storage = JSON.parse(localStorage.getItem("dmresenthotels"));

    var hasResent = storage ? storage.hasOwnProperty('hotels') : false;
    var filterHotels = [];

    if (storage && hasResent) {
        var resentHotels = storage.hotels;
        var cur_date = Date.now();
        filterHotels = resentHotels.filter(function (hotel) {
            if (hotel) {
                var addedDate = new Date(hotel.addedDate);
                var currentTimeAsMs = addedDate.getTime();
                var compareAddedDate = currentTimeAsMs + (1000 * 60 * 60 * 24 * 3);
                return compareAddedDate > cur_date
            }
        });
    }

    var amountHotels = 0;
    if (filterHotels.length > 0) {
        var dmresenthotels = {
            hotels: [],
        };
        dmresenthotels.hotels = filterHotels;
        localStorage.setItem("dmresenthotels", JSON.stringify(dmresenthotels));
        var amount = filterHotels.length || 0;
        amountHotels = amount;
    } else {
        localStorage.removeItem('dmresenthotels');
    }
    $('.ins-dm-panel__resent').attr('data-amount', amountHotels);
    if (amountHotels > 0) {
        $('.ins-dm-panel__resent').addClass('js--show-resent');
        $('.shortcut.resent-offers').addClass('active');
    } else {
        $('.ins-dm-panel__resent').removeClass('js--show-resent');
        $('.shortcut.resent-offers').removeClass('active');
    }

}

function showResent() {

    function showResentInn() {

        var POPUP_HTML = '';
        var HOTELS_HTML = '';
        var HOTELS_FULL_HTML = '';

        var storage = JSON.parse(localStorage.getItem("dmresenthotels"));
        var hotelsArr;
        if (storage.hasOwnProperty('hotels') && storage.hotels.length) {
            hotelsArr = storage.hotels;
            HOTELS_HTML = renderResentHotels(hotelsArr);

            HOTELS_FULL_HTML = `
                <div class="dm-ins-wish-list__slider-wrap">
                    <h3 class="dm-ins-wish-list__popup__title dm-ins-wish-list__popup__title--resent">
                        <span class="dm-ins-wish-list__popup__title__span">Вы смотрели ранее</span>
                        <span class="dm-ins-wish-list__popup__title__span--delete js--clear-all-resent" onclick="ym(553380,'reachGoal','jivo_custom_viewed_clearhistory')">Очистить историю</span>
                    </h3>
                    <div class="dm-ins-wish-list__slider owl-carousel">${HOTELS_HTML}</div>
                </div>
            `;
        }

        POPUP_HTML = HOTELS_FULL_HTML;

        myo.open({
            clas: 'dm-ins-wish-list__popup',
            html: POPUP_HTML,
            beforeOpen: function () {
                isPopup = true;
                slider();
            },
            afterClose: function () {
                this.bodyDiv.html('');
                isPopup = false;
            },
            afterOpen: function () {
                ym(553380, 'reachGoal', 'jivo_custom_viewed');
            },
        });
    }

    if (typeof window.myo != 'object' && typeof window.myo == 'undefined') {
        $.getScript("https://cdn.coral.ru/content/insider/russia/libs/popup.txt", function (data, textStatus, jqxhr) {
            showResentInn();
            refreshWishlist();
        });
    } else {
        showResentInn();
        refreshWishlist();
    }
};

function renderResentHotels(arr) {
    var hotelsArr = arr;
    var hotelsHTML = '';
    if (hotelsArr.length) {

        hotelsArr.sort(byField('price'));

        for (var i = 0; i < hotelsArr.length; i++) {

            var hotel = hotelsArr[i];

            var hotelId = hotel.id;
            var hotelName = hotel.name;
            var hotelUrl = hotel.url;
            var hotelImg = hotel.img;
            var hotelRating = hotel.rating;
            var hotelPrice = hotel.price || 0;
            var hotelPricePure = hotel.price || 0;
            var hotelHTML = '';
            var hotelRatingHTML = '';
            var hotelParams = hotel.hotelParams;
            var hotelParamsHTML = '';
            var hotelDataParams = '';
            var hotelPurchaseAmount = hotel.purchaseAmount || 0;
            var hotelPurchaseAmountHTML = '';
            var hotelLocation = hotel.hotelLocation;
            var hotelLocationHTML = '';


            var storage = localStorage.getItem("dmfavoritehotels2");
            storage = JSON.parse(storage);
            var isExist = '';
            var isExist2 = '';
            if (storage && storage.hasOwnProperty('hotels') && storage.hotels.length) {
                for (var z = 0; z < storage.hotels.length; z++) {
                    var tempHotel = storage.hotels[z];
                    var tempPrice = tempHotel.price;
                    var tempParams = tempHotel.hotelParams;
                    var tempId = tempHotel.id;
                    if (tempPrice == hotelPrice && tempParams == hotelParams && tempId == hotelId) {
                        isExist = 'dm-ins-wish-list__add--added';
                        isExist2 = 'js--show-wishlist-from-resent';
                    }
                }
            }

            if (hotelRating > 0) {
                for (var j = 0; j < hotelRating; j++) {
                    hotelRatingHTML += '<div class="dm-ins-wish-list__rating-item">&nbsp;</div>';
                }
            } else {
                hotelRatingHTML = '<div class="dm-ins-wish-list__rating-text">Без звёзд</div>';
            }
            var hotelPriceHTML = '';
            if (hotelPrice > 0) {
                hotelPrice = parseInt(hotelPrice).toLocaleString();
                hotelPriceHTML = `<div class="dm-ins-wish-list__price">от ${hotelPrice} ₽</div>`;
            } else {
                hotelPriceHTML = `<div class="dm-ins-wish-list__price"></div>`;
            }

            var hotelParamsArr = hotelParams.split(',');
            var child = hotelParamsArr[2].trim();
            var nights = hotelParamsArr[0].trim();
            var adult = hotelParamsArr[1].trim();
            var childHTML = '';

            if (child != 0) {
                childHTML = `| ${hotelParamsArr[2]} детей`;
            }
            hotelParamsHTML = `${adult} взрослых ${childHTML} | ${nights} ночей`;
            hotelDataParams = ` data-hotelid="${hotelId}" data-hotelname="${hotelName}" data-hotelurl="${hotelUrl}" data-hotelimg="${hotelImg}" data-hotelprice="${hotelPricePure}" data-hotelparams="${hotelParams}" data-hotelrating="${hotelRating}" data-hotellocation="${hotelLocation}"`;


            hotelPurchaseAmountHTML = plural(hotelPurchaseAmount, ['раз', 'раза', 'раз']);

            if (hotelLocation != '') {
                hotelLocationHTML = `<div class="dm-ins-wish-list__location">${hotelLocation}</div>`;
            }

            hotelHTML = `
<div class="dm-ins-wish-list__tour dm-ins-wish-list__font-size" data-wishlist-price="${hotelPricePure}">
    <div class="dm-ins-wish-list__inner">
        <div class="dm-ins-wish-list__row dm-ins-wish-list__row--1">
            <div class="dm-ins-wish-list__img-wrap"><img class="dm-ins-wish-list__img" src="${hotelImg}" alt=""></div>
        </div>
        <div class="dm-ins-wish-list__row dm-ins-wish-list__row--2">
            <div class="dm-ins-wish-list__seen">этот отель забронировали <b>${hotelPurchaseAmount}</b> ${hotelPurchaseAmountHTML}</div>
            <div class="dm-ins-wish-list__rating">${hotelRatingHTML}</div>
            <div class="dm-ins-wish-list__title">${hotelName}</div>
            ${hotelLocationHTML}
        </div>
        <div class="dm-ins-wish-list__row dm-ins-wish-list__row--3">
            <div class="dm-ins-wish-list__nights">${hotelParamsHTML}</div>
            ${hotelPriceHTML}
            <div class="dm-ins-wish-list__note dm-ins-wish-list__lg-hidden">*&nbsp;Цена&nbsp;актуальна&nbsp;на&nbsp;момент добавления&nbsp;в&nbsp;Избранное</div>
            <div class="dm-ins-wish-list__btn-wrap"><a class="dm-ins-wish-list__btn" onclick="ym(553380,'reachGoal','jivo_custom_viewed_chooseroom')" href="${hotelUrl}" target="_blank">Выбрать номер</a></div>
            <div class="dm-ins-wish-list__add-wrap">
                <div class="dm-ins-wish-list__add ${isExist}" ${hotelDataParams}>
                    <div class="dm-ins-wish-list__add-svg-wrap js__add-to-wishlist-from-resent ${isExist2}">
                        <svg class="dm-ins-wish-list__add-svg" width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.4347 1.62555L30.5485 1.64311H30.5542C35.2194 2.42776 38.5 6.18506 38.5 10.4467V10.8751C38.5 13.4545 37.3515 15.9479 35.2923 17.7405L35.2906 17.742L21.1744 30.0667L21.1704 30.0702C20.8664 30.3375 20.4467 30.4985 20 30.4985C19.5533 30.4985 19.1336 30.3375 18.8296 30.0701L18.8256 30.0667L4.70938 17.742L4.70772 17.7405C2.64849 15.9479 1.5 13.4545 1.5 10.8751V10.4467C1.5 6.14877 4.83515 2.35789 9.55478 1.62536L9.55478 1.62538L9.56259 1.62413C12.6091 1.13482 15.8348 2.09387 18.0191 4.15578L18.019 4.15579L18.0241 4.16051L18.9636 5.03928L20.029 6.03579L21.0548 4.99854L21.8964 4.14752C24.1706 2.08338 27.3278 1.14601 30.4347 1.62555Z" stroke="black" stroke-width="3"></path>                            
                        </svg>
                    </div>
                    <div class="dm-ins-wish-list__add-title js__add-to-wishlist-from-resent ${isExist2}" data-added="в избранном" data-add="добавить в избранное"></div>
                    <div class="dm-ins-wish-list__add-amount js__show-wishlist dm-ins-hidden" data-amount-left="(" data-amount="0" data-amount-right=")"></div>
                </div>
            </div>
        </div>
    </div>
</div>
            `;
            hotelsHTML += hotelHTML;
        }
    }
    return hotelsHTML
}

function getResentHotel(hotel) {
    if (hotel) {

        var storage = localStorage.getItem("dmfavoritehotels2");
        storage = JSON.parse(storage);
        if (storage && storage.hasOwnProperty('hotels') && storage.hotels.length) {
            for (var i = 0; i < storage.hotels.length; i++) {
                var tempHotel = storage.hotels[i];
                var tempPrice = tempHotel.price;
                var tempParams = tempHotel.hotelParams;
                var tempId = tempHotel.id;
                var isExist = 'isExist';
                if (tempPrice == hotel.price && tempParams == hotel.hotelParams && tempId == hotel.id) {
                    return isExist
                }
            }
        }
        /* */
        return hotel
    }
    return null
}

function addToWishFromResent(hotel) {

    var $hotel = getResentHotel(hotel);
    var storage = localStorage.getItem("dmfavoritehotels2");
    if ($hotel != 'isExist') {
        if (storage) {
            storage = JSON.parse(storage);
            storage.hotels.unshift($hotel);
            localStorage.setItem("dmfavoritehotels2", JSON.stringify(storage));
        } else {
            var currentTimeAsMs = Date.now();
            var adjustedTimeAsMs = currentTimeAsMs + (1000 * 60 * 60 * 24 * 3);
            var firstAddedHotelDateMil = new Date(adjustedTimeAsMs);

            var dmfavoritehotels2 = {
                hotels: [],
                firstAddedHotelDate: firstAddedHotelDateMil,
            };
            dmfavoritehotels2.hotels.unshift($hotel);
            localStorage.setItem("dmfavoritehotels2", JSON.stringify(dmfavoritehotels2));
        }
        ym(553380, 'reachGoal', 'favorites1', {hotel: hotel.name});
    }
}

function getCurrentHotelFromPage(hotelSelector) {
    var $hotel = $(hotelSelector);
    if ($hotel.length) {
        var hotelPurchasedF = function randomInteger(min, max) {
            // случайное число от min до (max+1)
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        };
        var hotelPurchased = hotelPurchasedF(1,5)
        var hotelId = $hotel.find('h1[data-hotelid]').data('hotelid') || false;
        var hotelName = $hotel.find('h1[data-hotelid]').text().trim() || false;
        var hotelUrl = document.location.href || false;
        var hotelImg = $hotel.find('.gallery-layout > img').attr('src');
        var hotelImgDefault = '//cdn.coral.ru/content/insider/russia/abandoned_cart/default.jpg';
        var hotelRating = $hotel.find('h1[data-hotelid]').next().find('.material-icons').length || 0;
        var hotelAddedDate = new Date();
        var hotelDateOfFlight = $('#departureDateRangePickerInput').val() || false;
        var hotelPrice = 0;
        var hotelParams = $('[data-module="hoteldetail"]').length ? $('[data-module="hoteldetail"]').attr('data-itemparams') : '';
        var hotelPurchaseAmount = $('[data-dynamic-attribute="@dailyPurchase"]').length ? $('[data-dynamic-attribute="@dailyPurchase"]').text() : hotelPurchased;
        hotelAddedDate.setHours(0, 0, 0, 0);
        var hotelLocation = $('.hoteltitlesub .location > span').length ? $('.hoteltitlesub .location > span').text() : '';
        /* */
        var isHotelPage = $('.hoteldetailpage') || false;

        if (isHotelPage.length) {
            var hasPrice = $('.priceInnerWrap .price .price-big') || false;
            var $container = $('.noroomavailable .card');

            if (hasPrice.length && !$container.length) {
                hotelPrice = getHotelPrice($('.priceInnerWrap .price .price-big > *'));
            }
        }

        if (hotelImg.indexOf('/' + hotelId + '/') !== -1 && hotelId) {
            hotelImg = hotelImg;
        } else {
            hotelImg = hotelImgDefault;
        }
        /* */

        var storage = localStorage.getItem("dmresenthotels");
        storage = JSON.parse(storage);

        if (storage && storage.hasOwnProperty('hotels') && storage.hotels.length) {
            for (var i = 0; i < storage.hotels.length; i++) {
                var tempHotel = storage.hotels[i];
                var tempPrice = tempHotel.price;
                var tempParams = tempHotel.hotelParams;
                var tempId = tempHotel.id;
                var isExist = 'isExist';
                if (tempPrice == hotelPrice && tempParams == hotelParams && tempId == hotelId) {
                    return isExist
                }
            }
        }
        /* */

        var hotel = {
            id: hotelId,
            name: hotelName,
            url: hotelUrl,
            img: hotelImg,
            rating: hotelRating,
            addedDate: hotelAddedDate,
            dateOfFlight: hotelDateOfFlight,
            price: hotelPrice,
            hotelParams: hotelParams,
            purchaseAmount: hotelPurchaseAmount,
            hotelLocation: hotelLocation,
        };
        return hotel
    }
    return null
}

function addToResent() {
    var hotel = getCurrentHotelFromPage('.hoteldetailpage');
    var storage = localStorage.getItem("dmresenthotels");

    if (hotel != 'isExist') {
        if (storage) {
            storage = JSON.parse(storage);

            var storageLength = storage ? storage.hotels.length : 0;
            if (dmResentHotelsLimit <= storageLength) {
                storage.hotels.length = storage.hotels.length - (storageLength - dmResentHotelsLimit);
            }
            storage.hotels.unshift(hotel);
            localStorage.setItem("dmresenthotels", JSON.stringify(storage));
        } else {
            var currentTimeAsMs = Date.now();
            var adjustedTimeAsMs = currentTimeAsMs + (1000 * 60 * 60 * 24 * 3);
            var firstAddedHotelDateMil = new Date(adjustedTimeAsMs);

            var dmresenthotels = {
                hotels: [],
                firstAddedHotelDate: firstAddedHotelDateMil,
            };
            dmresenthotels.hotels.unshift(hotel);
            localStorage.setItem("dmresenthotels", JSON.stringify(dmresenthotels));
        }
    }
};
window.dmAddToResent = function () {
    addToResent();
};

function plural(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

/* resent functions end */
function ins_resent_default() {
    if (dmPath.indexOf("/hotels/") !== -1 || dmPath == '/coral.html') {
        window.dmAddToResent();
    }
    refreshResent();
}

/* resent start */
ins_resent_default();
$(document).on('click', '.js--show-resent', function (e) {
    e.preventDefault();
    showResent();
});
$(document).on('click', '.js__add-to-wishlist-from-resent', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $par = $this.closest('.dm-ins-wish-list__add');
    var added = $par.hasClass('dm-ins-wish-list__add--added');
    if (added) {
        // $('.js--show-wishlist').trigger('click');
        return
    } else {
        $par.addClass('dm-ins-wish-list__add--added');
        $par.find('.js__add-to-wishlist-from-resent').addClass('js--show-wishlist-from-resent');

        var hotelId = $par.data('hotelid');
        var hotelName = $par.data('hotelname');
        var hotelUrl = $par.data('hotelurl');
        var hotelImg = $par.data('hotelimg');
        var hotelRating = $par.data('hotelrating');
        var hotelAddedDate = false;
        var hotelDateOfFlight = false;
        var hotelPrice = $par.data('hotelprice');
        var hotelParams = $par.data('hotelparams');
        var hotelLocation = $par.data('hotellocation');

        var hotel = {
            id: hotelId,
            name: hotelName,
            url: hotelUrl,
            img: hotelImg,
            rating: hotelRating,
            addedDate: hotelAddedDate,
            dateOfFlight: hotelDateOfFlight,
            price: hotelPrice,
            hotelParams: hotelParams,
            hotelLocation: hotelLocation,
        }
        addToWishFromResent(hotel);
    }
    refreshResent();
    refreshWishlist();
});
$(document).on('click', '.js--show-wishlist-from-resent', function (e) {
    e.preventDefault();
    myo.close();
    showWishlist();
});

$(document).on('click', '.js--clear-all-resent', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $parent = $this.closest('.dm-ins-wish-list__tour');

    $parent.remove();
    localStorage.removeItem("dmresenthotels");
    $('.dm-popover__close').trigger('click');
    refreshResent();
});
    /* resent end */

(function () {
    var setupClickHandler = function () {
        console.log('+++ setupClickHandler');
        $('jdiv[class*="hoverl_"]').get(0)?.addEventListener('click', function (e) {
            e.stopImmediatePropagation();
            jivo_api.open({ start: 'call' });
        }, true);
    };
    var onReady = function () {
        console.log('+++ onReady');
        window.jivo_onClose = function () {
            setTimeout(setupClickHandler, 500);
        };
        setTimeout(setupClickHandler, 500);
        $('.ins-dm-panel__gochat').on('click', function () {
            jivo_api.open();
        });
    };
    if (window.jivo_api) {
        onReady();
    } else {
        window.jivo_onLoadCallback = onReady;
    }

    $('.ins-dm-panel__addons').on('mouseenter', function (e) {
        $('.ins-dm-panel').addClass('shown');
    }).on('mouseleave', function (e) {
        setTimeout(function () {
            $('.ins-dm-panel').removeClass('shown');
        }, 500);
    });

})();

