import React from "react"
import { Link, NavLink } from "react-router-dom"
import Navbar from "./NavBar"

export default function Header() {
    return (
        <header>
            <Link className="site-logo" to="/">LuxuryCars</Link>
            <Navbar />
        </header>
    )
}