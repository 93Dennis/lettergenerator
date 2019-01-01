import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyAvG55uvTNl0Q1vTZ9xM2Rc6sQqXuVOXKA",
  authDomain: "lettergenerator-d2ef2.firebaseapp.com",
  databaseURL: "https://lettergenerator-d2ef2.firebaseio.com",
  projectId: "lettergenerator-d2ef2",
  storageBucket: "lettergenerator-d2ef2.appspot.com",
  messagingSenderId: "377093672916"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export var db = firebaseApp.firestore();