import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCbPtXQ8KH8Z-_r6QUldjYRTV-FJBLA7HU",
  authDomain: "netflix-clone-5fb17.firebaseapp.com",
  projectId: "netflix-clone-5fb17",
  storageBucket: "netflix-clone-5fb17.firebasestorage.app",
  messagingSenderId: "98188814098",
  appId: "1:98188814098:web:1dc54288c8c0c03598f5cb"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut(auth)
}

export {auth, db, login, signup, logout}