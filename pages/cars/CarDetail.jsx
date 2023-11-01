import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchCar } from "../../api"


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
    console.log(car)

    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>There was an error!</h1>
    }

    return (
        <main>
            <div className="van-detail-container">
                <Link
                    to=".."
                    relative="path"
                    className="back-button"
                >&larr; <span>Back to cars</span></Link>
                
                {car && (
                    <div className="van-detail">
                        <img src={car.image} />
                        <i className={`van-type ${car.type} selected`}>
                            {car.type}
                        </i>
                        <h2>{car.name}</h2>
                        <p className="van-price">${car.price}</p>
                        <p>{car.detail}</p>
                        <button className="link-button">Buy this car</button>
                    </div>
                )}
            </div>
        </main>
    )
}