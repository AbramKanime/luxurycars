import React from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
  return (
    <div className="site-wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}