import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"

export default function Navbar() {
    const [on, setOn] = useState(false)

    function showToggle() {
        // setOn(prevState => !prevState)
        document.getElementById("nav").style.display = "flex"
        setOn(prevState => !prevState)
    }

    function hideToggle() {
        document.getElementById("nav").style.display = "none"
        setOn(prevState => !prevState)
    }
    return (
        <div className="nav-bar">
            {!on ? <FaBars id="menu-bar-show" onClick={showToggle} /> 
            : <FaTimes id="menu-bar-hide" onClick={hideToggle}/>}
             
                <nav id="nav">
                    <NavLink 
                        to="/"
                        className={({isActive}) => isActive ? "active-link" : ""}
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/about"
                        className={({isActive}) => isActive ? "active-link" : ""}
                    >
                        About
                    </NavLink>
                    <NavLink 
                        to="/myaccount"
                        className={({isActive}) => isActive ? "active-link" : ""}
                    >
                        My Account
                    </NavLink>
                    <NavLink 
                        to="/cars"
                        className={({isActive}) => isActive ? "active-link" : ""}
                    >
                        Cars
                    </NavLink>
                    <NavLink 
                        to="/contact"
                        className={({isActive}) => isActive ? "active-link" : ""}
                    >
                        Contact
                    </NavLink>
                </nav>
        </div>
    )
}