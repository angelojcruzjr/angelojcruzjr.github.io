// fittext
(function( $ ){ $.fn.fitText = function( kompressor, options ) { var compressor = kompressor || 1, settings = $.extend({'minFontSize' : Number.NEGATIVE_INFINITY,'maxFontSize' : Number.POSITIVE_INFINITY }, options); return this.each(function(){ var $this = $(this); var resizer = function () { $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize))); }; resizer(); $(window).on('resize', resizer); }); }; })( jQuery );

// swipe left/right
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

// APPLICATION
(function(window, $, undefined) {
	
	/* cache vars -----------------  */	
	var APPLICATION = window.APPLICATION || {};
	var $window = $(window);
	var $document = $(document);
	var $slides = $('.slide');

	APPLICATION.inited = true;

	APPLICATION.touch = false;
	APPLICATION.mobile = false;
	if ($window.width() <= 480) {
		APPLICATION.mobile = true;
	}
	if (Modernizr.touch) {
			APPLICATION.touch = true;
	}

	/* init -----------------  */
	APPLICATION.init = function() {
		// Initial rendering
		setTimeout(function() {
			$("#slides").addClass('init');			
		},500);

		APPLICATION.events.onPopState();

		// Show view pane
		if (window.location.pathname !== '' && window.location.pathname !== '/') {
			setTimeout(function(){
				APPLICATION.events['onKeyTop']();
			}, 250);
		}

		if (APPLICATION.touch == false) {
			// Arrow keypress
			$window.keydown(function(event) {
				switch (event.which) {
					case 38:
						APPLICATION.events['onKeyTop'](); break;
					case 39:
						APPLICATION.events['onKeyRight'](); break;
					case 40:
						APPLICATION.utils.hideAboutPane();
					case 27:
						APPLICATION.events['onKeyBottom'](); break;
					case 37:
						APPLICATION.events['onKeyLeft'](); break;
				}
			});
		}

		if (APPLICATION.touch == true) {
			// start swipe listners
			$(".slide").touchwipe({
			     wipeLeft: function() { APPLICATION.events['onKeyRight'](); },
			     wipeRight: function() { APPLICATION.events['onKeyLeft'](); },
			     wipeUp: function() { APPLICATION.events['onKeyDown'](); },
			     wipeDown: function() { APPLICATION.events['onKeyUp'](); },
			     min_move_x: 20,
			     min_move_y: 20,
			     preventDefaultEvents: true
			});
		}

		if (APPLICATION.mobile == false) {
			// resize slide text
			$slides.fitText(.78);
		}

		if (APPLICATION.mobile == true) {
			// start orientation listeners
			APPLICATION.events.onOrientation();
			$window.bind('orientationchange', APPLICATION.events.onOrientation);
		}

		// Arrow clicks
		$document.on('click', '#keys a', function(event) {
			event.preventDefault();
			APPLICATION.events['on'+$(this).attr('id')]();
		});

		// Open click
		$document.on('click', '.open', function(event) {
			event.preventDefault();
			event.stopPropagation();
			APPLICATION.events['onKeyTop']();
		});

		// Close click
		$document.on('click', '.close', function(event) {
			event.preventDefault();
			event.stopPropagation();
			APPLICATION.events['onKeyBottom']();
		});

		// Ticker click
		$document.on('click', '#ticker, .slide', function(event) {
			event.preventDefault();
			APPLICATION.events['onKeyRight']();
		});

		// about click
		$document.on('click', '#about-trigger', function(event) {
			event.preventDefault();
			APPLICATION.utils.showAboutPane();
		});
		$document.on('click', '#about-trigger.close', function(event) {
			event.preventDefault();
			APPLICATION.utils.hideAboutPane();
		});
	};

	/* events -----------------  */
	APPLICATION.events = {
		onResize: function() {
			APPLICATION.utils.setTickerWidth();
			APPLICATION.utils.setTickerPosition();
		},
		onOrientation: function() {
			switch(window.orientation) {
				case 0:
					$('body').removeClass('landscape').addClass('portrait').height($window.height()+60);
					break;

				case 90:
				case -90:
					$('body').removeClass('portrait').addClass('landscape').height($window.height()+60);
					break;
			}
			window.scrollTo(0, 1);
		},
		onPopState: function(force) {
			var force = force || false;
			if (APPLICATION.inited || force) {
				APPLICATION.utils.togglePanes();
				APPLICATION.utils.setCurrentSlide(APPLICATION.utils.getView());
				APPLICATION.utils.redrawView();
			}
			else {
				APPLICATION.inited = true;
			}
		},
		onKeyTop: function (view) {
			if ($('#about-pane').hasClass('show')) {
				APPLICATION.utils.hideAboutPane();
			} else {
				if (typeof view == 'undefined') {
					var view = $('.current').data('view');
				}
				APPLICATION.utils.hideAboutPane();
				APPLICATION.utils.showPanes();
				APPLICATION.paths.push({'title':view, 'path':'/'+view});
				APPLICATION.utils.flashKey('KeyTop');
			}

			if (APPLICATION.touch == true) {
				window.scrollTo(0, 1);
			}
		},
		onKeyRight: function () {
			APPLICATION.utils.nextSlide();
			APPLICATION.utils.redrawView();
			APPLICATION.utils.flashKey('KeyRight');
			if ($('#panes').hasClass('show')) {
				var view = $('.current').data('view');	
				APPLICATION.paths.push({'title':view, 'path':'/'+view});
			}
		},
		onKeyBottom: function () {
			if ($('#panes').hasClass('show')) {
				APPLICATION.utils.hidePanes();
				APPLICATION.paths.push({'title':'home', 'path':'/'});
				APPLICATION.utils.flashKey('KeyBottom');
			} else {
				APPLICATION.utils.toggleAboutPane();
			}

			if (APPLICATION.touch == true) {
				window.scrollTo(0, 1);
			}
		},
		onKeyLeft: function () {
			APPLICATION.utils.prevSlide();
			APPLICATION.utils.redrawView();
			APPLICATION.utils.flashKey('KeyLeft');
			if ($('#panes').hasClass('show')) {
				var view = $('.current').data('view');
				APPLICATION.paths.push({'title':view, 'path':'/'+view});
			}
		}
	};

	/* utilities -----------------  */
	APPLICATION.utils = {
		setTickerWidth: function() {
			$('#ticker-moment').css({width:APPLICATION.utils.getTickerWidth});
		},
		getTickerWidth: function() {
			// Set the gutter -- the left and right of track
			if (APPLICATION.touch == false) {
				var gutter = 292;
			} else {
				var gutter = 145;
			}
			return (($window.width()-gutter) / $('.slide').size());
		},
		setTickerPosition: function() {
			// Set the left gutter
			if (APPLICATION.touch == false) {
				var leftGutter = 168;
			} else {
				var leftGutter = 64;
			}
			var newPosition = (($('.slide.current').index()) * APPLICATION.utils.getTickerWidth()) + leftGutter;
			$('#ticker-moment').css({left:newPosition+'px'});
		},
		setCurrentPane: function(view) {
			APPLICATION.utils.setCurrentTitle(view);
			$('.pane').css({display:'none'});
			$('.pane[data-view="'+$('.slide.current').data('view')+'"]').css({display:'block'});
		},
		setCurrentSlide: function(view) {
			$('.slide.current').removeClass('current');
			$('.slide[data-view="'+view+'"]').addClass('current');
		},
		setCurrentTitle: function(view) {
			$('title').html('APPLICATION: '+$('.pane[data-view="'+$('.slide.current').data('view')+'"] img').attr('alt'));
		},
		nextSlide: function() {
			$slides.each(function() {
				var x = $(this).attr('data-order');
				x = parseInt(x);
				if (x == 1) {
					x = $slides.length;
				} else {
					x--;
				}
				x = x.toString();
				$(this).attr('data-order', x);
				if (x == 1) {
					APPLICATION.utils.setCurrentSlide($(this).data('view'));
				}
			});			
		},
		prevSlide: function() {
			$slides.each(function() {
				var x = $(this).attr('data-order');
				x = parseInt(x);
				if (x == $slides.length) {
					x = 1;
				} else {
					x++;
				}
				x = x.toString();
				$(this).attr('data-order', x);
				if (x == 1) {
					APPLICATION.utils.setCurrentSlide($(this).data('view'));
				}
			});
		},
		setCurrentDate: function(view) {
			$('.date.current').removeClass('current');
			$('.date[data-view="'+$('.slide.current').data('view')+'"]').addClass('current');
		},
		showPanes: function() {
			if (!$('#panes').hasClass('show')) {
				$('#panes').removeClass('hide').addClass('show');
				$('#track, #slides').addClass('adjusted');
			}
		},
		hidePanes: function() {
			if ($('#panes').hasClass('show')) {
				$('#panes').removeClass('show').addClass('hide');
				$('#track, #slides').removeClass('adjusted');
			}
		},
		togglePanes: function() {
			if (!window.location.pathname || window.location.pathname === '/')
				APPLICATION.utils.hidePanes();
			else
				APPLICATION.utils.showPanes();
		},
		showAboutPane: function() {
			if (!$('#about-pane').hasClass('show')) {
				APPLICATION.utils.hidePanes();
				$('#about-trigger').addClass('close');
				$('#about-pane').addClass('show');
				$('#track, #slides').addClass('blur');
			}
		},
		hideAboutPane: function() {
			if ($('#about-pane').hasClass('show')) {
				$('#about-trigger').removeClass('close');
				$('#about-pane').removeClass('show');
				$('#track, #slides').removeClass('blur');
			}
		},
		toggleAboutPane: function() {
			console.log('g');
			if ($('#about-pane').hasClass('show')) {
				console.log('e');
				APPLICATION.utils.hideAboutPane();
			}
			else {
				console.log('d');
				APPLICATION.utils.showAboutPane();
			}
		},
		flashKey: function(key) {
			$('#'+key).addClass('active');
			setTimeout(function() {
				$('.active').removeClass('active');
			},250);
		},
		getView: function() {
			if (!window.location.pathname || window.location.pathname === '/') {
				return 'intro'; // home
			} else {
				return APPLICATION.paths.split()[1];
			}
		},
		redrawView: function() {
			APPLICATION.utils.setCurrentPane();
			APPLICATION.utils.setCurrentDate();
			APPLICATION.utils.setTickerPosition();
			APPLICATION.utils.setTickerWidth();
		}
	};

	/* paths ----------------*/
	APPLICATION.paths = {
		split: function() {
			return window.location.pathname.split('/');
		},
		push: function(view) {
			history.pushState(view, view.title, view.path);
		}
	};

	$(APPLICATION.init);
	$window.resize(APPLICATION.events.onResize);
	window.onpopstate = function() {
  		APPLICATION.events.onPopState();
	}

})(window, jQuery);