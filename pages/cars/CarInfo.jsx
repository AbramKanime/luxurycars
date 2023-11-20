import React from "react"
import { useOutletContext } from "react-router-dom"


export default function CarInfo() {
    const {car} = useOutletContext()
    const {type, color, price, name, detail} = car

    return (
        <>      
            {car && (
                <div className="car-detail">
                    <div className="car-type-color-div">
                        <p className={`car-type ${type} selected`}>{type}</p>
                        <p className="car-color">Color: {color}</p>
                    </div>
                    <h2>{name}</h2>
                    <p className="car-price">Price: ${price}</p>
                    <p>{detail}</p>
                </div>
            )}
        </>
    )
}