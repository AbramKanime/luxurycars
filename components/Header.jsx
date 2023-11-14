import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import Navbar from "./NavBar"

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
            </div>
            <div className="nav-bar">
                {on && <Navbar />}
            </div>
        </header>
    )
}