import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { authSignOut, auth, fetchOrderedCars } from "../../firebase"

export default function User() {
    const [name, setName] = useState(null)
    const [cars, setCars] = useState([])
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const displayName = user.displayName
            setName(displayName)
            fetchOrderedCars(user, data => {
              setCars(data)
              // setName(displayName)
            })
          } else {
            navigate("/account", {replace: true})
          }
           
        })
    }, [])

    const carsElement = cars.length > 0 ? cars.map(car => {
      return <div key={car.id} className="ordered-car-container">
                <img src={car.image} />
                <div className="ordered-car-detail">
                    <h5>{car.name}</h5>
                    <p>{car.color}</p>
                    <p>cost: ${car.price}</p>
                    <h6>status: pending</h6>
                </div>
            </div>
    }) : <p>You do not have any ordered cars yet...</p>
    

    if (!name) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error!</h1>
    }

    return (
        <main>
          <div className="order-page-container">
            <div className="welcome-container">
              <h2>Welcome back, {name}.</h2>
              <button onClick={authSignOut}>Sign out</button>
            </div>
            {carsElement}
          </div>
        </main>
    )
}