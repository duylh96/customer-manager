/**
 * This file contain global api for app
 */
import { Toast } from "native-base";

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

function parseDateToString(date) {
	//convert year
	let y = date.getFullYear().toString();

	//convert month
	let m = date.getMonth() + 1;
	if (m < 10) {
		m = "0" + m.toString();
	} else {
		m = m.toString();
	}

	//convert day
	let d = date.getDate();
	if (d < 10) {
		d = "0" + d.toString();
	} else {
		d = d.toString();
	}

	return y + m + d;
}

function compareDateWithNow(d) {
	let n = parseDateToString(new Date());
	return d.localeCompare(n);
}

function showError(message) {
	Toast.show({
		text: message,
		textStyle: { color: "white" },
		buttonText: "Okay",
		buttonTextStyle: { color: "black" },
		buttonStyle: { backgroundColor: "white" },
		type: "danger",
		duration: 3000
	});
}

function parseDate(s) {
	let result = parseStringToDate(s);
	let options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	};
	options.timeZoneName = "short";
	return result.toLocaleDateString("vi-VN", options).replace("UTC,", "");
}

function prettifyStringDate(s) {
	let y = s.substring(0, 4);
	let m = s.substring(4, 6);
	let d = s.substring(6, 8);

	return d + "/" + m + "/" + y;
}

export {
	compareCustomerName,
	parseStringToDate,
	parseDateToString,
	parseDate,
	compareDateWithNow,
	showError,
	prettifyStringDate
};
