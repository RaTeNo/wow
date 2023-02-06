$(() => {
	// Ширина окна для ресайза
	WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


	// Промо акция
	$('header .top_banner .close_btn').click(function (e) {
		e.preventDefault()

		$('header .top_banner').slideUp(200)
	})


	// Карусель товаров
	const productsSliders = [],
		products = document.querySelectorAll('.products .swiper')

	products.forEach(function (el, i) {
		el.classList.add('products_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			breakpoints: {
				0: {
					spaceBetween: 24,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 2
				},
				1280: {
					spaceBetween: 132,
					slidesPerView: 2
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})


	// Страница товара
	if ($('.product_info .images .swiper').length) {
		new Swiper('.product_info .images .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			breakpoints: {
				0: {
					spaceBetween: 24,
					slidesPerView: 'auto'
				},
				480: {
					spaceBetween: 0,
					slidesPerView: 1
				}
			}
		})
	}


	// Моб. меню
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('body').addClass('menu_open')
		$('.mob_menu').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('.mob_menu .close_btn').click((e) => {
		e.preventDefault()

		$('body').removeClass('menu_open')
		$('.mob_menu').removeClass('show')
		$('.overlay').fadeOut(200)
	})


	// Поиск
	$('header .search_btn, .mob_menu .search_btn').click(function (e) {
		e.preventDefault()

		$('.search, .overlay').fadeIn(300)

		if ($(this).closest('.mob_menu').length) {
			$('body').removeClass('menu_open')
			$('.mob_menu').removeClass('show')
		}

		setTimeout(() => $('.search form .input').focus())
	})

	$('.search .close_btn').click(function (e) {
		e.preventDefault()

		$('.search, .overlay').fadeOut(200)
	})


	$('.overlay').click(function (e) {
		e.preventDefault()

		$('.search, .overlay').fadeOut(200)

		$('body').removeClass('menu_open')
		$('.mob_menu').removeClass('show')
		$('.overlay').fadeOut(200)
	})


	// Моб. смена вида в категории
	$('.filter .change_mob_view_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$('.products .row').toggleClass('big')
	})


	// Фильтр
	$('.filter .form label').click(function (e) {
		if (e.target.nodeName == 'LABEL') {
			let parent = $(this).closest('.field'),
				text = []

			setTimeout(() => {
				let inputs = parent.find('input:checked')

				inputs.each(i => text.push($(inputs[i]).next('div').text()))

				parent.find('.mini_modal_btn .selected').text(text.join(', '))
				parent.find('.mini_modal_btn').addClass('with_selected')
			})
		}
	})


	// Добавление товара в корзину
	$('.product_info .buy_btn').click(function (e) {
		e.preventDefault()

		$(this).hide()
		$('.product_info .amount').css('display', 'flex')
	})


	// Аккордион
	$('body').on('click', '.accordion .accordion_item .head', function (e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(300)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			minimum = parseFloat($input.data('minimum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal > minimum) $input.val(inputVal - step + unit)
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			maximum = parseFloat($input.data('maximum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal < maximum) $input.val(inputVal + step + unit)
	})

	$('.amount .input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})


	// Мини всплывающие окна
	$('.mini_modal_btn').click(function (e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Применить баллы
	$('.apply_points .form .type label').click(function (e) {
		if (e.target.nodeName == 'LABEL') {
			setTimeout(() => {
				let type = $('.apply_points .form .type input:checked').val()

				type == '1'
					? $('.apply_points .form .fields').addClass('show')
					: $('.apply_points .form .fields').removeClass('show')
			})
		}
	})


	// Оформление заказа - авторизация
	$('.checkout_auth .form1').submit(function (e) {
		e.preventDefault()

		$('.checkout_auth .form1').removeClass('show')
		$('.checkout_auth .form2').addClass('show')
	})


	// Оформление заказа
	$('.checkout_info .delivery_method label').click(function (e) {
		if (e.target.nodeName == 'LABEL') {
			let _self = $(this)

			setTimeout(() => {
				let info = _self.data('info')

				$('.checkout_info .delivery_info').hide()
				$('.checkout_info .delivery_info' + info).fadeIn(300)
			})
		}
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="images/sprite.svg#ic_close"></use></svg>',
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}


	// Всплывающие окна
	$('body').on('click', '.modal_btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('modal'),
			type: 'inline'
		}])
	})

	$('body').on('click', '.modal .close_btn', function (e) {
		e.preventDefault()

		Fancybox.close()
	})


	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Моб. подвал
	if (WW < 480) {
		$('footer .title').click(function (e) {
			e.preventDefault()

			$(this).toggleClass('active').next().slideToggle(300)
		})
	}


	// Выбор страны телефона
	var input = document.querySelector('#input_phone')

	if (input) {
		window.intlTelInput(input, {
			initialCountry: 'auto',
			geoIpLookup: function (callback) {
				$.get('https://ipinfo.io', function () { }, 'jsonp').always(function (resp) {
					let countryCode = (resp && resp.country) ? resp.country : "us"

					callback(countryCode)
				})
			},
			separateDialCode: true,
			preferredCountries: []
		})
	}


	// Фокус при клике на название поля
	$('body').on('click', '.form .label', function () {
		$(this).closest('.line').find('.input, textarea').focus()
	})


	// Маска ввода
	$('.card_number_input').inputmask('9999 9999 9999 9999')
	$('.card_date_input').inputmask('99 / 99')
	$('.card_cvv_input').inputmask('999')


	// Выбор файла
	const fileInputs = document.querySelectorAll('form input[type=file]')

	if (fileInputs) {
		fileInputs.forEach(el => {
			el.addEventListener('change', () => el.closest('.file').querySelector('label .path').innerText = el.value)
		})
	}


	if (is_touch_device()) {
		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', (e) => { ts = e.originalEvent.touches[0].clientX })

		$('body').on('touchend', (e) => {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
			} else if (ts < te - 50) {
				// Свайп слева на право
				$('body').removeClass('menu_open')
				$('.mob_menu').removeClass('show')
				$('.overlay').fadeOut(300)
			}
		})
	}


	// Регистрация - успешная
	$('.register .form').submit(function (e) {
		e.preventDefault()

		Fancybox.show([{
			src: '#register_success_modal',
			type: 'inline'
		}])
	})


	// Копирование промокода
	const clipboard = new ClipboardJS('.copy_btn')

	clipboard.on('success', (e) => {
		$(e.trigger).addClass('copied')

		setTimeout(() => $(e.trigger).removeClass('copied'), 3000)

		e.clearSelection()
	})
})



$(window).on('load', () => {
	// Первый блок - Пачка корма
	if ($('.first_section .image').length) {
		firstSectionImage = $('.first_section .image'),
			firstSectionImageStop = $('.philosophy .row').offset().top - firstSectionImage.outerHeight() - parseInt($('.philosophy .row').css('margin-top')) + 40

		if (WW > 1023 && $(window).scrollTop() < firstSectionImageStop) {
			firstSectionImage.css('top', $(window).scrollTop() + 'px')
		}
	}
})



$(window).on('resize', () => {
	let windowW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Моб. версия
		if (!firstResize) {
			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'

			firstResize = true
		} else {
			firstResize = false
		}


		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
	}
})



$(window).on('scroll', () => {
	// Первый блок - Пачка корма
	if ($('.first_section .image').length && typeof firstSectionImageStop != 'undefined') {
		if (WW > 1023 && $(window).scrollTop() < firstSectionImageStop) {
			firstSectionImage.css('top', $(window).scrollTop() + 'px')
		}
	}
})