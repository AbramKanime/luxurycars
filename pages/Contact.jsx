import React, {useEffect, useState} from "react"
import { addMessageToDB, auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function Contact() {
    const [user, setUser] = useState(null)
    const [confirmMessage, setConfirmMessage] = useState(null)
    const [details, setDetails] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                // User is signed out
                // ...
            }
        })
    }, [])

    function handleChange(e) {
        const {name, value} = e.target
        setDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }))
    }

    function submitForm(e) {
        e.preventDefault()
        
        const {name, email, subject, message} = details
        addMessageToDB(name, email, subject, message, user)
        document.getElementById("form").reset()
        setConfirmMessage({message: "Information sent! A customer care staff will get back to you."})
    }
    return (
        <main>
            <section className="contact-container">
                <form onSubmit={submitForm} id="form">
                    <div>
                        <label for="name">Full Name:</label><br></br>
                        <input 
                            onChange={handleChange} 
                            value={details.value} 
                            name="name" 
                            type="text" 
                            required/>
                    </div>
                    <div>
                        <label for="email">Email address:</label><br></br>
                        <input 
                            onChange={handleChange} 
                            value={details.value} 
                            name="email"
                             type="text"
                             required/>
                    </div>
                    <div>
                        <label for="subject">Subject:</label><br></br>
                        <input 
                            onChange={handleChange} 
                            value={details.value} 
                            name="subject" 
                            type="text"
                            required/>
                    </div>
                    <div>
                        <label for="message">Message:</label><br></br>
                        <textarea 
                            onChange={handleChange} 
                            value={details.value}
                            name="message" 
                            rows="5" 
                            cols="38"></textarea>
                    </div>
                    <button type="submit" className="contact-btn">Submit</button>
                </form>
                {confirmMessage ? <h4>{confirmMessage.message}</h4> : null}
            </section>
        </main>
    )
}