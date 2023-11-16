import React, { useState, useEffect, Suspense } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { authSignOut, auth } from "../../firebase"

const OrderedCarsFromDb = React.lazy(() => {
  return import("../../utilities/OrderedCarsFromDb")
})

export default function User() {
    const [name, setName] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const displayName = user.displayName
            setName(displayName)
          } else {
            
          }
           
        })
    }, [])

    return (
        <main>
          <div className="order-page-container">
            <div className="welcome-container">
              <h2>Welcome back, {name}.</h2>
              <button onClick={authSignOut}>Sign out</button>
            </div>
            <Suspense fallback={<h3>Loading...</h3>}>
              <div className="ordered-cars">
                <OrderedCarsFromDb />
              </div>
            </Suspense>
          </div>
        </main>
    )
}