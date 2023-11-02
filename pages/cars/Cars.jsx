import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { fetchCarsFromDB } from "../../firebase"
import { createCarsElement } from "../../utilities/createCarsElement"

export default function Cars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = React.useState(null)
  
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type")

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

  const displayedCars = typeFilter ? cars.filter(car => car.type === typeFilter)
                        : cars

  const carsElement = createCarsElement(displayedCars)

  const allCars = loading ? <h3>Loading cars...</h3>
  : error ? <h3>Failed to load cars...</h3>
  : carsElement

  return (
    <main>
      <p className="filter-text">Filter by:</p>
      <div className="car-list-filter-buttons">
        <button 
            onClick={() => setSearchParams({type: "sport"})}
            className="car-type sport"
        >Sport</button>
        <button 
            onClick={() => setSearchParams({type: "suv"})}
            className="car-type suv"
        >SUV</button>
        <button 
            onClick={() => setSearchParams({type: "salon"})}
            className="car-type salon"
        >Salon</button>
        <button 
            onClick={() => setSearchParams({})}
            className="car-type clear-filters"
        >Clear filter</button>
      
      </div>
      {allCars}
    </main>
  )
}