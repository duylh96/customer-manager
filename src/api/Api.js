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

export { compareCustomerName };
