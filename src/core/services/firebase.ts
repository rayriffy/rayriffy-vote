import firebaseApp from 'firebase/app'
import fetch from 'isomorphic-unfetch'

const fetchConfig = fetch('/__/firebase/init.json').then(r => r.json())

const firebase = async () => {
  if (!firebaseApp.apps.length) {
    const config = await fetchConfig

    return firebaseApp.initializeApp(config)
  } else {
    firebaseApp.app()
  }
}

export default firebase
