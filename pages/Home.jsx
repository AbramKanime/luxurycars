import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { fetchCarsFromDB } from "../api"

export default function Home() {
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

  const carsElement = cars.map(car => (
    <div key={car.id} className="car-tile">
      <Link
          to="cars"
          className="car-container"
      >
          <img src={car.image} />
          <div className="car-info">
              <h3>{car.name}</h3>
              <p>${car.price}</p>
          </div>
          <i className={`car-type ${car.type}`}>{car.type}</i>
      </Link>
    </div>
  ))

  const featuredCars = loading ? <h1>Loading cars...</h1>
  : error ? <h1>There was an error: {error.message}</h1>
  : carsElement

  return (
    <main>
        <section className="home-container">
            <h1>Unleash Luxury, Embrace Elegance: Your Journey Begins Here!</h1>
            <p>At LuxuryCars, we invite you to explore a world of automotive excellence where sophistication meets innovation. 
              Our curated collection of premium vehicles represents the epitome of style, power, and prestige. 
              Whether you're a connoisseur of luxury automobiles or embarking on your first journey into 
              the world of opulence, you've arrived at the right destination.</p>
        </section>
        <section className="featured-cars-section">
            {featuredCars}
            <Link to="cars">Explore</Link>
        </section>
    </main>
  )
}