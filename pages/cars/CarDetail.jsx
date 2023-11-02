import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
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

    return (
        <main>
            <div className="car-detail-container">
                <Link
                    to=".."
                    relative="path"
                    className="back-button"
                >&larr; <span>Back to cars</span></Link>
                
                {car && (
                    <div className="car-detail">
                        <img src={car.image} />
                        <div className="car-type-color-div">
                            <p className={`car-type ${car.type}`}>{car.type}</p>
                            <p className="car-color">Color: {car.color}</p>
                        </div>
                        <h2>{car.name}</h2>
                        <p className="car-price">Price: ${car.price}</p>
                        <p>{car.detail}</p>
                        <button className="link-button">Buy this car</button>
                    </div>
                )}
            </div>
        </main>
    )
}