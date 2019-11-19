import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBAWYTIMDZf_GDopioR0JelfcAArQMrbuQ',
  authDomain: 'rayriffy-vote.firebaseapp.com',
  databaseURL: 'https://rayriffy-vote.firebaseio.com',
  projectId: 'rayriffy-vote',
  storageBucket: 'rayriffy-vote.appspot.com',
  messagingSenderId: '976921864589',
  appId: '1:976921864589:web:16609b97db6d699f1835c4',
  measurementId: 'G-4DBHQLHTRB',
}

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
