import React, { useState, useEffect, Suspense } from "react"
import {Link} from "react-router-dom"

const CarsFromDb = React.lazy(() => {
  return import("../utilities/CarsFromDb")
})

export default function Home() {

  return (
    <main>
        <section className="home-container">
          <h1>Unleash Luxury, Embrace Elegance: Your Journey Begins Here!</h1>
          <p>At LuxuryCars, we invite you to explore a world of automotive excellence where sophistication meets innovation. 
              Our curated collection of premium vehicles represents the epitome of style, power, and prestige. 
              Whether you're a connoisseur of luxury automobiles or embarking on your first journey into 
              the world of opulence, you've arrived at the right destination.
          </p>
        </section>
        <section className="featured-cars-section">
          <p className="title">Featured cars</p>
          <Suspense fallback={<h4>Loading...</h4>}>
            <div className="featured-cars">
              <CarsFromDb />
            </div>
          </Suspense>
          <Link to="cars" className="explore-link">View more cars</Link>
        </section>
    </main>
  )
}