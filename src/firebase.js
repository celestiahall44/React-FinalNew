import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword, 
        signOut} from "firebase/auth";
import { addDoc,
        collection,
        getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJC9oGuBJbhRGFAT0pReyKPoS7qOT2AUc",
  authDomain: "react-official-8434f.firebaseapp.com",
  projectId: "react-official-8434f",
  storageBucket: "react-official-8434f.firebasestorage.app",
  messagingSenderId: "93943505283",
  appId: "1:93943505283:web:f4e65cc79f37fa593f56b6",
  measurementId: "G-70S3KRB9N4"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup= async (name, email, password) => {
    try {
       const response = await createUserWithEmailAndPassword(auth, email, password)
       const user = response.user;
       await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email
       });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

export { auth, db, signup, login, logout };



