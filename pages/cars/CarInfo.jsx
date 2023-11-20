import React from "react"
import { useOutletContext } from "react-router-dom"


export default function CarInfo() {
    const {car} = useOutletContext()
    console.log(car)
    // const {type, color, price, name, detail} = car

    return (
        <>      
            {car && (
                <div className="car-detail">
                    <div className="car-type-color-div">
                        <p className={`car-type ${car.type} selected`}>{car.type}</p>
                        <p className="car-color">Color: {car.color}</p>
                    </div>
                    <h2>{car.name}</h2>
                    <p className="car-price">Price: ${car.price}</p>
                    <p>{car.detail}</p>
                </div>
            )}
        </>
    )
}