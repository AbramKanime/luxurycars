import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { authCreateAccountWithEmail } from "../firebase"

export default function CreateAccount() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "", 
    firstName: "", lastName: "" })

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
        const {email, password, firstName, lastName} = loginFormData
        authCreateAccountWithEmail(email, password, firstName, lastName, navigate, from)
        document.getElementById("form").reset()
        // console.log(`${form.value} clicked`)
    }

    return (
        <main>
            <div className="login-container">
                <form onSubmit={handleSubmit} id="form" className="login-form">
                    <div className="auth-fields-and-buttons">
                        <input 
                            name="firstName" 
                            type="text" 
                            placeholder="First name"
                            onChange={handleChange}
                            value={loginFormData.value} 
                        />
                        <input 
                            name="lastName" 
                            type="text" 
                            placeholder="Last name"
                            onChange={handleChange}
                            value={loginFormData.value}
                        />
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
                        
                        <button value="create-acc" className="login-btns">Create Account</button>
                    </div>
                </form>
            </div>
        </main>
    )
}