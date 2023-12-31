import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { fetchCarsFromDB } from "../../firebase"
import { MenuContext } from "../../components/Layout"

export default function Cars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = React.useState(null)
  const {setOn} = React.useContext(MenuContext)
  
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type")

  useEffect(() => {
    setOn(false)
  }, [])

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

  const carsElement = displayedCars.map(car => {
    const {id, image, name, price, type, color} = car
    return <div key={id} className="car-tile">
              <Link
                  to={id}
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

  const allCars = loading ? <h3>Loading cars...</h3>
  : error ? <h3>Failed to load cars...</h3>
  : carsElement

  return (
    <main>
      <p className="filter-text">Filter by:</p>
      <div className="car-list-filter-buttons">
        <button 
            onClick={() => setSearchParams({type: "sport"})}
            className={`car-type sport ${typeFilter === "sport" ? "selected" : ""}`}
        >Sport</button>
        <button 
            onClick={() => setSearchParams({type: "suv"})}
            className={`car-type suv ${typeFilter === "suv" ? "selected" : ""}`}
        >SUV</button>
        <button 
            onClick={() => setSearchParams({type: "salon"})}
            className={`car-type salon ${typeFilter === "salon" ? "selected" : ""}`}
        >Salon</button>
        {typeFilter && <button 
            onClick={() => setSearchParams({})}
            className="car-type clear-filters"
        >Clear filter</button>}
      
      </div>
      <div className="car-list-container">
        {allCars}
      </div>
    </main>
  )
}