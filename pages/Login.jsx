import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import googleIcon from "../assets/images/google.png"
import { authSignInWithEmail } from "../firebase"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || "/myaccount"

    function handleChange(e) {
        const { name, value} = e.target
        setLoginFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { email, password } = loginFormData
        authSignInWithEmail(email, password, navigate, setStatus, setError, from)
        document.getElementById("form").reset()
    }

    return (
        <main>
            <div className="login-container">
                {location.state?.message && <h3 className="login-error">{location.state.message}</h3>}
                {error ?.message && <h3 className="login-error">{error.message}</h3>}

                <form onSubmit={handleSubmit} id="form" className="login-form">
                    <div className="google-button">
                        <button value="google-signin" className="login-btns sign-in-with-google-btn">
                            <img src={googleIcon} className="google-btn-logo" />
                            Sign in with Google
                        </button>
                    </div>

                    <div className="auth-fields-and-buttons">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={loginFormData.value}
                        />
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="Password"
                            onChange={handleChange}
                            value={loginFormData.value}
                        />
                        
                        <button 
                            disabled={status === "submitting"} 
                            value="normal-signin" 
                            className="login-btns">
                                {status === "submitting" ? "Logging in" : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}