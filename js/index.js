import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import 'https://unpkg.com/@webcomponents/custom-elements@1.4.2/custom-elements.min.js';
import 'https://cdn.kernvalley.us/components/share-button.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import 'https://cdn.kernvalley.us/components/bacon-ipsum.js';
import 'https://cdn.kernvalley.us/components/gravatar-img.js';
import 'https://cdn.kernvalley.us/components/pwa/install.js';
import 'https://cdn.kernvalley.us/components/github/user.js';
import 'https://cdn.kernvalley.us/components/share-to-button/share-to-button.js';
import 'https://cdn.kernvalley.us/components/date-locale.js';
import 'https://cdn.kernvalley.us/components/ad/block.js';
import 'https://cdn.kernvalley.us/components/weather/current.js';
import 'https://cdn.kernvalley.us/components/spotify/player.js';
import 'https://cdn.kernvalley.us/components/youtube/player.js';
import { $, ready, toggleClass } from 'https://cdn.kernvalley.us/js/std-js/functions.js';
import * as handlers from 'https://cdn.kernvalley.us/js/std-js/data-handlers.js';
import { loadScript } from 'https://cdn.kernvalley.us/js/std-js/loader.js';
import { importGa, externalHandler, telHandler, mailtoHandler } from 'https://cdn.kernvalley.us/js/std-js/google-analytics.js';
import { GA } from './consts.js';

toggleClass(document.documentElement, {
	'no-dialog': document.createElement('dialog') instanceof HTMLUnknownElement,
	'no-details': document.createElement('details') instanceof HTMLUnknownElement,
});

cookieStore.get('theme').then(cookie => {
	const setTheme = (cookie) => {
		if (cookie.name === 'theme') {
			$('[data-theme], :root').data({ theme: cookie.value });
			$('[theme]').attr({ theme: cookie.value });
		}
	};

	if (cookie) {
		setTheme(cookie);
	}

	cookieStore.addEventListener('change', ({ changed }) => {
		const cookie = changed.find(({ name }) => name === 'theme');

		if (cookie) {
			setTheme(cookie);
		}
	});
});

document.documentElement.classList.replace('no-js', 'js');

if (typeof GA === 'string') {
	requestIdleCallback(() => {
		importGa(GA).then(async ({ ga }) => {
			ga('create', GA, 'auto');
			ga('set', 'transport', 'beacon');
			ga('send', 'pageview');

			await ready();

			$('a[rel~="external"]').click(externalHandler, { passive: true, capture: true });
			$('a[href^="tel:"]').click(telHandler, { passive: true, capture: true });
			$('a[href^="mailto:"]').click(mailtoHandler, { passive: true, capture: true });
		});
	});
}

Promise.allSettled([
	ready(),
	loadScript('https://cdn.polyfill.io/v3/polyfill.min.js'),
]).then(async () => {
	$('[data-scroll-to]').click(handlers.scrollTo);
	$('[data-show]').click(handlers.show);
	$('[data-show-modal]').click(handlers.showModal);
	$('[data-close]').click(handlers.close);
	$('[data-toggle-attribute]').click(handlers.toggleAttribute);
	$('[data-toggle-class]').click(handlers.toggleClass);
	$('[data-remove]').click(handlers.remove);
});
