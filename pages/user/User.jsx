import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged, getAuth } from "firebase/auth"
// import { onSnapshot } from "firebase/firestore"
import { authSignOut, auth, fetchOrderedCars } from "../../firebase"

// let displayName
// let data
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     const uid = user.uid
//     displayName = user.displayName
//     data = fetchOrderedCars()
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// })

export default function User() {
    const [name, setName] = useState(null)
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = React.useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const displayName = user.displayName
            fetchOrderedCars(data => {
              setCars(data)
              setName(displayName)
            })
          } else {
            // do something else
          }
           
        })
    }, [])
    console.log(cars)
    console.log(cars.length)

    const carsElement = cars.length > 0 ? cars.map(car => {
      return <div key={car.name} className="ordered-car-container">
                <img src={car.image} />
                <div>
                    <p>{car.name}</p>
                    <p>{car.color}</p>
                    <p>${car.price}</p>
                </div>
            </div>
    }) : <p>You do not have any ordered cars yet...</p>
    

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error!</h1>
    }

    return (
        <main>
            <h2>Welcome, {name}.</h2>
            {carsElement}
            <button onClick={authSignOut}>Sign out</button>
        </main>
    )
}