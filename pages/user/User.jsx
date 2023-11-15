import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { authSignOut, auth, fetchOrderedCars } from "../../firebase"

export default function User() {
    const [name, setName] = useState(null)
    const [cars, setCars] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const displayName = user.displayName
            setName(displayName)
            setLoading(true)
            fetchOrderedCars(user, data => {
              setCars(data)
              setLoading(false)
            })
          } else {
            navigate("/account", {replace: true})
          }
           
        })
    }, [])

    const carsElement = cars.length > 0 ? cars.map(car => {
      const {id, image, name, color} = car
      return <div key={id} className="ordered-car-container">
                <img src={image} />
                <div className="ordered-car-detail">
                    <div>
                      <h5>{name}</h5>
                      <p>{color}</p>
                      <p>Order #{id.slice(-6)}</p>
                    </div>
                    <h6>status: pending</h6>
                </div>
            </div>
    }) : <p>You do not have any ordered cars yet...</p>
    

    if (loading) {
        return <h3>Loading...</h3>
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
            <div className="ordered-cars">
              {carsElement}
            </div>
          </div>
        </main>
    )
}