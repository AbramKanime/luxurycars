import { initializeApp } from "firebase/app"
import { getFirestore, onSnapshot, collection, getDocs } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword,
        signInWithEmailAndPassword, updateProfile, onAuthStateChanged,
        signOut } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBl4QLRAj0YwANlBbG7igCmUrFo7mlsZV4",
  authDomain: "cars-e13ba.firebaseapp.com",
  projectId: "cars-e13ba",
  storageBucket: "cars-e13ba.appspot.com",
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const carsRef = collection(db, "cars")
const snapshot = await getDocs(carsRef)

export async function fetchCarsFromDB() {
  // const snapshot = await getDocs(carsRef)
  
  const cars = snapshot.docs.map(doc => ({
      ...doc.data(), id: doc.id
  }))
  return cars
}

export async function fetchCar(id) {
  // const q = query(carsRef, where(doc.id, "==", id))
  // const snapshot = await getDocs(carsRef)
  const selectedCar = snapshot.docs.filter(doc => id === doc.id)

  const car = selectedCar.map(doc => ({
    ...doc.data(), id: doc.id
  }))
  
  return car
}

export function authCreateAccountWithEmail(email, password, firstName, lastName, navigate, from) {

  createUserWithEmailAndPassword(auth, email, password, firstName, lastName)
      .then((userCredential) => {
          const user = userCredential.user
      })
      .catch((error) => {
          console.error(error.message)
      })
  
  updateProfile(auth.currentUser, {
      displayName: firstName,
      photoURL: null
  }).then(() => {
      console.log("Profile updated")
  }).catch((error) => {
      console.error(error.message)
  })
  navigate(from, { replace: true })
}

export function authSignInWithEmail(email, password, navigate, setStatus, setError, from) {
  setStatus("submitting")
  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user
          setError(null)
          navigate(from, { replace: true })
          console.log(user)
      })
      .catch((error) => {
          setError({message: "Invalid login details"})
          console.error(error)
      }).finally(() => {
          setStatus("idle")
      })
}

export function authSignOut(navigate) {

  signOut(auth)
      .then(() => {
        
      }).catch((error) => {
          console.error(error.message)
      })
}