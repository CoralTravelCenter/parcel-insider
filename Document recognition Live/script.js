// BuyOnline -- pop-in -- v3
if ( window.innerWidth < 733 ){
    $(document).on('click', 'span.dm-ins-document_recognition__img', function(){
        var $this = $(this);
        var isActive = $this.hasClass('active');
        if( !isActive ){
            $(this).addClass('active');
        }
    });
    $(document).on('click', '.dm-ins-document_recognition__close', function(){
        var $this = $(this);
        var $par = $this.closest('.dm-ins-document_recognition');
        var $body = $par.find('.dm-ins-document_recognition__img.active');
        $body.removeClass('active');
    });

    $(document).on('click', '#buy-online .popin-container .body > .contenu .pack .seven-steps h4', function(){
        var $this = $(this);
        var $body = $this.next();
        $this.toggleClass('active');
        $body.slideToggle();
    });
}

// popup message
var wasShown = sessionStorage.dmDocumentRecognition;
var locationPathname = location.pathname;

if ( wasShown != '1' && (locationPathname == '/' || locationPathname == '/coral.html' )){

    var popupMessageHTML = `<div class="dm-ins-document_recognition-popup__wrap">
    <div class="dm-ins-document_recognition-popup">
    <div class="dm-ins-document_recognition-popup__close"></div>
    <div class="dm-ins-document_recognition-popup__inner">
        <div class="dm-ins-document_recognition-popup__img-wrap"><img src="https://cdn.coral.ru/content/insider/russia/document_recognition/popup-icon.gif" alt=""></div>
        <div class="dm-ins-document_recognition-popup__desc">
        <div class="dm-ins-document_recognition-popup__title">Бронировать тур онлайн на сайте стало&nbsp;еще&nbsp;проще&nbsp;и быстрее!</div>
        <div class="dm-ins-document_recognition-popup__text">
            <p>Вам больше не&nbsp;нужно заполнять данные паспорта самостоятельно. Просто&nbsp;загрузите фото или скан документа,&nbsp;и&nbsp;система автоматически заполнит&nbsp;все&nbsp;поля&nbsp;за&nbsp;вас.</p>
            <p>Нет паспорта под рукой или он&nbsp;на&nbsp;оформлении?<br>Не&nbsp;проблема&nbsp;— теперь у&nbsp;вас есть возможность внести данные позже, а&nbsp;мы пришлем напоминание вам на&nbsp;почту за&nbsp;8&nbsp;дней до&nbsp;начала путешествия.</p>
        </div>
        </div>
    </div>
    </div>
    </div>`;

    $('body').append( popupMessageHTML );

    var objs = {
        '.dm-ins-document_recognition-popup': 'bounceInUp d1 s3',
    };
    for (var i in objs) {
        if ( $(i).length ){
            $(i).attr('data-s3-animator', objs[i]);
        }
    }

    var $window = $(window);
    var $document = $(document);
    var countUp = window.countUp;

    function Element(el) {

        var num;
        var cls;
        var parent;
        this.el = el;
        this.$el = $(el);
        this.data = this.$el.data('s3-animator');
        this.params = this.data.split(/\s+/);

        if (~this.params.indexOf('counter') && countUp) {

            this.type = 'counter';
            num = Number(this.$el.text().replace(/\D/g, '')) || 0;
            this.counter = new countUp(this.el, 0, num, 0, 10, {
                separator: ' ',
                useGrouping: true,
                useEasing: true
            });

        } else {

            this.type = 'animate';
            cls = this.params.map(function (param) {
                return 's3-animator-' + param;
            });
            cls.push('s3-animator');
            this.cls = cls.join(' ');

        }

        if (~this.data.indexOf('bar')) {

            parent = this.$el.parent();
            this.height = parent.height();
            this.top = parent.offset().top;

        } else {

            this.height = this.$el.height();
            this.top = this.$el.offset().top;

        }
    }

    Element.prototype.play = function () {
        this.working = true;
        if (this.type == 'counter') {
            this.counter.start();
        } else {
            this.$el.removeClass('s3-animator-hide').addClass(this.cls);
        }

    };

    Element.prototype.stop = function () {
        this.working = false;
        if (this.type == 'counter') {
            this.counter.reset();
        } else {
            this.$el.addClass('s3-animator-hide').removeClass(this.cls);
        }

    };

    function Animator() {

        var self = this;
        this.offset = 10;
        this.refresh();
        this.updateElements = this.refresh;

        $document.on('scroll.s3_animator', function () {
            self.check();
        });

        $window.on('resize.s3_animator', function () {
            self.windowHeight = $window.height();
            self.check();
        }).trigger('resize.s3_animator');

    }

    Animator.prototype.check = function () {

        var self = this;
        var scrollTop = $document.scrollTop();
        $.each(this.elements, function () {
            if (this.top + this.height > scrollTop + self.offset && this.top < scrollTop + self.windowHeight - self.offset) {
                if (!(self.once && this.working)) {
                    this.play();
                }
            } else {
                if (!(self.once && this.working)) {
                    this.stop();
                }
            }
        });

    };

    Animator.prototype.refresh = function () {

        var self = this;
        this.elements = [];
        $('[data-s3-animator]').each(function () {
            self.elements.push(new Element(this));
        });

    };
    window.s3Animator = new Animator();
    window.s3Animator.once = true;


    function FaddClass(elem, clas){
        $(elem).addClass(clas);
    }
    var ii = false;
    ii = setTimeout(function(){
        FaddClass('.dm-ins-document_recognition-popup__wrap', 's3-animator-bounceHide s3-animator s3-animator-d1');
    }, 12000);

    $(document).on('click', '.dm-ins-document_recognition-popup__close', function(){
        FaddClass('.dm-ins-document_recognition-popup__wrap', 's3-animator-bounceHide s3-animator s3-animator-d1');
    });
    sessionStorage.dmDocumentRecognition = '1';

}

