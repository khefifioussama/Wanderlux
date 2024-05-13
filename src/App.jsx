import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";
import PlacesRoute from "./pages/PlacesRoute";
import About from "./pages/About";
import Voiture from "./pages/Voiture";
import Dash from "./pages/dashboard";
import Hotel from "./pages/Hotel";
import Auth from "./pages/Auth";
import Omra from "./pages/omra";

import Conn from "./pages/Conn";
import Groupe from "./pages/groupe";
import Comite from "./pages/comite";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Super from "./pages/Super";
import BlogsDetails from "./pages/BlogsDetails";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id" element={<BlogsDetails />} />
            <Route path="best-places" element={<PlacesRoute />} />
            <Route path="about" element={<About />} />
            <Route path="Voiture" element={<Voiture />} />
            <Route path="Dash" element={<Dash />} />
            <Route path="Hotel" element={<Hotel/>} />
            <Route path="Auth" element={<Auth/>} />
            <Route path="Conn" element={<Conn/>} />
            <Route path="Omra" element={<Omra/>} />
            <Route path="Groupe" element={<Groupe/>} />
            <Route path="Comite" element={<Comite/>} />
            <Route path="Profile" element={<Profile/>} />
            <Route path="Contact" element={<Contact/>} />
            <Route path="Super" element={<Super/>} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
