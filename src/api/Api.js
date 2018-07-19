/**
 * This file contain global api for app
 */

function compareCustomerName(a, b) {
	let n1 = a.name
		.trim()
		.substring(0, 1)
		.toLowerCase();

	let n2 = b.name
		.trim()
		.substring(0, 1)
		.toLowerCase();

	return n1.localeCompare(n2);
}

function parseStringToDate(s) {
	let y = s.substring(0, 4);
	let m = s.substring(4, 6);
	let d = s.substring(6, s.length);
	let dateString = y + "-" + m + "-" + d;

	return new Date(dateString);
}

export { compareCustomerName, parseStringToDate };
