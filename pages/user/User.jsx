import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { authSignOut } from "../../firebase"

const auth = getAuth()
let displayName 
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid
    displayName = user.displayName
    // ...
  } else {
    // User is signed out
    // ...
    const navigate = useNavigate()
    navigate("/myaccount", { replace: true })
  }
})

export default function User() {
    const [name, setName] = useState(null)

    useEffect(() => {
        setName(displayName)
    }, [displayName])

    if (!name) {
        return <h3>Loading</h3>
    }

    return (
        <div>
            <h1>{name} logged in</h1>
            <button onClick={authSignOut}>X</button>
        </div>
    )
}