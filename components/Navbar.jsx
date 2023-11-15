import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

export default function Navbar() {
    console.log('rendered')
    return (
        <nav id="nav" className="nav">
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
    )
}