// dym
var wasShown2 = sessionStorage.dmDocumentRecognition2;
if ( wasShown2 != '1' && (locationPathname == '/package/reservation/add-passenger/' || locationPathname == '/coral.html' ) ) {

    $('body').addClass('add-passenger-page')

    sessionStorage.dmDocumentRecognition2 = '1';
    var $elem = $('.btnImageUploadDropdown').eq(0);
    var $par = $elem.parent();

    var $elem2 = $('.saveTouristDataWrapper').eq(0);
    $elem2.wrap( "<span class='dm-ins-dym__elem-wrap'></span>" )
    var $par2 = $('.dm-ins-dym__elem-wrap');
    var ii = false;
    var ii2 = false;

    if ( $elem.length || $elem2.length ){
        var dymHTML1 = `
        <div class="dm-ins-dym__popup-wrap dm-ins-dym__popup-wrap--1" style="display: none;">
            <div class="dm-ins-dym__popup">
                <div class="dm-ins-dym__popup__desc">
                    Используйте нашу новую функцию<br/>для быстрого заполнения данных
                </div>
            </div>
        </div>
        `;
        var dymHTML2 = `
        <div class="dm-ins-dym__popup-wrap dm-ins-dym__popup-wrap--2" style="display: none;">
            <div class="dm-ins-dym__popup">
                <div class="dm-ins-dym__popup__desc">
                    Используйте нашу новую функцию<br/>для быстрого бронирования
                </div>
                <div class="dm-ins-dym__btn-wrap">
                    <button class="dm-ins-dym__btn">Ок, понятно!</button>
                </div>
            </div>
        </div>
        `;
        ii = setTimeout(function (){

            $par
                .addClass('dm-ins-dym__elem')
                .append(dymHTML1)
                .addClass('dm-ins-dym__active')



            $('html, body').stop().animate( {
                'scrollTop': $par.offset().top - 100
            }, 900, 'swing', function () {
            } );

            ii2 = setTimeout(function(){
                $par.find('.dm-ins-dym__popup-wrap--1').animate({'opacity':0,}, 1000, function () {
                    $par.find('.dm-ins-dym__popup-wrap--1').remove();
                    $par.removeClass('dm-ins-dym__elem');
                    $par.removeClass('dm-ins-dym__active');
                    /**/
                    if ( $elem2.length ){
                        $par2
                            .addClass('dm-ins-dym__elem')
                            .addClass('dm-ins-dym__elem--2')
                            .append(dymHTML2)
                            .addClass('dm-ins-dym__active');

                        $('html, body').stop().animate( {
                            'scrollTop': $par2.offset().top - 100
                        }, 900, 'swing', function () {
                        } );
                    }
                    /**/
                });

            }, 7000);
        }, 2000);
    }

    function dymClear(){
        $par.find('.dm-ins-dym__popup-wrap--1').remove();
        $par.removeClass('dm-ins-dym__elem');
        $par.removeClass('dm-ins-dym__active');
        $par2.find('.dm-ins-dym__popup-wrap--2').remove();
        $par2.removeClass('dm-ins-dym__elem');
        $par2.removeClass('dm-ins-dym__elem--2');
        $par2.removeClass('dm-ins-dym__active');
        clearTimeout(ii);
        clearTimeout(ii2);
    }
    $(document).on('click', dymClear);
}
