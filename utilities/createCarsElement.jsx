import { Link } from "react-router-dom"

export function createCarElement(cars) {
    const carsElement = cars.map(car => (
        <div key={car.id} className="car-tile">
          <Link
              to={car.id}
              className="car-container"
          >
              <img src={car.image} />
              <div className="car-info">
                  <h3>{car.name}</h3>
                  <p>${car.price}</p>
              </div>
              <div className="car-type-color-div">
                <p className={`car-type ${car.type}`}>{car.type}</p>
                <p className="car-color">Color: {car.color}</p>
              </div>
          </Link>
        </div>
      ))
    return carsElement
}