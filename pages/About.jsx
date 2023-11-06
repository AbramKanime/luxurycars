import React from "react"
import {Link} from "react-router-dom"
import bgImage from "../assets/images/background-image.jpeg"

export default function About() {
  return (
    <main>
      <div className="about-page-container">
        <img src={bgImage} className="about-hero-image" />
        <div className="about-page-content">
            <h1>Luxury is a lifestyle.</h1>
            <p>At LuxuryCars, we are more than just a luxury car dealership; 
              we are a sanctuary for automotive enthusiasts, a haven of opulence, and 
              a testament to the art of fine driving. Our story is one of passion, dedication, 
              and an unwavering commitment to delivering excellence to every discerning customer 
              who walks through our doors.</p>
            <h3>Our Heritage</h3>
            <p>Since our inception, we've been driven by a deep-rooted love for exceptional automobiles. 
              With a history steeped in luxury car expertise, we have evolved into a trusted name 
              in the industry. Our journey has been marked by the pursuit of perfection, 
              curating a collection of the most prestigious brands and models that represent 
              the zenith of automotive craftsmanship.</p>
            <h3>A Trusted Partner</h3>
            <p>We have built strong relationships with our clients over the years, 
              and their trust is a testament to the reliability and integrity that define our dealership. 
              Whether you're a seasoned luxury car aficionado or a newcomer to the world of opulence, 
              we're here to serve you with the highest level of professionalism and care.</p>
            <h3>Visit Us</h3>
            <p>Experience the world of luxury and performance at LuxuryCars. 
              We invite you to visit our <strong>cars</strong> section, where you can explore 
              our collection and discuss your automotive aspirations with our dedicated team. 
              We're not just selling cars; we're sharing a passion for the extraordinary.</p>
        </div>
        <div className="about-page-cta">
            <h2>We don't just sell luxury cars; we define them.<br />
            Join us on a journey that celebrates the art of driving, the allure of craftsmanship, 
            and the pursuit of perfection.</h2>
            <Link className="link-button" to="/cars">Explore our cars</Link>
        </div>
      </div>
    </main>
  )
}