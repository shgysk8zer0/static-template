/* eslint no-unused-vars: 0 */

const config = {
	version: '1.1.1',
	fresh: [
		'/',
		'https://baconipsum.com/api/?paras=8&format=json&type=all-meat',
		'https://apps.kernvalley.us/apps.json',
		'/webapp.webmanifest',
	].map(url => new URL(url, location.origin).href),
	stale: [
		/* HTML and Templates */

		/* JS */
		'/js/index.min.js',

		/* CSS */
		'/css/index.min.css',

		/* Images */
		'/img/icons.svg',
		'/img/neon.svg',
		'https://cdn.kernvalley.us/img/logos/play-badge.svg',
		'https://cdn.kernvalley.us/img/logos/itunes-badge.svg',
		'https://cdn.kernvalley.us/img/logos/windows-badge.svg',

		/* Fonts */
		'https://cdn.kernvalley.us/fonts/roboto.woff2',

		/* JSON/Data */
	].map(path => new URL(path, location.origin).href),
	allowed: [
		'https://secure.gravatar.com/avatar/',
		'https://i.imgur.com/',
		/https:\/\/unpkg.com\/*/,
		/https:\/\/*\.githubusercontent.com\/u\/*/,
		/\.(jpg|png|webp|svg|gif)$/,
	],
	allowedFresh: [
		'https://api.github.com/users/',
		/\.(html|css|js|json)$/,
	]
};
