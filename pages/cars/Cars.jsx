import React, { useState, useEffect } from "react"
// import {Link} from "react-router-dom"
import { fetchCarsFromDB } from "../../firebase"
import { createCarsElement } from "../../utilities/createCarsElement"

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

  const carsElement = createCarsElement(cars)

  const allCars = loading ? <h3>Loading cars...</h3>
  : error ? <h3>Failed to load cars...</h3>
  : carsElement

  return (
    <main>
      {allCars}
    </main>
  )
}