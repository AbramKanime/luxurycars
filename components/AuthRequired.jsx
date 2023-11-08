import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { onAuthStateChanged, getAuth } from "firebase/auth"

let authenticated = false

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid
    authenticated = true
    // ...
  } else {
    // User is signed out
    // ...
    authenticated = false
  }
})

export default function AuthRequired() {
    const location = useLocation()

    if (!authenticated) {
        return (
            <Navigate 
                to="/account"
                state={{
                    message: "Login to your account first",
                    from: location.pathname
                }}
                replace
             />
        )
    }
    return <Outlet />
}