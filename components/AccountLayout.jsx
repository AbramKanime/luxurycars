import React, { useEffect} from "react"
import { Outlet, NavLink } from "react-router-dom"
import { MenuContext } from "./Layout"

export default function AccountLayout() {
    const {setOn} = React.useContext(MenuContext)
  
    useEffect(() => {
        setOn(false)
    }, [])

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