import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { fetchCarsFromDB } from "../api"

export default function Home() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)

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
        console.error(error)
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
      >
          <img src={car.image} />
          <div className="car-info">
              <h3>{car.name}</h3>
              <p>${car.price}<span>/day</span></p>
          </div>
          <i className={`car-type ${car.type} selected`}>{car.type}</i>
      </Link>
    </div>
  ))

  return (
    <main>
        <section className="home-container">
            <h1>Unleash Luxury, Embrace Elegance: Your Journey Begins Here!</h1>
            <p>At LuxuryCars, we invite you to explore a world of automotive excellence where sophistication meets innovation. 
              Our curated collection of premium vehicles represents the epitome of style, power, and prestige. 
              Whether you're a connoisseur of luxury automobiles or embarking on your first journey into 
              the world of opulence, you've arrived at the right destination.</p>
            <Link to="cars">Explore</Link>
        </section>
        <section className="featured-cars-section">
            {carsElement}
        </section>
    </main>
  )
}