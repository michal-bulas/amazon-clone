import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDFQU6N2y0WIwjHtug4a1_hFEEt3dB1cc8',
	authDomain: 'clone-b2992.firebaseapp.com',
	projectId: 'clone-b2992',
	storageBucket: 'clone-b2992.appspot.com',
	messagingSenderId: '578606741781',
	appId: '1:578606741781:web:14d3c677bdc0160274111c',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);

export default db;
