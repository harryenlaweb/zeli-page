(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 

	/* Preloader Effect JS */
	$(window).on("load", function () {
		setTimeout(function () {
			$(".preloader").fadeOut(1000); 
		}, 700); 
	});
	
	/* Sticky Header JS */	
	if ($('.active-sticky-header').length) {

		const $window = $(window);
		const $mainHeader = $(".main-header");
		const $stickyHeader = $('header .header-sticky');

		function setHeaderHeight() {
			$mainHeader.css("height", $stickyHeader.outerHeight());
		}

		$window.on('resize', setHeaderHeight);

		$stickyHeader.removeClass("active hide");

		$window.on("scroll", function () {
			var fromTop = $window.scrollTop();
			setHeaderHeight();

			var siteHeaderHeight = $mainHeader.outerHeight();

			if (fromTop > siteHeaderHeight) {
				$stickyHeader.addClass("active").removeClass("hide");
			} else {
				$stickyHeader.removeClass("active hide");
			}
		});
	}

    /* Active Navigation Js */
	document.addEventListener("DOMContentLoaded", () => {
		let page = location.pathname.split("/").pop().toLowerCase();
		if (!page || page === "/") page = "index.html";

		document.querySelectorAll("#sisf-page-header .navbar-nav .nav-link").forEach(link => {
			let href = (link.getAttribute("href") || "").split("/").pop().toLowerCase();

			if (href === "./" || href === "") href = "index.html";

			if (href === page) {
			link.classList.add("active");

			let parent = link.closest("li.submenu");
			while (parent) {
				const parentLink = parent.querySelector(":scope > .nav-link");
				if (parentLink) parentLink.classList.add("active");
				parent = parent.parentElement.closest("li.submenu");
			}
			}
		});
	});

	/* Mobile Menu Handling */
	const initialMenuItems = $('#menu > li').toArray();
	const initialMenu2Items = $('#menu2 > li').toArray();

	const handleMobileMenus = () => {
        const isMobile = $window.width() <= 768;
        const hasSlickNav = $(".slicknav_nav").length > 0;

        if (isMobile && !hasSlickNav) {
            $("#menu2").children().appendTo("#menu");
            $("#menu").slicknav({ label: "", prependTo: ".responsive-menu" });
        } else if (!isMobile && hasSlickNav) {
            $("#menu").slicknav("destroy");

            $("#menu > li").not(initialMenuItems).appendTo("#menu2");
            initialMenu2Items.forEach((item) => $(item).appendTo("#menu2"));
            initialMenuItems.forEach((item) => $(item).appendTo("#menu"));
        }
    };

	/* Run the function on page load */
    handleMobileMenus();
	
	if($(".orderby").length > 0 ) {
		$(".orderby").select2();  
	}
	let resizeTimeout;

	/* Re-run the function on window resize */
	$window.on("resize", function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(handleMobileMenus, 200); // Delay execution
	});
	
	/* Scroll to Top */
    $(document).on("click", "a[href='#top']", function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

	/* Initialize Swiper Sliders */
    const initSwiper = (selector, options) => {
        if ($(selector).length) {
            return new Swiper(selector, options);
        }
        return null;
    };

	const swiperOptions = {
        slidesPerView: 1,
        speed: 1000,
        loop: true,
        autoplay: { delay: 5000 },
    };


        /* Hero Slider Start */
	    initSwiper(".hero-slider-layout .swiper", {
        ...swiperOptions,
        autoplay: { delay: 5000 },
        pagination: { el: ".hero-pagination", clickable: true },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        on: {
            init: function () {
                animateActiveSlideText(); 
            },
            slideChangeTransitionStart: function () {
                animateActiveSlideText(); 
            }
        }
    });

    function animateActiveSlideText() {
        gsap.set(".text-anime-style-2", { clearProps: "all" });

        const activeSlide = document.querySelector(".swiper-slide-active");
        const animatedTextElements = activeSlide.querySelectorAll(".text-anime-style-2");

        animatedTextElements.forEach((element) => {
            const animationSplitText = new SplitText(element, { type: "chars, words" });

            gsap.from(animationSplitText.chars, {
				opacity: 0,
                duration: 0.11,         
				delay: 0.14,
				x: 250,                 
				autoAlpha: 0,
				stagger: 0.09,         
				ease: "power5.out",
            });
        });
    }
    /* Hero Slider End */

	/* Back To Top Button */
    const backToTop = document.getElementById('backToTop');
		window.addEventListener('scroll', () => {
			if (window.scrollY > 300) {
				backToTop.classList.add('show');
			} else {
				backToTop.classList.remove('show');
			}
		});

		backToTop.addEventListener('click', function (e) {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
    });

	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		let animated = false;

		$('.skills-progress-bar').waypoint(function () {
			if (!animated) {
			animated = true;

			$('.skillbar').each(function () {
				const $this = $(this);
				const percent = parseInt($this.attr('data-percent'));

				const $countBar = $this.find('.count-bar');
				const $countText = $this.find('.skill-no');

				// Set bar to 0% width initially
				$countBar.css('width', '0');

				// Animate bar width
				$countBar.animate({
				width: percent + '%'
				}, {
				duration: 2000,
				easing: 'swing'
				});

				// Animate number from 0 to percent
				$({ Counter: 0 }).animate({ Counter: percent }, {
				duration: 2000,
				easing: 'swing',
				step: function (now) {
					$countText.text(Math.ceil(now) + '%');
				}
				});
			});
			}
		}, {
			offset: '50%'
		});
        }

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Audio JS */
	const player = new Plyr('#player');

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

	/* Text Effect Animation */
	if ($('.text-anime-style-1').length) {
		let staggerAmount 	= 0.05,
			translateXValue = 0,
			delayValue 		= 0.5,
		   animatedTextElements = document.querySelectorAll('.text-anime-style-1');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.words, {
				duration: 1,
				delay: delayValue,
				x: 20,
				autoAlpha: 0,
				stagger: staggerAmount,
				scrollTrigger: { trigger: element, start: "top 85%" },
			});
		});		
	}
	
	if ($('.text-anime-style-3').length) {				
		let	 staggerAmount 		= 0.03,
			translateXValue	= 40,
			delayValue 		= 0.2,
			easeType 			= "power2.out",
			animatedTextElements = document.querySelectorAll('.text-anime-style-3');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.chars, {
					duration: 1,
					delay: delayValue,
					x: translateXValue,
					autoAlpha: 0,
					stagger: staggerAmount,
					ease: easeType,
					scrollTrigger: { trigger: element, start: "top 85%"},
				});
		});		
	}

	/* Parallaxie JS */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 991))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery Screenshot JS */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, 
			opener: function(element) {
			  return element.find('img');
			}
		}
	});

	/* Contact Form Validation JS */
	$("#contactForm").validator({ focus: false }).on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm("#contactForm", "../kickngoal-html/form-process.php", contactFormSuccess);
        }
    });

	const submitForm = (formId, url, successCallback) => {
        const formData = $(formId).serialize();
        $.post(url, formData, (response) => {
			if (typeof response === "string" && response.trim() === "success") {
				successCallback();
			} else {
				showMsg(false, response);
			}
		});
    };

	const contactFormSuccess = () => {
        $("#contactForm")[0].reset();
        showMsg(true, "Message Sent Successfully!");
    };

    const showMsg = (valid, msg) => {
        $("#msgSubmit").removeClass().addClass(valid ? "text-success" : "text-danger").text(msg);
    };
	/* End - Contact Form Validation JS */

	/* Animated Wow Js */	
	new WOW().init();

	/* Popup Video JS */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	/* Ripple Effect JS */
	var sisfRippleEffect = {
		init: function () {
			var titleHolder = $(".sisf-page-title");
			if ( titleHolder.hasClass("sisf-title--ripple") ) {
				titleHolder.ripples({
					resolution: 512,
					dropRadius: 20,
					perturbance: 1.8,
				});
			}
		}
	}
	sisfRippleEffect.init();

	/* Natural Water Movements */
	(function autoRipple() {
		const $el = $('.sisf-page-title');
		if (!$el.length || !$el.data('ripples')) return;

		const dropDelay = 2000; // ms
		let lastDropTime = performance.now();

		function dropRipple(timestamp) {
			if (timestamp - lastDropTime >= dropDelay) {
				const x = Math.random() * $el.outerWidth();
				const y = Math.random() * $el.outerHeight();
				const dropRadius = 20;
				const strength = 0.08 + Math.random() * 0.08;

				$el.ripples('drop', x, y, dropRadius, strength);
				lastDropTime = timestamp;
			}
			requestAnimationFrame(dropRipple);
		}

		requestAnimationFrame(dropRipple);
	})();

	/* Five Swiper Slider JS */
	initSwiper(".comman--swiper-slider .swiper", {
		...swiperOptions,
		spaceBetween: 10,
		breakpoints: {
			0: {
				slidesPerView: 1,
				centeredSlides: false
			},
			768: {
				slidesPerView: 3,
				centeredSlides: true
			},
			1024: {
				slidesPerView: 6,
				centeredSlides: false
			}
		}
	});

	/* Four Swiper Slider JS */
	initSwiper(".comman-swiper-slider .swiper", {
		...swiperOptions,
		spaceBetween: 15,
		navigation: {
			nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 4,
			}
		}
	});

	/* Three Slider JS */
	initSwiper(".sisf-sis-slider .swiper", {
		...swiperOptions,
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				centeredSlides: false
			},
			768: {
				slidesPerView: 2,
				centeredSlides: false
			},
			1024: {
				slidesPerView: 3,
				centeredSlides: false
			}
		}
	});

	/* Two Slider JS */
	initSwiper(".sisf--sis-slider .swiper", {
		...swiperOptions,
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				centeredSlides: false
			},
			768: {
				slidesPerView: 2,
				centeredSlides: false
			},
			1024: {
				slidesPerView: 2,
				centeredSlides: false
			}
		}
	});

	/* single slider JS */
	document.querySelectorAll('.sisf-single-slider').forEach((sliderContainer, index) => {
		const sliderIndex = index + 1;

		const swiper = new Swiper(sliderContainer.querySelector('.swiper'), {
			...swiperOptions,
			spaceBetween: 10,
			navigation: {
				nextEl: sliderContainer.querySelector(`.custom-icon-right-${sliderIndex}`),
				prevEl: sliderContainer.querySelector(`.custom-icon-left-${sliderIndex}`)
			},
			pagination: {
				el: sliderContainer.querySelector('.swiper-pagination'),
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
					centeredSlides: false
				},
				768: {
					slidesPerView: 1,
					centeredSlides: true
				},
				1024: {
					slidesPerView: 1,
					centeredSlides: true
				}
			}
		});
	});

	/* Section Title Scroll Animation JS */
	if ($('.sisf-m-title--scroll').length) {
        gsap.registerPlugin(ScrollTrigger);
        let sisSectionTitles = document.querySelectorAll(".sisf-m-title--scroll");
        if (sisSectionTitles.length > 0) {
			sisSectionTitles.forEach((container) => {
				var text = new SplitText(container, { type: 'words, chars' });
				text.words.forEach((word) => {
					if (word.children.length > 0) {
						word.children[0].classList.add("first-char");
					}
				});
				gsap.fromTo(text.chars,
					{
						position: 'relative',
						display: 'inline-block',
						opacity: 0.2,
						x: -7,
					},
					{
						opacity: 1,
						x: 0,
						stagger: 0.1,
						scrollTrigger: {
							trigger: container,
							toggleActions: "play pause reverse pause",
							start: "top 90%",
							end: "top 40%",
							scrub: 0.7,
						}
					}
				);
			});
		}
    }

	/* Product Quantity Plus Minus JS */
	$(document).on("click", ".sisf-quantity-minus, .sisf-quantity-plus", function (e) {
        e.preventDefault();
        const $button = $(this);
        const $inputField = $button.siblings(".sisf-quantity-input");
        const step = parseFloat($inputField.data("step")) || 1;
        const max = parseFloat($inputField.data("max"));
        const min = parseFloat($inputField.data("min")) || 1;
        let inputValue = parseFloat($inputField.val()) || min;

        inputValue = $button.hasClass("sisf-quantity-minus") ? Math.max(min, inputValue - step) : (Number.isNaN(max) ? inputValue + step : Math.min(max, inputValue + step));

        $inputField.val(inputValue).trigger("change");
    });

})(jQuery);