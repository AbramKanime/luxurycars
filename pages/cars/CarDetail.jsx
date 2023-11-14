import React, { useState, useEffect } from "react"
import { useParams, Link, Outlet, NavLink } from "react-router-dom"
import { fetchCar, addCarToDB } from "../../firebase"
import { onAuthStateChanged, getAuth } from "firebase/auth"

const auth = getAuth()
 
onAuthStateChanged(auth, (user) => {
  if (user) {
    // const uid = user.uid
    // ...
  } else {
    // User is signed out
    // ...
  }
})

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

    function displayModal() {
        document.querySelector("#modal").style.display = "block"
    }

    function completeOrder(e) {
        e.preventDefault()
        document.querySelector("#modal").style.display = "none"
        const address = document.getElementById("address").value
        const city = document.getElementById("city").value
        const state = document.getElementById("state").value
        const country = document.getElementById("country").value
        document.getElementById("order-form").reset()

        const user = auth.currentUser
        const {name, color, price, image} = car
        addCarToDB(name, color, price, image, address, city, state, country, user)
    }

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
        <>
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
                    <button onClick={displayModal} className="link-button">Order this car</button>
                </div>
            </main>
            <div className="modal" id="modal">
                <h3 className="checkout-header">Fill your details</h3>
                <form onSubmit={completeOrder} id="order-form">
                    <input id="address" type="text" placeholder="Enter your shipping address" required/>
                    <input id="city" type="text" placeholder="City" required/>
                    <input id="state" type="text" placeholder="State" required/>
                    <input id="country" type="text" placeholder="Country" required/>
                    <button className="complete-order-btn" type="submit">Complete order</button>
                </form>
            </div>
        </>
    )
}