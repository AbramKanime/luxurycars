import { initializeApp } from "firebase/app"
import { getFirestore, onSnapshot, collection, getDocs, query, where } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBl4QLRAj0YwANlBbG7igCmUrFo7mlsZV4",
  authDomain: "cars-e13ba.firebaseapp.com",
  projectId: "cars-e13ba",
  storageBucket: "cars-e13ba.appspot.com",
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const carsRef = collection(db, "cars")


export async function fetchCarsFromDB(query, user) {
  const snapshot = await getDocs(carsRef)
  
  const cars = snapshot.docs.map(doc => ({
      ...doc.data(), id: doc.id
  }))
  return cars
}

export async function fetchCar(id) {
  // const q = query(carsRef, where(doc.id, "==", id))
  const snapshot = await getDocs(carsRef)
  const selectedCar = snapshot.docs.filter(doc => id === doc.id)

  const car = selectedCar.map(doc => ({
    ...doc.data(), id: doc.id
  }))
  
  return car
}