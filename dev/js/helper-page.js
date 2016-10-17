var app = {};


(function() {


	app = {

		init: function() {
			this.setSliders();
			this.setTabs();
			this.setScroll();
			this.resize();
		},

		setScroll: function(){
			$('.info-component-content').customScroll({
				padding: 0,
				vertical: true,
				horizontal: false,
				className: 'custom-scroll_container'
			})
		},
		setTabs: function() {
			$('body').on('click', '.tabs-header a', function(e){
				e.preventDefault();
				var $this = $(this);
				$this.closest('.tabs-header').find('a').removeClass('active').filter($this).addClass('active');
				$this.closest('.wrap').find('.tabs-body').find('[data-tab]').addClass('tab-hide').filter('[data-tab="'+$this[0].hash.substr(1)+'"]').removeClass('tab-hide');
			});
		},

		/* устанавливаем слайдеры*/
		setSliders: function() {

			$('.swiper-container').parent().each(function() {
				var $this = $(this).find('.swiper-container'),
					// пагинация
					$pag = $(this).find('.swiper-pagination'),
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
						nextButton: isArrow ? $arrows[1] : null,

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