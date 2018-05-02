// modernizr 2.6.2 (custom build touch detection only)
;window.Modernizr=function(a,b,c){function y(a){i.cssText=a}function z(a,b){return y(l.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b){for(var d in a){var e=a[d];if(!B(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function D(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function E(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return A(b,"string")||A(b,"undefined")?C(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),D(e,b,c))}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:v(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var F in p)x(p,F)&&(u=F.toLowerCase(),e[u]=p[F](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),h=j=null,e._version=d,e._prefixes=l,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return C([a])},e.testAllProps=E,e.testStyles=v,e}(this,this.document);

// fittext
(function( $ ){ $.fn.fitText = function( kompressor, options ) { var compressor = kompressor || 1, settings = $.extend({'minFontSize' : Number.NEGATIVE_INFINITY,'maxFontSize' : Number.POSITIVE_INFINITY }, options); return this.each(function(){ var $this = $(this); var resizer = function () { $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize))); }; resizer(); $(window).on('resize', resizer); }); }; })( jQuery );

// swipe left/right
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

// APPLICATION
(function(window, $, echarts) {

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

		if (APPLICATION.touch == false) {
			// Arrow keypress
			$window.keydown(function(event) {
				switch (event.which) {
					case 39:
						APPLICATION.events['onKeyRight'](); break;
					case 37:
						APPLICATION.events['onKeyLeft'](); break;
				}
			});
		}

		if (APPLICATION.touch == true) {
			// start swipe listners
			$("#bg").touchwipe({
			     wipeLeft: function() { APPLICATION.events['onKeyRight'](); },
			     wipeRight: function() { APPLICATION.events['onKeyLeft'](); },
			     min_move_x: 15,
			     min_move_y: 15,
			     preventDefaultEvents: false
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

		// Ticker click
		$document.on('click', '#ticker, .slide', function(event) {
			event.preventDefault();
			APPLICATION.events['onKeyRight']();
		});

		$document.on('click', '.key-left', function(event) {
			event.stopPropagation();
			APPLICATION.events['onKeyLeft']();
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
				APPLICATION.utils.setCurrentSlide(APPLICATION.utils.getView());
				APPLICATION.utils.redrawView();
			}
			else {
				APPLICATION.inited = true;
			}
		},
		onKeyRight: function () {
			APPLICATION.utils.nextSlide();
			APPLICATION.utils.redrawView();
			APPLICATION.utils.flashKey('KeyRight');
		},
		onKeyLeft: function () {
			APPLICATION.utils.prevSlide();
			APPLICATION.utils.redrawView();
			APPLICATION.utils.flashKey('KeyLeft');
		}
	};

	$('#linkedin').bind('click', function(e) {
		e.preventDefault(); 
		window.open('https://linkedin.com/in/angelojcruz','_blank')
	 });

	/* utilities -----------------  */
	APPLICATION.utils = {
		setTickerWidth: function() {
			$('#ticker-moment').css({width:APPLICATION.utils.getTickerWidth});
		},
		getTickerWidth: function() {
			// Set the gutter -- the left and right of track
			if (APPLICATION.touch === false) {
				var gutter = 292;
			} else {
				var gutter = 145;
			}

			return ($window.width() - gutter) / 2.3;
		},
		setTickerPosition: function() {
			var leftGutter,
				railWidth,
				newPosition;

			leftGutter = 0.085 * $(window).width();
			if ($(window).width() > 556) {
				leftGutter = 160;
				railWidth = $('#track').width() - 340;
			} else {
				leftGutter = 65;
				railWidth = $('#track').width() - 240;
			}
			
			newPosition = ((railWidth / ($slides.length - 1)) * $('.slide.current').index()) + leftGutter;
			$('#ticker-moment').css({left:newPosition + 'px'});
		},
		setCurrentSlide: function(view) {
			$('.slide.current').removeClass('current');
			$('.slide[data-view="'+view+'"]').addClass('current');

			if (view === 'intro') {
				$('#keys-1').show();
				$('#keys-2').hide();
				$('#keys-3').hide();
				$('#keys-4').hide();
			} else if (view === 'deloitte') {
				$('#keys-1').hide();
				$('#keys-2').show();
				$('#keys-3').hide();
				$('#keys-4').hide();
			} else if (view === 'boozAllen') {
				$('#keys-1').hide();
				$('#keys-2').hide();
				$('#keys-3').show();
				$('#keys-4').hide();
			} else {
				$('#keys-1').hide();
				$('#keys-2').hide();
				$('#keys-3').hide();
				$('#keys-4').show();
			}
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
		showAboutPane: function() {
			if (!$('#about-pane').hasClass('show')) {
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
			if ($('#about-pane').hasClass('show')) {
				APPLICATION.utils.hideAboutPane();
			}
			else {
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

	var paneContainerHeight = 0;

	// Add any resizing events here...
	window.addEventListener('resize', function() {
		drawVizzes();
	});

	function drawVizzes() {
		var techChart = echarts.init(document.getElementById('technical-proficiencies-viz')),
			bizChart = echarts.init(document.getElementById('business-proficiencies-viz')),
			scatterChart = echarts.init(document.getElementById('scatter-viz')),
			mapChart = echarts.init(document.getElementById('map-viz')),
			mapData = [],
			techOption,
			businessOption,
			scatterOption,
			mapOption;

		barOption = {
			color: ['#4FA4DE'],
			title : {
				text: 'Technical Proficiences',
				subtext: 'my geeky side',
				x: 'center',
				textStyle: {
					fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
				}
			},
			tooltip : {
				trigger: 'axis',
				axisPointer : {
					type : 'shadow'
				},
				formatter: function (d) {
					var returnArr = [],
						data = d[0];

					if (data.axisValue === 'JavaScript' || data.axisValue === 'HTML' || data.axisValue === 'CSS') {
						returnArr.push(
							'<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>' 
						);
						returnArr.push(
							'Professional Experience'
						);
					} else if (data.axisValue === 'Java' || data.axisValue === 'SQL' || data.axisValue === 'Python') {
						returnArr.push(
							'<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>'
						);
						returnArr.push(
							'College and Professional Experience'
						);
					} else {
						returnArr.push(
							'<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>'
						);
						returnArr.push(
							'College Experience'
						);
					}

					return returnArr.join('');
				},
				textStyle: {
					fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: ['JavaScript', 'HTML', 'CSS', 'Java', 'SQL', 'Python', 'C/C++', 'Linux', 'Hadoop/HDFS', 'AWS'],
					nameTextStyle: {
						fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					nameTextStyle: {
						fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
					}
				}
			],
			series : [
				{
					type: 'bar',
					data: [10, 9, 9, 8, 9, 8, 7, 8, 7, 7],
					cursor: 'default'
				}
			]
		};

		businessOption = {
			color: ['#1A936F'],
			title : {
				text: 'Business Proficiences',
				subtext: 'my professional side',
				x: 'center',
				textStyle: {
					fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
				}
			},
			tooltip : {
				trigger: 'axis',
				axisPointer : {
					type : 'shadow'
				},
				formatter: function (d) {
					var returnArr = [],
						data = d[0];

					if (data.axisValue === 'UI/UX') {
						returnArr.push(
							'<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>' 
						);
						returnArr.push(
							'Professional Experience'
						);
					} else if (data.axisValue === 'Data Analysis' || data.axisValue === 'Market Research' || data.axisValue === 'Strategic Analysis' || data.axisValue === 'Collaboration') {
						returnArr.push(
							'<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>'
						);
						returnArr.push(
							'College and Professional Experience'
						);
					} else {
						returnArr.push(
							'<b style="color: white;">' + data.axisValue + '</b>: ' + data.data + '<br>'
						);
						returnArr.push(
							'College Experience'
						);
					}

					return returnArr.join('');
				},
				textStyle: {
					fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: ['UI/UX', 'Financial Analysis', 'Data Analysis', 'Market Research', 'Strategic Analysis', 'Collaboration'],
					nameTextStyle: {
						fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					nameTextStyle: {
						fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
					}
				}
			],
			series : [
				{
					type: 'bar',
					data: [9, 7, 10, 9, 9, 9],
					cursor: 'default'
				}
			]
		};

		scatterOption = {
			color: ['#B2CDF4'],
			tooltip:{ 
				formatter: function (d) {
					var returnArr = [],
						data = d;

					if (data.name === '2011') {
						returnArr.push(
							'<b style="color: white;">' + data.name + '</b><br>High School Graduation<br>' 
						);
					} else if (data.name === '2015') {
						returnArr.push(
							'<b style="color: white;">' + data.name + '</b><br>College Graduation<br>' 
						);
					} else if (data.name === '2016') {
						returnArr.push(
							'<b style="color: white;">' + data.name + '</b><br>Booz Allen<br>' 
						);
					} else if (data.name === '2017') {
						returnArr.push(
							'<b style="color: white;">' + data.name + '</b><br>Deloitte<br>' 
						);
					}

					return returnArr.join('');
				},
				textStyle: {
					fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
				}
			},
			title : {
				text: 'My Professional Journey',
				subtext: 'Click on a bubble to bring up more information',
				x: 'center',
				textStyle: {
					fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
				}
			},
			singleAxis: {
				left: 50,
				right: 50,
				top: 60,
				type: 'category',
				boundaryGap: false,
				data: ['2011', '2015', '2016', '2017'],
				nameTextStyle: {
					fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
				}
			},
			series: {
				singleAxisIndex: 0,
				coordinateSystem: 'singleAxis',
				type: 'scatter',
				data: [[0, 0], [1, 0], [2, 0], [3, 0]],
				symbolSize: 50
			}
		}

		mapData = [
			{
				name: 'Sunnyside, WA',
				latitude: 46.3237,
				longitude: -120.0087,
				value: 5,
				color: '#B2CDF4'
			},
			{
				name: 'The Woodlands, TX',
				latitude: 30.1658,
				longitude: -95.4613,
				value: 5,
				color: '#4FA4DE'
			},
			{
				name: 'Washington, DC',
				latitude: 39,
				longitude: -78.5,
				value: 5,
				color: '#1A936F'
			},
			{
				name: 'Baltimore, MD',
				latitude: 40,
				longitude: -77,
				value: 5,
				color: '#4FA4DE'
			},
			{
				name: 'San Antonio, TX',
				latitude: 29.4241,
				longitude: -98.4936,
				value: 5,
				color: '#B2CDF4'
			}
		];

		mapOption = {
			backgroundColor: '#404a59',
			legend: {
				left: 'left',
				data: ['Family', 'School', 'Professional'],
				textStyle: {
					color: '#fff'
				}
			},
			title : {
				text: 'About Me',
				subtext: 'Hover over the dots to show text',
				left: 'center',
				top: 'top',
				textStyle: {
					color: '#fff',
					fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'					
				}
			},
			tooltip : {
				trigger: 'item',
				formatter : function (data) {
					var tooltip = [];

					if (data.name === 'Sunnyside, WA') {
						tooltip.push(
							'<b style="color: white;">Sunnyside, WA</b><br>',
							'I was born here in 1993 and lived here until<br>',
							'about 6th grade when I moved to Texas.'
						)
					} else if (data.name === 'San Antonio, TX') {
						tooltip.push(
							'<b style="color: white;">San Antonio, TX</b><br>',
							'This is where my family currently lives. I find myself<br>',
							'getting to know the city more and more when I visit.'
						)
					} else if (data.name === 'The Woodlands, TX') {
						tooltip.push(
							'<b style="color: white;">The Woodlands, TX</b><br>',
							'This is where I grew up - my hometown. I graduated<br>',
							'high school in 2011 and still visit from time to time.'
						)
					} else if (data.name === 'Baltimore, MD') {
						tooltip.push(
							'<b style="color: white;">Baltimore, MD</b><br>',
							'This is where I attended college - at The Johns Hopkins<br>',
							'University. I graduated in 2015 with degrees in BME and CS.'
						)
					} else if (data.name === 'Washington, DC') {
						tooltip.push(
							'<b style="color: white;">Washington, DC</b><br>',
							'This is where I am currently located. My first job after<br>',
							'college was with Booz Allen. In 2016 I accepted a role with Deloitte.'
						)
					}
				
					return tooltip.join('');
				},
				position: function() {
					if ($(window).width() < 1290) {
						return ['-25%', '80%'];
					}
				},
				textStyle: {
					fontFamily: 'HelveticaNeue-UltraLight, Helvetica Neue UltraLight, Helvetica Neue, Arial, Helvetica, sans-serif'
				}
			},
			geo: {
				name: 'About Me',
				type: 'map',
				map: 'world',
				roam: false,
				label: {
					emphasis: {
						show: false
					}
				},
				itemStyle: {
					normal: {
						areaColor: '#323c48',
						borderColor: '#111'
					},
					emphasis: {
						areaColor: '#323c48'
					}
				},
				center: [-96.5, 37.5],
				zoom: 7
			},
			series : [
				{
					type: 'scatter',
					coordinateSystem: 'geo',
					data: mapData.map(function (item) {
						return {
							name: item.name,
							value: [
								item.longitude,
								item.latitude,
								item.value
							],
							label: {
								emphasis: {
									position: 'right',
									show: false
								}
							},
							itemStyle: {
								normal: {
									color: item.color
								}
							},
							symbolSize: 15
						};
					})
				}
			]
		}

		mapChart.setOption(mapOption);
		mapChart.resize();

		techChart.setOption(barOption);
		techChart.resize();
		bizChart.setOption(businessOption);
		bizChart.resize();

		scatterChart.setOption(scatterOption);
		scatterChart.on('click', function (d) {
			var div = document.getElementById('about-me-text');
			div.innerHTML = '';
			setTimeout( function() {
				if (d.name === '2011') {
					div.innerHTML = '<div style="text-align: center; width: 100%; margin-top: 2%; margin-bottom: 2%; font-size: 1.2em;">' +
					'<b style="text-align: center;">High School Graduation</b>' +
					'</div>' +
					'In 2011 I graduated high school in Texas and embarked on my college/professional journey. Here are some highlights:<br>' +
					'<ul>' +
					'	<li>' + 'Graduated high school in the top 5% of my class' + '</li>' +
					'	<li>' + 'While in high school I completed several internships at the Johns Hopkins School of Medicine where I did research primarily related to Genetics and Genomics' + '</li>' +
					'	<li>' + 'Played in various sports including varsity football' + '</li>' +
					'	<li>' + 'Was named a Gates Millenium Scholar Finalist' + '</li>' +
					'</ul>';
				} else if (d.name === '2015') {
					div.innerHTML = '<div style="text-align: center; width: 100%; margin-top: 2%; margin-bottom: 2%; font-size: 1.2em;">' +
					'<b style="text-align: center;">College Graduation</b>' +
					'</div>' +
					'In 2015 I graduated from the Johns Hopkins University with degrees in Biomedical Engineering and Computer Science. Here are some highlights:<br>' +
					'<ul>' +
					'	<li>' + 'Participated in two BME design projects which resulted in being authored in a <a href="http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0151789">scientific journal</a>, speaking at conferences, and <a href="https://www.bme.jhu.edu/news-events/news/spirosense-offers-hope-to-patients-with-respiratory-illness/">winning over $50,000 in prize money</a>' + '</li>' +
					'	<li>' + 'Interned at a <a href="https://www.tissue-analytics.com/#page=home">MedTech startup</a> as a Mobile Software Engineer (Android)' + '</li>' +
					'	<li>' + 'Co-founded the Johns Hopkins Undergraduate Consulting Club' + '</li>' +
					'	<li>' + 'Named a Bloomberg Scholar' + '</li>' +
					'</ul>';
				} else if (d.name === '2016') {
					div.innerHTML = '<div style="text-align: center; width: 100%; margin-top: 2%; margin-bottom: 2%; font-size: 1.2em;">' +
					'<b style="text-align: center;">Booz Allen</b>' +
					'</div>' +
					'After graduation I took my first job with Booz Allen Hamilton as an Analyst in their Strategic Innovation Group. Whilte at Booz Allen I was able to work on some great technical and analytics projects. Here are some highlights:<br>' +
					'<ul>' +
					'	<li>' + 'Worked on an analytics engagement helping a hospital predict patient readmission rates' + '</li>' +
					'	<li>' + '<a href="https://www.boozallen.com/content/dam/boozallen/documents/Viewpoints/2016/03/the-challenge-of-sports-science.pdf">' + 
					'Co-authored a white paper </a>focused on the challenges facing sports teams in the field of sports science' + '</li>' +
					'	<li>' + 'Worked on a federal health engagement assessing over 9,000 medical records using programming languages such as SQL, VB.NET, and SAS in order to estimate prescription drug overpayments for the Federal Government' + '</li>' +
					'	<li>' + 'Programmed a software prototype that scraped Google search result data and analyzed it in order to predict trends in public health' + '</li>' +
					'</ul>';
				} else if (d.name === '2017') {
					div.innerHTML = '<div style="text-align: center; width: 100%; margin-top: 2%; margin-bottom: 2%; font-size: 1.2em;">' +
					'<b style="text-align: center;">Deloitte</b>' +
					'</div>' +
					'In 2016 I transitioned from Booz Allen to a role at Deloitte as a Technology Consultant. My experience here has been truly amazing and I have met some exceptional people in the process. Here are some highlights:<br>' +
					'<ul>' +
					'	<li>' + 'Serve as a Front-End Software Engineer on the <a href="http://semoss.org/">SEMOSS platform</a>. SEMOSS is a web-based, end-to-end data analytics platform' + '</li>' +
					'	<li>' + 'Assisted a federal client in assessing over $400 MM worth of technology systems to find redundancies and identify cost-savings' + '</li>' +
					'	<li>' + 'Helped a <a href="http://www.samagra.co/">social enterprise based in Pune, India</a> assess their short-and-long-term technology integration strategy as part of a <a href="https://www2.deloitte.com/lk/en/pages/about-deloitte/articles/d2international.html">Deloitte Social Impact Fellowship</a>' + '</li>' +
					'	<li>' + 'Worked on a 3-person team to revamp the business plan for a local D.C. non-profit in the insurance space' + '</li>' +
					'</ul>';
				}
				div.className += ' load';
			});
		});
		scatterChart.resize();
	}

	drawVizzes();

	console.warn('Hello fellow developer! I hope that you enjoy my site :)');

})(window, jQuery, echarts);