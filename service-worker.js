'use strict';

const config = {
	version: location.hostname === 'localhost' ? new Date().toISOString() : '1.0.0',
	stale: [
		'/',
		'/js/index.js',
		'/js/share-button.js',
		'/js/share-config.js',
		'/js/current-year.js',
		'https://cdn.kernvalley.us/js/std-js/deprefixer.js',
		'https://cdn.kernvalley.us/js/std-js/shims.js',
		'https://cdn.kernvalley.us/js/std-js/md5.js',
		'https://cdn.kernvalley.us/js/std-js/Notification.js',
		'https://cdn.kernvalley.us/js/std-js/webShareApi.js',
		'https://cdn.kernvalley.us/js/std-js/esQuery.js',
		'https://cdn.kernvalley.us/js/std-js/functions.js',
		'https://cdn.kernvalley.us/components/login-button.js',
		'https://cdn.kernvalley.us/components/logout-button.js',
		'https://cdn.kernvalley.us/components/register-button.js',
		'https://cdn.kernvalley.us/components/gravatar-img.js',
		'https://cdn.kernvalley.us/js/std-js/asyncDialog.js',
		'https://cdn.kernvalley.us/js/User.js',
		'https://cdn.kernvalley.us/components/login-form/login-form.js',
		'https://cdn.kernvalley.us/components/registration-form/registration-form.js',
		'https://cdn.kernvalley.us/components/login-form/login-form.html',
		'https://cdn.kernvalley.us/components/registration-form/registration-form.html',
		'/css/index.css',
		'/css/vars.css',
		'/css/layout.css',
		'/css/header.css',
		'/css/nav.css',
		'/css/main.css',
		'/css/sidebar.css',
		'/css/footer.css',
		'https://cdn.kernvalley.us/css/core-css/rem.css',
		'https://cdn.kernvalley.us/css/core-css/viewport.css',
		'https://cdn.kernvalley.us/css/core-css/element.css',
		'https://cdn.kernvalley.us/css/core-css/class-rules.css',
		'https://cdn.kernvalley.us/css/core-css/utility.css',
		'https://cdn.kernvalley.us/css/core-css/fonts.css',
		'https://cdn.kernvalley.us/css/core-css/animations.css',
		'https://cdn.kernvalley.us/css/normalize/normalize.css',
		'https://cdn.kernvalley.us/css/animate.css/animate.css',
		'/img/icons.svg',
		'/img/apple-touch-icon.png',
		'/img/icon-192.png',
		'/img/favicon.svg',
		'https://cdn.kernvalley.us/img/octicons/mail.svg',
		'https://cdn.kernvalley.us/img/logos/instagram.svg',
		'https://cdn.kernvalley.us/fonts/roboto.woff2',
	].map(path => new URL(path, location.origin).href),
};

self.addEventListener('install', async () => {
	const cache = await caches.open(config.version);
	const keys = await caches.keys();
	const old = keys.filter(k => k !== config.version);
	await Promise.all(old.map(key => caches.delete(key)));

	try {
		await cache.addAll(config.stale);
	} catch (err) {
		console.error(err);
	}

	skipWaiting();
});

self.addEventListener('activate', event => {
	event.waitUntil(async function() {
		clients.claim();
	}());
});

self.addEventListener('fetch', event => {
	if (event.request.method === 'GET' && config.stale.includes(event.request.url)) {
		event.respondWith((async () => {
			const cached = await caches.match(event.request);
			if (cached instanceof Response) {
				return cached;
			} else {
				return await fetch(event.request);
			}
		})());
	}
});
