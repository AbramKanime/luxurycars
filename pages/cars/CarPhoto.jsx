import React from "react"
import { useOutletContext } from "react-router-dom"

export default function CarInfo() {
    const {car} = useOutletContext()
    const carPhotos = car.photos
    console.log(carPhotos)

    const carPhotosElement = carPhotos.map(photo => (
        <div key={photo} className="car-photo-tile">
            <img src={photo} />
        </div>
      ))

    return (
        <div className="car-photo-tile-container">    
            {carPhotosElement}
        </div>
    )
}