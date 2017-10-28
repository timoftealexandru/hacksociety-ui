import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyBk4ccw_h9Lj1bAqorj8Z_ZoHGaEhDnGzI",
	authDomain: "hacksociety-rpi.firebaseapp.com",
	databaseURL: "https://hacksociety-rpi.firebaseio.com",
	projectId: "hacksociety-rpi",
	storageBucket: "hacksociety-rpi.appspot.com",
	messagingSenderId: "488752621265"
};

firebase.initializeApp(config)

export const db = firebase.database()