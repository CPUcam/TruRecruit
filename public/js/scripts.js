$(document).ready(function() {
	var heightOfWindow = $(window).height();
	$('.hero').css({"height": heightOfWindow.toString() });
	/***************** Waypoints ******************/

	$('.wp1').waypoint(function() {
		$('.wp1').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp2').waypoint(function() {
		$('.wp2').addClass('animated fadeInUp');
	}, {
		offset: '75%'
	});
	$('.wp3').waypoint(function() {
		$('.wp3').addClass('animated fadeInRight');
	}, {
		offset: '75%'
	});

	/***************** Initiate Flexslider ******************/
	$('.flexslider').flexslider({
		animation: "slide"
	});

	/***************** Initiate Fancybox ******************/

	$('.single_image').fancybox({
		padding: 4,
	});

	/***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

	/***************** Nav Transformicon ******************/

	/* When user clicks the Icon */
	$('.nav-toggle').click(function() {
		$(this).toggleClass('active');
		$('.header-nav').toggleClass('open');
		event.preventDefault();
	});
	/* When user clicks a link */
	$('.header-nav li a').click(function() {
		$('.nav-toggle').toggleClass('active');
		$('.header-nav').toggleClass('open');

	});

	/***************** Header BG Scroll ******************/

	$(function() {
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();

			if (scroll >= 20) {
				$('section.navigation').addClass('fixed');
				$('header').css({
					"padding": "1em 0"
				});
				$('header .member-actions').css({
					"top": "1em",
				});
				$('header .navicon').css({
					"top": "10px",
				});
			} else {
				$('section.navigation').removeClass('fixed');
				$('header').css({
					"padding": "50px 0"
				});
				$('header .member-actions').css({
					"top": "50px",
				});
				
				$('header .navicon').css({
					"top": "40px",
				});
			}
		});
	});

	$(function() {
		var emplyBtn = $('.emply');
		var candiBtn = $('.candi');

		var emply = $('.contentEmployeer');
		var candi = $('.contentCanidate');

		emplyBtn.click(function() {
			emply.toggle();
			candi.removeClass('activeBtn');
			emply.addClass('activeBtn');
			if(candi.css('display') != 'none'){
				candi.toggle();

			
			}
			
		});
		candiBtn.click(function() {
			candi.toggle();
			emply.removeClass('activeBtn');
			candi.addClass('activeBtn');
			if(emply.css('display') != 'none'){
				emply.toggle();
			}
		});
	})
	/***************** Smooth Scrolling ******************/

	$(function() {

		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 2000);
					return false;
				}
			}
		});

	});

});
