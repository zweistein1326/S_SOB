const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, onValue, update, } = require('firebase/database');

const firebaseConfig = {
	apiKey: "AIzaSyBQNAjpxaNHH9qvI2HkFpR7D1uvU66qe-M",
	authDomain: "sso-b-5414c.firebaseapp.com",
	databaseURL: "https://sso-b-5414c-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "sso-b-5414c",
	storageBucket: "sso-b-5414c.appspot.com",
	messagingSenderId: "311747588357",
	appId: "1:311747588357:web:5dd79e7d91f770bfba476c",
	measurementId: "G-9Q166472JW"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var users = []

try {
	onValue(ref(db, '/users'), (snapshot) => {
		if (snapshot.exists()) {
			const data = snapshot.val();
			users = Object.values(data);
			console.log('users updated')
		}
		else {
			console.log('No data available');
		}
	});
} catch (err) {
	console.log(err);
}

async function writeUserData(user) {
	try {
		set(ref(db, 'users/' + user.id), { id: user.id, email: user.email, username: user.username, password: user.password });
	} catch (err) {
		console.log(err);
	}
}

async function updateUserData(userId, updates) {
	try {
		update(ref(db, 'users/' + userId), updates).then(() => {
			console.log('successfully updated')
		})
	}
	catch (err) {
		console.error(err);
	}
}

function getUserByEmail(email) {
	console.log(users);
	return users.find((user) => user.email === email);
}

function getUserById(userId) {
	return users.find(({ id }) => userId == id)
}

function getAllUsers() {
	return users;
}


module.exports = {
	getAllUsers,
	getUserByEmail,
	getUserById,
	writeUserData,
	updateUserData,
	db
};
