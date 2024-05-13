import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import the location icon

const destinations = [
  "Ain Drahem",
  "Bizerte",
  "Djerba",
  "Douz",
  "Gabes",
  "Gafsa",
  "Hammamet",
  "Kairouan",
  "Kasserine",
  "Kelibia",
  "Kerkennah",
  "Korba",
  "Korbous",
  "Le Kef",
  "Mahdia",
  "Monastir",
  "Nabeul",
  "Nefta",
  "Sbeitla",
  "Sfax",
  "Sidi Bouzid",
  "Sousse",
  "Tabarka",
  "Tozeur",
  "Tunis",
  "Zaghouan",
  "Zarzis"
];

const Hero = () => {
  const [destinationValue, setDestinationValue] = useState("");
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [roomsValue, setRoomsValue] = useState(1);
  const [adultsValue, setAdultsValue] = useState(1);
  const [childrenValue, setChildrenValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const initializeDocsBot = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://widget.docsbot.ai/chat.js";
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript);
        script.addEventListener("load", () => {
          window.DocsBotAI.mount({ id: "MQ6dxmeedfkb4qX8BnOM/AeTB8Tl9gUAauWvhVrkd" });
          const findRoot = selector => new Promise((resolve, reject) => {
            if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
            } else {
              const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                  resolve(document.querySelector(selector));
                  observer.disconnect();
                }
              });
              observer.observe(document.body, { childList: true, subtree: true });
            }
          });
          findRoot("#docsbotai-root").then(resolve).catch(reject);
        });
        script.addEventListener("error", (error) => {
          reject(error.message);
        });
      });
    };

    initializeDocsBot()
      .then(() => console.log('DocsBot AI initialized'))
      .catch((error) => console.error('Error initializing DocsBot AI:', error));
  }, []);

  const handleDestinationChange = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const matches = inputLength === 0 ? [] : destinations.filter(dest =>
      dest.toLowerCase().slice(0, inputLength) === inputValue
    );
    setSuggestions(matches);
    setDestinationValue(value);
  };

  const handleSuggestionClick = (value) => {
    setDestinationValue(value);
    setSuggestions([]);
  };

  const handleSearch = () => {
    const formattedDestination = destinationValue.toLowerCase().replace(/\s+/g, "-");
    const arrivalDate = new Date(startDateValue).toISOString().split('T')[0]; // Get yyyy-mm-dd format for arrival date
    let searchParams = `tn-${formattedDestination}/tous/${arrivalDate}`;
    
    // Check if endDateValue is not empty
    if (endDateValue) {
      const departureDay = new Date(endDateValue).getDate(); // Get day part of departure date
      searchParams += `/${departureDay}`;
    }
    
    const url = `https:/wanderlux-travel.tn/hotel/${searchParams}`;
    window.location.href = url;
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="hero-form-container bg-transparent h-full">
      <div className="hero-form-content ">
        <div className="hero-form-container-inner container">
          <div className="text-white">
            <p data-aos="fade-up" className="text-sm">
<br></br><br></br><br></br><br></br><br></br><br></br>
              Nos Voyages
            </p>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="font-bold text-3xl"
            >
              Recherchez votre destination
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="hero-form-fields space-y-4 bg-black bg-opacity-45 rounded-md p-4 relative flex flex-wrap items-center"
          >
            <div className="flex flex-wrap gap-4 w-full items-center">
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <label htmlFor="destination" className="opacity-70 text-right w-20 lg:w-auto" style={{ color: 'white' }}>
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  placeholder="Votre Destination"
                  className="hero-form-input w-full bg-gray-100 range accent-primary focus:outline-primary focus:outline outline-1 rounded-full p-2 pl-8" // Added left padding for icon
                  value={destinationValue}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                />
                {suggestions.length > 0 && (
                  <ul className={`hero-form-autocomplete absolute bg-white rounded-md p-2 w-full ${suggestions.length <= 3 ? 'has-few-items' : 'has-many-items'}`}>
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="cursor-pointer hover:bg-gray-200 p-1"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <label htmlFor="startDate" className="opacity-70 text-right w-20 lg:w-auto" style={{ color: 'white' }}>
                  Arrivé
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className="hero-form-input !placeholder-slate-400 bg-gray-100 rounded-full focus:outline-primary focus:outline outline-1 p-2"
                  value={startDateValue}
                  onChange={(e) => setStartDateValue(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <label htmlFor="endDate" className="opacity-70 text-right w-20 lg:w-auto" style={{ color: 'white' }}>
                  Depart
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="hero-form-input !placeholder-slate-400 bg-gray-100 rounded-full focus:outline-primary focus:outline outline-1 p-2"
                  value={endDateValue}
                  onChange={(e) => setEndDateValue(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <label htmlFor="rooms" className="opacity-70 text-right w-20 lg:w-auto" style={{ color: 'white' }}>
                  Chambre
                </label>
                <input
                  type="number" // Change input type to number
                  name="rooms"
                  id="rooms"
                  placeholder="Votre Chambre"
                  className="hero-form-input bg-gray-100 rounded-full focus:outline-primary focus:outline outline-1 p-2"
                  onClick={openModal} // Open modal when clicked
                  readOnly // Make it read-only to prevent direct editing
                />
                <button className="hero-form-submit bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-8 py-4 rounded-full duration-200 ml-auto" onClick={handleSearch}>
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="hero-modal fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="hero-modal-content bg-white p-8 rounded-lg">
            <label htmlFor="roomsModal" className="block mb-2">
              Chambre
            </label>
            <input
              type="text"
              id="roomsModal"
              placeholder="1"
              className="w-full mb-4"
              value={roomsValue}
              onChange={(e) => setRoomsValue(e.target.value)}
            />
            <label htmlFor="adultsModal" className="block mb-2">
              Adultes
            </label>
            <select
              id="adultsModal"
              className="w-full mb-4"
              value={adultsValue}
              onChange={(e) => setAdultsValue(e.target.value)}
            >
              {[...Array(10).keys()].map((adult) => (
                <option key={adult + 1} value={adult + 1}>
                  {adult + 1}
                </option>
              ))}
            </select>
            <label htmlFor="childrenModal" className="block mb-2">
              Enfants
            </label>
            <select
              id="childrenModal"
              className="w-full mb-4"
              value={childrenValue}
              onChange={(e) => setChildrenValue(e.target.value)}
            >
              {[...Array(11).keys()].map((child) => (
                <option key={child} value={child}>
                  {child}
                </option>
              ))}
            </select>
            <button className="hero-modal-close bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-2 rounded-full duration-200 ml-auto" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
      <div id="docsbotai-root"></div> {/* This is where the DocsBot AI chat widget will be rendered */}
    </div>
  );
};

export default Hero;
