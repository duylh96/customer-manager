let gListCustomer = [];

function getListCustomerCached() {
	return gListCustomer;
}

function setListCustomerCached(data) {
	gListCustomer = data;
}

export { getListCustomerCached, setListCustomerCached };
