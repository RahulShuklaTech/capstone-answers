import firebase from "./firebaseConfig"

export const getStudentsFromFirebase = async (id,session) => { 
    let dbRef =  await firebase.firestore().collection(id).doc(session).collection("students").get();
    console.log("db",session)
    let data = [];
    dbRef.forEach( value => {
        let obj = value.data();
        obj.id = value.id;
        
        data.push(obj);
    });
    // data = dbRef.docs().map(doc => doc.data());
    return data;
}


export const addNamestoFireBase = async ()  => {

}





export const writeAnswersTOFirebase = async (name,id,session,answer) => { 
    let dbRef = await firebase.firestore().collection(id).doc(session).collection("students").doc(name).set({answer});
    return dbRef;
}