import React from "react"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Cars from "./pages/cars/Cars"
import CarDetail from "./pages/cars/CarDetail"
import About from "./pages/About"
import Contact from "./pages/Contact"
import CarInfo from "./pages/cars/CarInfo"
import CarPhoto from "./pages/cars/CarPhoto"
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="account" element={<Login />} />
          <Route path="cars" element={<Cars />} />
          <Route path="cars/:id" element={<CarDetail />}>
            <Route index element={<CarInfo />} />
            <Route path="photos" element={<CarPhoto />} />
          </Route>
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)