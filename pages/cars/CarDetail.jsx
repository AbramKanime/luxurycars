import React, { useState, useEffect } from "react"
import { useParams, Link, Outlet, NavLink, useNavigate } from "react-router-dom"
import { fetchCar, addCarToDB, auth } from "../../firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function CarDetail() {
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const [details, setDetails] = useState({
        address: "",
        city: "",
        state: "",
        country: ""
    })

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
            } else {
              // User is signed out
              // ...
            }
        })
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

    function handleChange(e) {
        const {name, value} = e.target
        setDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
    }

    function displayModal() {
        document.querySelector("#modal").style.display = "block"
    }

    function completeOrder(e) {
        e.preventDefault()
        document.querySelector("#modal").style.display = "none"
        const {address, city, state, country} = details
        document.querySelector("#order-form").reset()

        const {name, color, price, image} = car
        addCarToDB(name, color, price, image, address, city, state, country, user)
        navigate("/orders")
    }

    function closeModal() {
        document.querySelector("#modal").style.display = "none"
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
                        to="/cars"
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
                <div className="close-modal-btn-container">
                    <button onClick={closeModal} className="modal-close-btn" id="modal-close-btn">X</button>
                </div>
                <h3 className="checkout-header">Fill your details</h3>
                <form onSubmit={completeOrder} id="order-form">
                    <input 
                        name="address" 
                        type="text"
                        onChange={handleChange}
                        value={details.value}
                        placeholder="Enter your shipping address" required/>
                    <input 
                        name="city" 
                        type="text"
                        onChange={handleChange}
                        value={details.value} 
                        placeholder="City" required/>
                    <input 
                        name="state" 
                        type="text"
                        onChange={handleChange}
                        value={details.value} 
                        placeholder="State" required/>
                    <input 
                        name="country" 
                        type="text"
                        onChange={handleChange}
                        value={details.value} 
                        placeholder="Country" required/>
                    <button className="complete-order-btn" type="submit">Complete order</button>
                </form>
            </div>
        </>
    )
}