import React from "react"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Cars from "./pages/cars/Cars"
import CarDetail from "./pages/cars/CarDetail"
import About from "./pages/About"
import Contact from "./pages/Contact"
import CarInfo from "./pages/cars/CarInfo"
import CarPhoto from "./pages/cars/CarPhoto"
import AccountLayout from "./components/AccountLayout"
import Login from "./pages/Login"
import CreateAccount from "./pages/CreateAccount"
import User from "./pages/user/User"
import AuthRequired from "./components/AuthRequired";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route element={<AuthRequired />}>
            <Route path="orders" element={<User />} />
          </Route>
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<CreateAccount />} />
          </Route>
          <Route path="cars" element={<Cars />} />
          <Route element={<AuthRequired />}>
            <Route path="cars/:id" element={<CarDetail />}>
              <Route index element={<CarInfo />} />
              <Route path="photos" element={<CarPhoto />} />
            </Route>
          </Route>
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)