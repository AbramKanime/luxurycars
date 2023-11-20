import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { fetchCarsFromDB } from "../firebase"

export default function CarsFromDb() {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = React.useState(null)
  
    useEffect(() => {
      async function loadCars() {
        setLoading(true)
        try {
          const allCars = await fetchCarsFromDB()
          const featuredCars = []
          for (let i = 0; i < 3; i++) {
            featuredCars.push(allCars[i])
          }
          setCars(featuredCars)
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
      loadCars()
    }, [])
  
    const carsElement = cars.map(car => {
      const {id, image, name, price, type, color} = car
      return  <div key={id} className="car-tile">
                <Link
                    to={`cars/${id}`}
                    className="car-container"
                >
                    <img src={image} alt="picture of a car" />
                    <div className="car-info">
                        <h3>{name}</h3>
                        <p>${price}</p>
                    </div>
                    <div className="car-type-color-div">
                      <p className={`car-type ${type} selected`}>{type}</p>
                      <p className="car-color">{color}</p>
                    </div>
                </Link>
              </div>
    })

    const featuredCars = loading ? <h3>Loading featured cars...</h3>
    : error ? <h3>There was an error: {error}</h3>
    : carsElement

    return (
        featuredCars
    )
}