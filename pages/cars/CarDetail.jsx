import React, { useState, useEffect } from "react"
import { useParams, Link, Outlet, NavLink } from "react-router-dom"
import { fetchCar } from "../../firebase"


export default function CarDetail() {
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = React.useState(null)
    const params = useParams()

    useEffect(() => {
        async function loadCar() {
          setLoading(true)
          try {
            const selectedCar = await fetchCar(params.id)
            setCar(selectedCar[0])
          } catch (error) {
            setError(error.message)
          } finally {
            setLoading(false)
          }
        }
        loadCar()
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>There was an error!</h1>
    }

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <main>
            <div className="car-detail-container">
                <Link
                    to=".."
                    relative="path"
                    className="back-button"
                >&larr; <span>Back to cars</span></Link>

                <nav className="car-detail-nav">
                    {car && <img src={car.image} />}
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Details
                    </NavLink>
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Photos
                    </NavLink>
                </nav>

                <Outlet context={{car}} />
                <button className="link-button">Buy this car</button>
            </div>
        </main>
    )
}