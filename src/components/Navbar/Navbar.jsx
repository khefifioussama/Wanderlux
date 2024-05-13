import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCaretDown, FaPhone, FaFacebook, FaInstagram, FaUser } from "react-icons/fa";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import logoImage from "../Navbar/Logo-h.jpg";

export const NavbarLinks = [
  {
    name: "Acceuil",
    link: "/",
  },
  
  {
    name: "Comité",
    link: "/comite",
  },
 
  {
    name: "Hotels En Tunisie",
    link: "/hotel",
    dropdown: true,
    sublinks: [
      "Ain Drahem", "Bizerte", "Djerba", "Douz", "Gabes", "Gafsa", "Hammamet", "Kairouan",
      "Kasserine", "Kelibia", "Kerkennah", "Korba", "Korbous", "Le Kef", "Mahdia", "Monastir",
      "Nabeul", "Nefta", "Sbeitla", "Sfax", "Sidi Bouzid", "Sousse", "Tabarka", "Tozeur",
      "Tunis", "Zaghouan", "Zarzis",
    ],
  },
  {
    name: "Voyages Organisés",
    link: "https://wanderlux-travel.tn/voyages-organises/liste",
    dropdown: true,
    sublinks: [
      "Turquie", "Dubai", "Maroc", "Egypte",
      "Nos Croisières", "Nos Voyages En Turquie", "Nos Voyages Sans Visa",
      "Nos Voyages En Egypte", "Nos Voyages Au Maroc", "Nos Voyages À Petit Prix",
      "Nos Voyages De Luxe", "Nos Voyages En Afrique Du Sud",
    ],
  },
  {
    name: "Omra",
    link: "/omra",
  },
  {
    name: "Circuit & Excursions",
    link: "https://wanderlux-travel.tn/circuits-en-tunisie-organise/liste",
  },
  {
    name: "Voiture",
    link: "/Voiture",
  },
  {
    name: "Super Promo",
    link: "/Super",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const Navbar = ({ user, handleLogout }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleFacebookClick = () => {
    window.location.href = "https://www.facebook.com/wander.luxtravel1";
  };

  const handleInstagramClick = () => {
    window.location.href = "https://www.instagram.com/wanderlux_travel_/?igsh=MzRlODBiNWFlZA%3D%3D";
  };

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm text-black shadow-md">
        <div className="bg-gradient-to-r from-primary to-secondary text-white ">
          <div className="container py-[2px] sm:block hidden">
            <div className="flex items-center justify-between">
              <Link to="/groupe" className="navbar-link groupe-link">Groupe</Link>
              <div className="group relative cursor-pointer">
                <div className={`absolute z-[9999] hidden rounded-md bg-white p-2 text-black shadow-md`} style={{ width: "150px", right: "-15px" }}>
                  {/* Dropdown content */}
                </div>
              </div>
              {/* Other links */}
              <span className="flex items-center">
                <Link to="/contact" className="mr-1">Contact</Link>
                <span className="mx-1">|</span>
                &nbsp; &nbsp;
                <FaPhone />
                &nbsp;
                <a href="tel:+21698740690" className="ml-1">+216 98 740 690</a>
                &nbsp; &nbsp;
                <span className="mx-1">|</span>
                &nbsp; &nbsp;
                <FaFacebook className="mx-1 cursor-pointer" onClick={handleFacebookClick} />
                &nbsp; &nbsp;
                <FaInstagram className="mx-1 cursor-pointer" onClick={handleInstagramClick} />
                &nbsp; &nbsp;
                <span className="mx-1">|</span>
                &nbsp; &nbsp;
                {user ? (
                  <>
                    <div className="relative">
                      <FaUser size={20} className="cursor-pointer" onClick={toggleMenu} />
                      {showMenu && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                          <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <Link to="/auth" className="text-white">
                    S'authentifier
                  </Link>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4  font-bold text-2xl">
              <img src={logoImage} alt="Logo" className="h-10" height="150px" />
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-6 ">
                {NavbarLinks.map((link) => (
                  <li key={link.name} className="py-4">
                    {link.dropdown ? (
                      <div className="group relative cursor-pointer">
                        <a href={link.link} className="flex items-center gap-[2px]">
                          {link.name}{" "}
                          <span>
                            <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                          </span>
                        </a>
                        <div className={`absolute ${link.name === "Voyages Organisés" ? "-left-9" : "-left-0"} z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md`} style={{ width: "400px", minWidth: "300px" }}>
                          {link.name === "Voyages Organisés" ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-semibold mb-2">Voyages En Groupe</p>
                                {link.sublinks.slice(0, 6).map((sublink, index) => (
                                  <Link
                                    key={index}
                                    to={`https://wanderlux-travel.tn/voyages-organises/liste`}
                                    className="p-2 hover:bg-primary/20 block"
                                    style={{ padding: "8px" }}
                                  >
                                    {sublink}
                                  </Link>
                                ))}
                              </div>
                              <div>
                                <p className="font-semibold mb-2">Voyages À La Carte</p>
                                {link.sublinks.slice(6).map((sublink, index) => (
                                  <Link
                                    key={index}
                                    to={`https://wanderlux-travel.tn/voyages-a-la-carte/liste`}
                                    className="p-2 hover:bg-primary/20 block"
                                    style={{ padding: "8px" }}
                                  >
                                    {sublink}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-3 gap-4">
                              {link.sublinks.map((sublink, index) => (
                                <Link
                                  key={index}
                                  to={`https://wanderlux-travel.tn/hotel/tn-${sublink.toLowerCase().replace(/\s+/g, "-")}/tous/${new Date().toISOString().split('T')[0]}`}
                                  className="p-2 hover:bg-primary/20 block"
                                  style={{ padding: "8px" }}
                                >
                                  {sublink}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <NavLink to={link.link} activeClassName="active">
                        {link.name}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <div className="md:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className=" cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  );
};

export default Navbar;
