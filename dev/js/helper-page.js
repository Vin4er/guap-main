var app = {};

(function() {

   app = {

      init: function() {
         this.setSliders();
         this.setTabs();
         this.setScroll();

         this.setMenu();

         this.resize();

      },

      setMenu: function() {
         var downPane = $('.header-downer-nav-slider');
         $('body')
            .on('click', '.header-nav li', function() {
               var $this = $(this);
               if ($this.hasClass('hover')) {
                  downPane.empty();
               }
               var $content = $this.find('.swiper-wrapper'),
                  $swiper = $content.clone().wrap('<div class="swiper-container" />', {}),
                  $ps = $swiper.parent();
               $('.header-nav li').removeClass('hover').filter($this).addClass('hover');
               downPane
                  .empty()
                  .append($ps)
                  .append('<div class="swiper-button-next material swiper-button">keyboard_arrow_right</div><div class="swiper-button-prev material swiper-button">keyboard_arrow_left</div>');

               new Swiper($ps[0], {
                  slidesPerView: 'auto',
                  prevButton: downPane.find('.swiper-button-prev')[0],
                  nextButton: downPane.find('.swiper-button-next')[0]
               });

            })
            .on('click', '[data-navigate-popup].header-nav-item', function() {
               var $this = $(this),
                  datathis = $this.data('navigate-popup');
               $('[data-navigate-popup].header-nav-item').removeClass('hover').filter($this).addClass('hover');
               $('.header-downer-popup-item')
                  .removeClass('shower')
                  .filter('[data-navigate-popup="' + datathis + '"]')
                  .addClass('shower');
            })
            .on('click', '*', function(event) {
               var trgt = $(event.target);
               trgt = trgt.closest('.header-downer-popup, .header-downer .header-nav, .header-downer');
               if (!trgt.length) {
                  $('.header-downer-popup-item').removeClass('shower');
                  $('.header-nav li, [data-navigate-popup].header-nav-item').removeClass('hover');
                  downPane.empty();
               }
            })

      },

      setScroll: function() {
         $('.info-component-content').customScroll({
            padding: 0,
            vertical: true,
            horizontal: false,
            className: 'custom-scroll_container'
         })
      },
      setTabs: function() {
         $('body').on('click', '.tabs-header a', function(e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest('.tabs-header').find('a').removeClass('active').filter($this).addClass('active');
            $('.tabs-body').find('[data-tab]').addClass('tab-hide').filter('[data-tab="' + $this[0].hash.substr(1) + '"]').removeClass('tab-hide');
         });
      },

      /* устанавливаем слайдеры*/
      setSliders: function() {

         $('.swiper-container').each(function() {
            var $this = $(this),
               // пагинация
               $pag = $this.find('.swiper-pagination'),
               // слайды
               $slides = $this.find('.swiper-slide'),
               // счетчик слайдов
               countSlider = $slides.length,
               // стрелка
               $arrows = $this.find('.swiper-button-prev, .swiper-button-next'),
               // булевые параметры для стрелок и пагинации (если слайдов больше 1)
               isArrow = $arrows.length == 2 && countSlider > 1,
               isPag = $pag.length && countSlider > 1;

            $this.wrap('<div class="slider-div-sizer" style="width: ' + $this.parent().width() + 'px"/>');

            var swiper = new Swiper($this[0], {
               pagination: isPag ? $pag[0] : null,
               paginationClickable: isPag ? true : false,
               prevButton: isArrow ? $arrows[0] : null,
               nextButton: isArrow ? $arrows[1] : null
            });
         });
      },

      resize: function() {
         // var resizeTimer;
         $(window).resize(function() {
            // if(resizeTimer){
            // 	clearTimeout(resizeTimer);
            // }
            // resizeTimer = setTimeout(function(){
            $('.slider-div-sizer').each(function() {
               var $this = $(this);
               $this.css({
                  width: '0'
               });
               $this.css({
                  width: $this.parent().width()
               })
            });
            // }, 100);
         })
      }
   };

})();

$(function() {
   app.init();
});