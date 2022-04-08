import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBtsWiGhwte96WT2qSpl3kudhxZqTM4N10",
    authDomain: "recipe-tutorial-c7d01.firebaseapp.com",
    projectId: "recipe-tutorial-c7d01",
    storageBucket: "recipe-tutorial-c7d01.appspot.com",
    messagingSenderId: "346021103342",
    appId: "1:346021103342:web:1314a2cdd2bdd8ac3e55ff"
  };

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore }