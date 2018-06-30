import firebase from "react-native-firebase";

const ref = firebase.database().ref("customer");

let listAllCustomer = [];

function getAllCustomer() {
	ref.once("value").then(function(snapshot) {
		listAllCustomer = snapshot.val();
	});
}

export { listAllCustomer, getAllCustomer };
