import firebase from "./firebaseConfig"
import { setStudentAnswerInDB } from "./redux/actions/loginActions";
import { setAnswer } from "./redux/actions/studentActions";

export const getStudentsFromFirebase = async (id, session) => {
    let dbRef = await firebase.firestore().collection(id).doc(session).collection("students").get();
    let data = [];
    for(let value of dbRef.docs) {
        let obj =  value.data();
        obj.id = value.id;
        data.push(obj);
    }
    console.log("data returned",data)
    return data;
}


export const addNamestoFireBase = async () => {

}

export const readAnswersFromFirebase = (name, id, session) => async (dispatch) => {
    let value = {};
    await firebase
        .firestore()
        .collection(id)
        .doc(session)
        .collection("students")
        .doc(name)
        .onSnapshot(async snapshot => {
            if (snapshot.data()) {

                value = snapshot.data();
                dispatch(setAnswer(value.answer));


                // return snapshot.data();
                return value;
            }
        }

        )
        ;
    // let data = dbRef.data();
    // return data;


}




export const writeAnswersTOFirebase = async (name, id, session, answer) => {
    let dbRef = await firebase.firestore().collection(id).doc(session).collection("students").doc(name).set({ answer });
    return dbRef;
}



export const intitalizeFirebase = async (id) => {

    const userRef = firebase.firestore().collection(id);
    const sessionRef = userRef.doc();
    await sessionRef.set({ session: sessionRef.id })
    return sessionRef.id;
}



export const startFirebase = async (id, studentNames, session) => {
    const usersRef = firebase.firestore().collection(id)

    const sessionRef = usersRef.doc(session).collection("students");
    for (let student of studentNames) {
        // try {
        await sessionRef.doc(student).set({ answer: "" });
        console.log(student)
        // } catch (e) {
        //     console.log("error", e.message);

        // }
    }

    console.log("end")
    return session.id;
}



export const firebaseListenersForStudents = (id, session, dashboardStudents) => async (dispatch) => {
    console.log("did i even happen", session)
    const database = firebase.firestore();
    const usersRef = database.collection(id).doc(session).collection("students");
    try {
        dashboardStudents.map(student =>
            usersRef.doc(student.id).onSnapshot(async snapshot => {

                if (snapshot.data()) {
                    console.log("this", snapshot.data())
                    let obj = snapshot.data();
                    obj.id = snapshot.id;
                    dispatch(setStudentAnswerInDB(obj))
                }
            })
        )

    } catch (e) {
        console.log(e)
    }
}

export const deleteDataFromFirebase = async (id, session) => {
    const database = firebase.firestore();
    const usersRef = database.collection(id).doc(session).collection("students");
    const query = await usersRef.get()
    for (let docc of query.docs) {
        await usersRef.doc(docc.id).delete();

    }
    await database.collection(id).doc(session).delete();

}

export const clearInputsFromFirebase = async (id, session) => {
    const database = firebase.firestore();
    const usersRef = database.collection(id).doc(session).collection("students");
    const query = await usersRef.get()
    for (let docc of query.docs) {
        await usersRef.doc(docc.id).set({ answers: "" });

    }

}
