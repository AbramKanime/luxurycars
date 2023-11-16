import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import Navbar from "./Navbar"

export default function Header() {
    const [on, setOn] = useState(false)

    function toggle() {
        setOn(prevState => !prevState)
    }

    return (
        <header>
            <div className="header-logo">
                <Link className="site-logo" to="/">LuxuryCars</Link>
                <FaBars id="menu-bar-show" onClick={toggle} />
                <nav className="nav-2">
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
                        to="/orders"
                        className={({isActive}) => isActive ? "active-link" : ""}
                    >
                        My Orders
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
            <div className="nav-bar">
                {on && <Navbar />}
            </div>
        </header>
    )
}