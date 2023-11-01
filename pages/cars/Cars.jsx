import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { fetchCarsFromDB } from "../../api"

export default function Cars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = React.useState(null)

  useEffect(() => {
    async function loadCars() {
      setLoading(true)
      try {
        const allCars = await fetchCarsFromDB()
        setCars(allCars)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    loadCars()
  }, [])

  const carsElement = cars.map(car => (
    <div key={car.id} className="car-tile">
      <Link
          to={car.id}
          className="car-container"
      >
          <img src={car.image} />
          <div className="car-info">
              <h3>{car.name}</h3>
              <p>${car.price}</p>
          </div>
          <div className="car-type-color-div">
            <p className={`car-type ${car.type}`}>{car.type}</p>
            <p className="car-color">Color: {car.color}</p>
          </div>
      </Link>
    </div>
  ))

  const allCars = loading ? <h3>Loading cars...</h3>
  : error ? <h3>Failed to load cars...</h3>
  : carsElement

  return (
    <main>
      {allCars}
    </main>
  )
}