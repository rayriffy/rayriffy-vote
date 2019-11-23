import axios from 'axios'
import firebaseApp from 'firebase/app'

interface IConfig {
  apiKey: string
  appId: string
  authDomain: string
  databaseURL: string
  measurementId: string
  messagingSenderId: string
  projectId: string
  storageBucket: string
}

const fetchConfig = axios
  .get<IConfig>('/__/firebase/init.json')
  .then(r => r.data)

const firebase = async () => {
  if (!firebaseApp.apps.length) {
    const config = await fetchConfig

    return firebaseApp.initializeApp(config)
  } else {
    return firebaseApp.app()
  }
}

export default firebase
