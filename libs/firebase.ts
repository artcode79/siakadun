import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyB_K87UIxPFBPTXsGa37W6eBKsa3_0hrw8',
	authDomain: 'doku124.firebaseapp.com',
	projectId: 'doku124',
	storageBucket: 'doku124.appspot.com',
	messagingSenderId: '146588896508',
	appId: '1:146588896508:web:333ea263f971e2cde81b79',
	measurementId: 'G-RRP47GFL8G',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export const storage = getStorage(app)

export { auth, db, app }
