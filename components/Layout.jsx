import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const MenuContext = React.createContext()

export default function Layout() {
  const [on, setOn] = useState(false)

  return (
    <MenuContext.Provider value={{on, setOn}}>
      <div className="site-wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </MenuContext.Provider>
  )
}

export { MenuContext }