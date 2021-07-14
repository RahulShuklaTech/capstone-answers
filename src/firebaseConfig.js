import firebase from 'firebase';


// Your config code goes here.
const config = {
    apiKey: "AIzaSyAT0smduxovB0LIbdmj0j5A08f6aby6ACk",
    authDomain: "answers-app-7da9c.firebaseapp.com",
    projectId: "answers-app-7da9c",
    storageBucket: "answers-app-7da9c.appspot.com",
    messagingSenderId: "1062654779431",
    appId: "1:1062654779431:web:c275ee00512ea7c8f72e02"


};


firebase.initializeApp(config);

export default firebase;