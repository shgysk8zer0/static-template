(function(id) {
	'use strict';

	var btn = document.getElementById(id);

	if (btn instanceof HTMLButtonElement) {
		btn.addEventListener('click', function() {
			var script = document.createElement('script');
			this.disabled = true;
			script.crossOrigin = 'anonymous';
			script.referrerPolicy = 'no-referrer';
			script.async = true;
			script.src = 'https://cdn.kernvalley.us/js/pwa-reset.js';
			document.head.appendChild(script);

			if ('cookieStore' in window && cookieStore.getAll instanceof Function) {
				cookieStore.getAll().then(function(cookies) {
					cookies.forEach(function(cookie) {
						cookieStore.delete(cookie);
					});
				});
			}
		}, {
			once: true,
			capture: true
		});

		btn.disabled = false;
	}
})('reset-btn');
