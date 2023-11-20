import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth, fetchOrderedCars } from "../firebase"

export default function OrderedCarsFromDb() {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
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
                  <img src={image} alt="picture of a car" />
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

    return carsElement
}