import '@shgysk8zer0/kazoo/theme-cookie.js';
import { ready, loaded, toggleClass, on, css } from '@shgysk8zer0/kazoo/dom.js';
import { debounce } from '@shgysk8zer0/kazoo/events.js';
import { getCustomElement } from '@shgysk8zer0/kazoo/custom-elements.js';
import { init } from '@shgysk8zer0/kazoo/data-handlers.js';
import { importGa, externalHandler, telHandler, mailtoHandler } from '@shgysk8zer0/kazoo/google-analytics.js';
import { GA } from './consts.js';
import './components.js';

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
