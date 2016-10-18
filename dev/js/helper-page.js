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

			this.setMapsite();
			this.setMenuMobile();
			this.resize();
		},

		setMenuMobile: function() {
			$('body')
				.on('click', '.mobile-menu', function(e) {
					e.preventDefault();
					var $hdr = $('.header-downer.mobile'),
						isO = $hdr.hasClass('active');
					$hdr.removeClass('active');
					$hdr.empty()
					if(!isO){
						$hdr.append($('header .header-upper-left ul li, header .desktop .header-nav ul li').clone());
						$hdr.addClass('active');
					}

				}).on('click', '.header-downer.mobile li a', function(e) {
					var $this = $(this),
						$next = $this.next(),
						isNext = $next.length,
						isActive = $next.hasClass && $next.hasClass('active');
					$('.header-downer.mobile li .header-nav-items').removeClass('active').stop().slideUp();
					if (isNext) {
						if (isActive) {
							return false;
						}
						e.preventDefault();
						$next.stop().slideDown();
						$next.addClass('active');
					}

				});
		},

		setMapsite: function() {
			$('body').on('click', '.main-mapsite-title', function(e) {
				e.preventDefault();
				var $this = $(this),
					isActive = $this.hasClass('active');
				if ((window.outerWidth > 940 && window.innerWidth > 940 )) {
					return false;
				};
				$('.main-mapsite-list').stop().slideUp();
				$('.main-mapsite-title, .main-mapsite-list').removeClass('active');
				if (isActive) {
					return false;
				}
				$this.addClass('active').next().stop().slideDown(300, function() {
					$this.addClass('active');
					$this.next().addClass('active');
				});
			});
		},

		setDotdotdot: function() {
			$(".main-news-item-text, .table-cell.text").dotdotdot({
				watch: true
			});
		},

		setMenu: function() {
			var self = this,
				downPane = $('header .header-downer-nav-slider');

			$('body')
				.on('click', 'header .header-nav li', function(event) {
					event.preventDefault();

					var $this = $(this),
						allLi = $('header .header-nav li'),
						isOpen = $this.hasClass('hover');


					downPane.empty();
					$('header .header-downer-popup-item').removeClass('shower');
					$('header .header-nav li, header [data-navigate-popup].header-nav-item').removeClass('hover');

					if (isOpen) {
						return false;
					}

					$('header .header-nav li, header [data-navigate-popup].header-nav-item').removeClass('hover');

					var $content = $this.find('.swiper-wrapper'),
						$swiper = $content.clone().wrap('<div class="swiper-container" />', {}),
						$ps = $swiper.parent();

					$this.addClass('hover');

					downPane
						.append($ps)
						.append('<div class="swiper-button-next material swiper-button">keyboard_arrow_right</div><div class="swiper-button-prev material swiper-button">keyboard_arrow_left</div>');

					self.SLIDERS_ARR.push(new Swiper($ps[0], {
						slidesPerView: 'auto',
						prevButton: downPane.find('.swiper-button-prev')[0],
						nextButton: downPane.find('.swiper-button-next')[0]
					}));

				})
				.on('click', 'header [data-navigate-popup].header-nav-item', function(event) {
					event.preventDefault();
					var $this = $(this),
						datathis = $this.data('navigate-popup');
					if ($this.hasClass('hover')) {
						$('header [data-navigate-popup].header-nav-item').removeClass('hover')
						$('header .header-downer-popup-item').removeClass('shower')
						return false;
					}
					$('header [data-navigate-popup].header-nav-item').removeClass('hover').filter($this).addClass('hover');
					$('header .header-downer-popup-item')
						.removeClass('shower')
						.filter('[data-navigate-popup="' + datathis + '"]')
						.addClass('shower');
				})
				.on('click', '*', function(event) {
					var trgt = $(event.target);
					trgt = trgt.closest('header .header-downer-popup, header .header-downer .header-nav, header .header-downer');
					if (!trgt.length && $('.header-nav li.hover').length) {
						event.preventDefault();
						$('header .header-downer-popup-item').removeClass('shower');
						$('header .header-nav li, header [data-navigate-popup].header-nav-item').removeClass('hover');
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
			$('body').on('click', '.tabs .tabs-header a', function(e) {
				e.preventDefault();
				var $this = $(this),
					$containter = $this.closest('.tabs-container');
				$containter.find('.tabs-header').find('a').removeClass('active').filter($this).addClass('active');
				$containter.find('.tabs-body [data-tab]').addClass('tab-hide').filter('[data-tab="' + $this[0].hash.substr(1) + '"]').removeClass('tab-hide');
				var sll = self.SLIDERS_ARR.length;
				for (var s = 0; s < sll; s++) {
					if (self.SLIDERS_ARR[s].update) {
						self.SLIDERS_ARR[s].update();
					}
				}
			});
			$('.tabs .tabs-header').each(function(){
				$(this).find('a:first').click()
			});
		},

		/* устанавливаем слайдеры*/
		setSliders: function() {

			var self = this;
			$('.swiper-container').each(function() {
				var $this = $(this),
					// пагинация
					$pag = $this.parent().find('.swiper-pagination'),
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

				$this.css({width: '100%'}).wrap('<div class="slider-div-sizer" style="width: ' + $this.parent().width() + 'px"/>');

				self.SLIDERS_ARR.push(new Swiper($this[0], {
					pagination: isPag ? $pag[0] : null,
					paginationClickable: isPag ? true : false,
					prevButton: isArrow ? $arrows[0] : null,
					nextButton: isArrow ? $arrows[1] : null,
					autoplay: autoplay ? autoplay : null,
					loop: isLoop
				}));

				setTimeout(function(){
					var sll = self.SLIDERS_ARR.length;
					for (var s = 0; s < sll; s++) {
						if (self.SLIDERS_ARR[s].update) {
							self.SLIDERS_ARR[s].update();
						}
					}
				}, 1000)
			});
		},

		resize: function() {
			var self = this;
			var resizeTimer;
			$(window).resize(function() {
				if (resizeTimer) {
					clearTimeout(resizeTimer);
				}
				$('.slider-div-sizer').each(function() {
					var $this = $(this);
					$this.css({
						width: '0'
					});
					$this.css({
						width: $this.parent().width()
					})
				});
				resizeTimer = setTimeout(function() {
					$('.main-mapsite-list')[(window.outerWidth > 940 && window.innerWidth > 940 )? 'show' : 'hide']();
					$('.main-mapsite-title').removeClass('active');
					var sll = self.SLIDERS_ARR.length;
					for (var s = 0; s < sll; s++) {
						if (self.SLIDERS_ARR[s].update) {
							self.SLIDERS_ARR[s].update();
						}
					}

				}, 1000);

			})

		}
	};

})();

$(function() {
	app.init();
});