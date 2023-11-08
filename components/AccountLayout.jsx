import React from "react"
import { Outlet, NavLink } from "react-router-dom"

export default function Layout() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <div className="account-container">
            <nav className="car-detail-nav">
                <NavLink
                    to="."
                    end
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Login
                </NavLink>
                <NavLink
                    to="signup"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Create Account
                </NavLink>
            </nav>
        <Outlet />
        </div>
  )
}