(function(){
	//Declaring req. variables
	var docElem = window.document.documentElement,
	// support transitions
	supportTransitions = Modernizr.csstransitions,
	// transition end event name
	transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'msTransition': 'MSTransitionEnd',
		'transition': 'transitionend'
	},
	transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
	scrollPos = 0;

	function initLogin(){
		// Saving all the DOM element to avoid frequent DOM traversing
		var showLoginMenu = document.getElementById('show-login-menu'),
			showLoginForm = document.getElementById('show-login-form'),
			loginModule = document.getElementsByClassName('login-module')[0],
			loginContainer = document.getElementsByClassName('login-container')[0],
			loginWrapper = document.getElementsByClassName('login-wrapper')[0];

		showLoginMenu.addEventListener(clickevent , function(e){
			e.preventDefault();

			// Fetching current scroll position of page
			scrollPos = scrollY();

			// Change top of login wrapper
			console.log(loginWrapper);
			loginWrapper.style.top = scrollPos * -1 + 'px';

			// mac chrome issue:
			document.body.scrollTop = document.documentElement.scrollTop = 0;

			// Add modalview class to login module
			$(loginModule).addClass('modalview');

			// And set login wrapper to animate by adding login-animate class
			setTimeout(function(){$(loginModule).addClass('login-animate')},25);

		});

		loginContainer.addEventListener(clickevent , function(){
			if($(loginModule).hasClass('login-animate')){
				var onTransitionEnd = function(e){
					if(supportTransitions && (e.target.className !== 'login-container' || e.propertyName.indexOf('transform') == -1) ){return};
					
					this.removeEventListener(transEndEventName , onTransitionEnd);
					$(loginModule).removeClass('modalview');

					// mac chrome issue:
					document.body.scrollTop = document.documentElement.scrollTop = scrollPos;

					// change top of loginWrapper
					loginWrapper.style.top = '0px';
				};

				if(support){
					loginModule.addEventListener(transEndEventName , onTransitionEnd);
				}
				else{
					onTransitionEnd.call();
				}

				// Finally removing login-animate class
				$(loginModule).removeClass('login-animate');
			}
		});

		showLoginForm.addEventListener(clickevent, function(){
			$(loginModule).removeClass('modalview login-animate');
		});
	}

	initLogin();
})();