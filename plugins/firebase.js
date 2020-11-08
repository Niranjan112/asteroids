import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA7jffY5kq9E2tDuAv7gYdC5siu5KwzsSQ',
  authDomain: 'asteroids-be0f9.firebaseapp.com',
  databaseURL: 'https://asteroids-be0f9.firebaseio.com',
  projectId: 'asteroids-be0f9',
  storageBucket: 'asteroids-be0f9.appspot.com',
  messagingSenderId: '684682696560',
  appId: '1:684682696560:web:1a4340de192e1b66b021b5',
}
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export const db = firebase.firestore()
export const auth = firebase.auth()
export const timestamp = firebase.firestore.Timestamp

export default function ({ store }) {
  store.dispatch('autoLogIn')
}
