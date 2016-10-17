var app = {};

(function() {

	app = {
		SLIDERS_ARR: [],

		init: function() {
			this.setSliders();
			this.setTabs();
			this.setScroll();

			this.setMenu();
			this.setDotdotdot();

			this.resize();

		},

		setDotdotdot: function() {
			$(".main-news-item-text, .table-cell.text").dotdotdot({watch:true});
		},

		setMenu: function() {
			var self = this;
			var downPane = $('.header-downer-nav-slider');

			$('body')
				.on('click', '.header-nav li', function(event) {
					event.preventDefault();

					var $this = $(this),
						allLi = $('.header-nav li');

					if ($this.hasClass('hover')) {
						downPane.empty();
						$('.header-downer-popup-item').removeClass('shower');
						$('.header-nav li, [data-navigate-popup].header-nav-item').removeClass('hover');
						return false;
					}

					var $content = $this.find('.swiper-wrapper'),
						$swiper = $content.clone().wrap('<div class="swiper-container" />', {}),
						$ps = $swiper.parent();

					$('.header-nav li').removeClass('hover').filter($this).addClass('hover');

					downPane
						.empty()
						.append($ps)
						.append('<div class="swiper-button-next material swiper-button">keyboard_arrow_right</div><div class="swiper-button-prev material swiper-button">keyboard_arrow_left</div>');

					self.SLIDERS_ARR.push(new Swiper($ps[0], {
						slidesPerView: 'auto',
						prevButton: downPane.find('.swiper-button-prev')[0],
						nextButton: downPane.find('.swiper-button-next')[0]
					}));

				})
				.on('click', '[data-navigate-popup].header-nav-item', function(event) {
					event.preventDefault();
					var $this = $(this),
						datathis = $this.data('navigate-popup');
					if ($this.hasClass('hover')) {
						$('[data-navigate-popup].header-nav-item').removeClass('hover')
						$('.header-downer-popup-item').removeClass('shower')
						return false;
					}
					$('[data-navigate-popup].header-nav-item').removeClass('hover').filter($this).addClass('hover');
					$('.header-downer-popup-item')
						.removeClass('shower')
						.filter('[data-navigate-popup="' + datathis + '"]')
						.addClass('shower');
				})
				.on('click', '*', function(event) {
					var trgt = $(event.target);
					trgt = trgt.closest('.header-downer-popup, .header-downer .header-nav, .header-downer');
					if (!trgt.length && $('.header-nav li.hover').length) {
						event.preventDefault();
						$('.header-downer-popup-item').removeClass('shower');
						$('.header-nav li, [data-navigate-popup].header-nav-item').removeClass('hover');
						downPane.empty();
					}
				})

		},

		setScroll: function() {
			var self = this;
			$('.info-component-content').customScroll({
				padding: 0,
				vertical: true,
				horizontal: false,
				className: 'custom-scroll_container'
			})
		},
		setTabs: function() {
			var self = this;
			$('body').on('click', '.tabs-header a', function(e) {
				e.preventDefault();
				var $this = $(this);
				$this.closest('.tabs-header').find('a').removeClass('active').filter($this).addClass('active');
				$('.tabs-body').find('[data-tab]').addClass('tab-hide').filter('[data-tab="' + $this[0].hash.substr(1) + '"]').removeClass('tab-hide');
			});
		},

		/* устанавливаем слайдеры*/
		setSliders: function() {

			var self = this;
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
					isPag = $pag.length && countSlider > 1,

					autoplay = $this.data('autoplay');
				isLoop = autoplay ? true : false;

				$this.wrap('<div class="slider-div-sizer" style="width: ' + $this.parent().width() + 'px"/>');

				self.SLIDERS_ARR.push(new Swiper($this[0], {
					pagination: isPag ? $pag[0] : null,
					paginationClickable: isPag ? true : false,
					prevButton: isArrow ? $arrows[0] : null,
					prevButton: isArrow ? $arrows[0] : null,
					autoplay: autoplay ? autoplay : null,
					loop: isLoop
				}));
			});
		},

		resize: function() {
			var self = this;
			var resizeTimer;
			$(window).resize(function() {
				if (resizeTimer) {
					clearTimeout(resizeTimer);
				}
				resizeTimer = setTimeout(function() {
					$('.slider-div-sizer').each(function() {
						var $this = $(this);
						$this.css({
							width: '0'
						});
						$this.css({
							width: $this.parent().width()
						})
					});
					var sll = self.SLIDERS_ARR.length;
					for (var s = 0; s < sll; s++) {
						if (self.SLIDERS_ARR[s].update) {
							self.SLIDERS_ARR[s].update();
						}
					}
				}, 0);

			})

		}
	};

})();

$(function() {
	app.init();
});