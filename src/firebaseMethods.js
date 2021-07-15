import firebase from "./firebaseConfig"

export const getStudentsFromFirebase = async (id) => { 
    let dbRef =  await firebase.firestore().collection(id).get();
    let data = [];
    dbRef.forEach( value => data.push(value.data()));
    // data = dbRef.docs().map(doc => doc.data());
    return data;
}