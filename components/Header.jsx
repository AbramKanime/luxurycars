import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <Link className="site-logo" to="/">LuxuryCars</Link>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/cars">Cars</NavLink>
            </nav>
        </header>
    )
}