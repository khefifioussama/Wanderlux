import React from "react";
import FooterLogo from "../../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import NatureVid from "../../assets/video/footer.mp4";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="dark:bg-gray-950 py-10 relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute right-0 top-0 h-full overflow-hidden w-full object-cover z-[-1]"
        >
          <source src={NatureVid} type="video/mp4" />
        </video>
        <div className="container">
          <div className="grid md:grid-cols-3 py-5 bg-white/80 backdrop-blur-sm rounded-t-xl">
            <div className="py-8 px-4">
              <h1 className="flex items-center gap-3 text-xl sm:text-3xl font-bold text-justify sm:text-left">
                <img src={FooterLogo} alt="" className="max-h-[60px]" />
              </h1>
              <p className="text-sm">
                Wanderlux, Votre Passerelle Vers Des Aventures Extraordinaires À Travers La Tunisie, Situé À Manouba.
              </p>
              <br />
              <div className="flex items-center gap-3 ">
                <FaLocationArrow />
                <a href="https://maps.app.goo.gl/DBvD3P23DvTrhwer7" target="_blank" rel="noopener noreferrer">
                  <p>Route Mateur Km7 Manouba, Tunisia</p>
                </a>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <FaMobileAlt />
                <a href="tel:+21698740690">+216-98-740-690</a>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <FaMobileAlt />
                <a href="tel:+21671601402">+216-71-601-402</a>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <FaMobileAlt />
                <a href="mailto:Resa@Wanderlux-Travel.Tn">Resa@Wanderlux-Travel.Tn</a>
              </div>
            </div>
            {/* Social handles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold text-justify sm:text-left mb-3">
                  Liens Sociaux
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="https://www.instagram.com/wanderlux_travel_/?igsh=MzRlODBiNWFlZA%3D%3D" className="flex items-center hover:text-primary">
                      <FaInstagram className="text-3xl" />
                      &nbsp;
                      <span>Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/wander.luxtravel1" className="flex items-center hover:text-primary">
                      <FaFacebook className="text-3xl" />
                      &nbsp;
                      <span>Facebook</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/* Quick links */}
              <div className="py-8 px-4">
                <h1 className="text-xl font-bold text-justify sm:text-left mb-3">
                  Liens Rapides
                </h1>
                <ul className="flex flex-col gap-3">
                  <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-700 dark:text-gray-200">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                      <span>&#11162;</span>
                      <span>Accueil</span>
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-700 dark:text-gray-200">
                    <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                      <span>&#11162;</span>
                      <span>A Propos</span>
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-700 dark:text-gray-200">
                    <Link
                      to="/authentifier"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <span>&#11162;</span>
                      <span>Authentifier</span>
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-700 dark:text-gray-200">
                    <Link
                      to="/contact"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <span>&#11162;</span>
                      <span>Contact</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
