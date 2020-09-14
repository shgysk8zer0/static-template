/* global ga */
export function outbound() {
	ga('send', {
		hitType: 'event',
		eventCategory: 'outbound',
		eventAction: 'click',
		eventLabel: this.href,
		transport: 'beacon',
	});
}

export function madeCall() {
	ga('send', {
		hitType: 'event',
		eventCategory: 'call',
		eventLabel: this.href.replace('tel:', ''),
		transport: 'beacon',
	});
}

export function emailed() {
	ga('send', {
		hitType: 'event',
		eventCategory: 'email',
		eventLable: this.href.replace('mailto:', null),
		transport: 'beacon',
	});
}
