import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import 'https://cdn.kernvalley.us/js/std-js/theme-cookie.js';
import 'https://cdn.kernvalley.us/components/share-button.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import 'https://cdn.kernvalley.us/components/bacon-ipsum.js';
import 'https://cdn.kernvalley.us/components/gravatar-img.js';
import 'https://cdn.kernvalley.us/components/install/prompt.js';
import 'https://cdn.kernvalley.us/components/github/user.js';
import 'https://cdn.kernvalley.us/components/app/list-button.js';
import 'https://cdn.kernvalley.us/components/share-to-button/share-to-button.js';
import 'https://cdn.kernvalley.us/components/date-locale.js';
import 'https://cdn.kernvalley.us/components/ad/block.js';
import 'https://cdn.kernvalley.us/components/weather/current.js';
import 'https://cdn.kernvalley.us/components/spotify/player.js';
import 'https://cdn.kernvalley.us/components/youtube/player.js';
import 'https://cdn.kernvalley.us/components/app/stores.js';
import { ready, loaded, toggleClass, on, css } from 'https://cdn.kernvalley.us/js/std-js/dom.js';
import { debounce } from 'https://cdn.kernvalley.us/js/std-js/events.js';
import { getCustomElement } from 'https://cdn.kernvalley.us/js/std-js/custom-elements.js';
import { init } from 'https://cdn.kernvalley.us/js/std-js/data-handlers.js';
import { importGa, externalHandler, telHandler, mailtoHandler } from 'https://cdn.kernvalley.us/js/std-js/google-analytics.js';
import { GA } from './consts.js';

css([document.documentElement], { '--viewport-height': `${window.innerHeight}px`});

on([window], {
	resize: debounce(() => css([document.documentElement], { '--viewport-height': `${window.innerHeight}px`})),
	scroll: () => {
		requestAnimationFrame(() => {
			css('#header', { 'background-position-y': `${-0.5 * scrollY}px` });
		});
	}
}, { passive: true });

toggleClass([document.documentElement], {
	'no-dialog': document.createElement('dialog') instanceof HTMLUnknownElement,
	'no-details': document.createElement('details') instanceof HTMLUnknownElement,
	'js': true,
	'no-js': false,
});

if (typeof GA === 'string') {
	loaded().then(() => {
		requestIdleCallback(() => {
			importGa(GA).then(async ({ ga, hasGa }) => {
				if (hasGa()) {
					ga('create', GA, 'auto');
					ga('set', 'transport', 'beacon');
					ga('send', 'pageview');

					on('a[rel~="external"]', ['click'], externalHandler, { passive: true, capture: true });
					on('a[href^="tel:"]', ['click'], telHandler, { passive: true, capture: true });
					on('a[href^="mailto:"]', ['click'], mailtoHandler, { passive: true, capture: true });
				}
			});
		});
	});
}

Promise.all([
	getCustomElement('install-prompt'),
	ready(),
]).then(([HTMLInstallPromptElement]) => {
	init();

	on('#install-btn', ['click'], () => new HTMLInstallPromptElement().show())
		.forEach(el => el.hidden = false);
});
