import { initializeApp } from "firebase/app"
import { getFirestore, addDoc, collection, 
        getDocs, onSnapshot, serverTimestamp,
        query, where, orderBy } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword,
        signInWithEmailAndPassword, updateProfile,
        signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { nanoid } from 'nanoid'

const firebaseConfig = {
  apiKey: "AIzaSyBl4QLRAj0YwANlBbG7igCmUrFo7mlsZV4",
  authDomain: "cars-e13ba.firebaseapp.com",
  projectId: "cars-e13ba",
  storageBucket: "cars-e13ba.appspot.com",
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const carsRef = collection(db, "cars")
const orderedCarsRef = collection(db, "orderedCars")
const messageRef = collection(db, "messages")


export async function fetchCarsFromDB() {
    const snapshot = await getDocs(carsRef)
    const cars = snapshot.docs.map(doc => ({
        ...doc.data(), id: doc.id
    }))
    return cars
}

export async function fetchCar(id) {
    const snapshot = await getDocs(carsRef)
    const selectedCar = snapshot.docs.filter(doc => id === doc.id)

    const car = selectedCar.map(doc => ({
        ...doc.data(), id: doc.id
    }))
    
    return car
}

export async function addCarToDB(name, color, price, image, address, city, state, country, user) {
  try {
      const docRef = await addDoc(orderedCarsRef, {
          name,
          color,
          image,
          price,
          address, 
          city, 
          state, 
          country,
          id: nanoid(),
          uid: user.uid,
          createdAt: serverTimestamp()
      })
  } catch (error) {
      console.error(error.message)
  }
}

export async function addMessageToDB(name, email, subject, message, user) {
    try {
        const docRef = await addDoc(messageRef, {
            name,
            email,
            subject,
            message,
            id: nanoid(),
            uid: user.uid,
            createdAt: serverTimestamp()
        })
    } catch (error) {
        console.error(error.message)
    }
  }

export function fetchOrderedCars(user, callback) {
    const q = query(orderedCarsRef, where("uid", "==", user.uid), orderBy("createdAt"))
    
    onSnapshot(q, (querySnapshot) => {
        const data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        })
        callback(data)
    })

}

// Authentication codes

export function authCreateAccountWithEmail(email, password, firstName, lastName, navigate, from, setError) {

  createUserWithEmailAndPassword(auth, email, password, firstName, lastName)
      .then(() => {
        //   Successfully created
      })
      .catch(() => {
          setError({message: "Failed to create account"})
      }).finally(() => {
        updateProfile(auth.currentUser, {
            displayName: firstName
        }).then(() => {
            // Profile updated
            navigate(from, { replace: true })
        }).catch((error) => {
            // Failed to update
        })
      })
}

export function authSignInWithEmail(email, password, navigate, setStatus, setError, from) {
  setStatus("submitting")
  signInWithEmailAndPassword(auth, email, password)
      .then(() => {
          navigate(from, { replace: true })
      })
      .catch(() => {
          setError({message: "Invalid login details"})
      }).finally(() => {
          setStatus("idle")
      })
}

export function authSignOut() {

  signOut(auth)
      .then(() => {
        // Successfully signed out  
      }).catch((error) => {
        // Failed to sign out
      })
}

export function authSignInWithGoogle(setError) {
    signInWithPopup(auth, provider)
        .then(() => {
            
        }).catch(() => {
            // Handle Errors here.
            setError({message: "Google authentication failed"})
        })
}