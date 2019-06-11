'use strict';
// 2019-05-27 11:32
const config = {
	version: location.hostname === 'localhost' ? new Date().toISOString() : '1.0.3',
	stale: [
		'/',
		'/js/index.js',
		'/css/index.css',
		'/img/icons.svg',
		'/img/apple-touch-icon.png',
		'/img/favicon.svg',
		'/img/logos/creative-common-by-sa.svg',
		'/img/octicons/mail.svg',
		'/js/std-js/deprefixer.js',
		'/js/std-js/shims.js',
		'/js/std-js/md5.js',
		'/js/share-button.js',
		'/js/share-config.js',
		'/js/have-i-been-pwned-form.js',
		'/js/gravatar-img.js',
		'/js/imgur-img.js',
		'/js/std-js/functions.js',
		'/css/vars.css',
		'/css/normalize.css/normalize.css',
		'/css/core-css/rem.css',
		'/css/core-css/viewport.css',
		'/css/core-css/element.css',
		'/css/core-css/class-rules.css',
		'/css/core-css/fonts.css',
		'/css/animate.css/animate.css',
		'/css/core-css/animations.css',
		'/css/layout.css',
		'/css/nav.css',
		'/css/sidebar.css',
		'/css/main.css',
		'/css/footer.css',
		'/js/std-js/Notification.js',
		'/js/std-js/webShareApi.js',
		'/js/std-js/share-config.js',
		'/js/std-js/esQuery.js',
		'/css/core-css/utility.css',
	].map(path => new URL(path, location.origin).href),
};

self.addEventListener('install', async () => {
	const cache = await caches.open(config.version);
	const keys = await caches.keys();
	const old = keys.filter(k => k !== config.version);
	await Promise.all(old.map(key => caches.delete(key)));

	await cache.addAll(config.stale);
	skipWaiting();
});

self.addEventListener('activate', event => {
	event.waitUntil(async function() {
		clients.claim();
	}());
});

self.addEventListener('fetch', async event => {
	async function get(request) {
		const cache = await caches.open(config.version);
		const cached = await cache.match(request);

		return cached instanceof Response ? cached : fetch(request);
	}

	if (event.request.method === 'GET' && config.stale.includes(event.request.url)) {
		event.respondWith(get(event.request));
	}
});
