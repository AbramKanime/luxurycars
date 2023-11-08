import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { fetchCarsFromDB } from "../firebase"
import { CreateCarsElement } from "../utilities/CreateCarsElement"

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

  const carsElement = CreateCarsElement(cars, 'cars/')

  const featuredCars = loading ? <h3>Loading featured cars...</h3>
  : error ? <h3>There was an error: {error.message}</h3>
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
          <p className="title">Featured cars</p>
          {featuredCars}
          <Link to="cars">Explore</Link>
        </section>
    </main>
  )
}