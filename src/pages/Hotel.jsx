import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Conn from './Conn'; // Import the Conn component
import { Link, useLocation } from 'react-router-dom';

function Hotel() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numOfGuests, setNumOfGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [starRating, setStarRating] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false); // State for showing the authentication modal
  const location = useLocation();
  const name = location.state?.name;

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'hotels'));
        const fetchedHotels = [];
        querySnapshot.forEach((doc) => {
          fetchedHotels.push({ id: doc.id, ...doc.data() });
        });
        setHotels(fetchedHotels);
      } catch (error) {
        console.error('Error fetching hotels: ', error);
        setError('Error fetching hotels. Please try again later.');
      }
    };

    fetchHotels();

    // Check if user is already logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const showModal = (hotel) => {
    if (isLoggedIn) {
      setSelectedHotel(hotel);
      setModalVisible(true);
    } else {
      setShowAuthModal(true); // Show the authentication modal if user is not logged in
    }
  };

  const handleReserve = async () => {
    if (!selectedHotel || !selectedPrice || !userName || !phoneNumber || !email || !startDate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Construct reservation data
      const reservationData = {
        hotelName: selectedHotel.name,
        selectedPrice: selectedPrice,
        startDate,
        endDate,
        numOfGuests,
        totalPrice,
        userName,
        phoneNumber,
        email,
      };

      // Add reservation to database
      await addDoc(collection(firestore, 'Reservation-hotel'), reservationData);
      alert('Reservation successful!');
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding reservation: ', error);
      alert('Error adding reservation. Please try again later.');
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false); // Close the authentication modal after successful login
    // Open reservation modal
    setSelectedHotel(selectedHotel);
    setModalVisible(true);
  };

  const handleLocationChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLocations(prev => [...prev, value]);
    } else {
      setSelectedLocations(prev => prev.filter(location => location !== value));
    }
  };

  return (
    <div className="hotel-page">
      <div className="search-form">
        <h3>Trouver Votre Hotel</h3>
        <input
          type="text"
          placeholder="Search by Name or Location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <h4>Locations:</h4>
          <div className="location-dropdown">
            <label htmlFor="locations">Select Locations:</label>
            <select id="locations" multiple value={selectedLocations} onChange={handleLocationChange}>
              {[
                "Ain Drahem", "Bizerte", "Djerba", "Douz", "Gabes", "Gafsa", "Hammamet", "Kairouan",
                "Kasserine", "Kelibia", "Kerkennah", "Korba", "Korbous", "Le Kef", "Mahdia", "Monastir",
                "Nabeul", "Nefta", "Sbeitla", "Sfax", "Sidi Bouzid", "Sousse", "Tabarka", "Tozeur", "Tunis",
                "Zaghouan", "Zarzis"
              ].map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="hotel-list">
        <div className="heading" style={{ background: "url(images/header-bg-3.png) no-repeat" }}>
          <h1>Hotels</h1>
        </div>

        <section className="main-content">
          <h2>Hotels</h2>
          <div className="hotels-container">
            {hotels.map((hotel) => (
              <div className="hotel-card" key={hotel.id}>
                <img src={hotel.imageUrl} alt={hotel.name} />
                <div className="hotel-details">
                  <h3 style={{ color: "goldenrod", fontSize: "2rem" }}>{hotel.name}</h3>
                  <p><i className="fas fa-map-marker-alt"></i> {hotel.location}</p>
                  <div className="star-rating">
                    {[...Array(parseInt(hotel.starRating))].map((_, index) => (
                      <span key={index} className="star">&#9733;</span>
                    ))}
                  </div>
                  <p>{hotel.description}</p>
                  <p>Price (Demi-Pension): {hotel.priceDemiPension}</p>
                  <button className="tarif-btn" onClick={() => showModal(hotel)}>Tarifs</button>
                </div>
              </div>
            ))}
          </div>
          {error && <p>{error}</p>}
        </section>

        {modalVisible && selectedHotel && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
              <h2>Prices for {selectedHotel.name}</h2>
              <div>
                <label htmlFor="price">Select Price:</label>
                <select id="price" onChange={(e) => setSelectedPrice(e.target.value)}>
                  <option value="">Select</option>
                  <option value={selectedHotel.priceDemiPension}>Demi-Pension: {selectedHotel.priceDemiPension}</option>
                  <option value={selectedHotel.priceLogement}>Logement: {selectedHotel.priceLogement}</option>
                  <option value={selectedHotel.pricePensionComplete}>Pension Complète: {selectedHotel.pricePensionComplete}</option>
                </select>
              </div>
              <div>
                <label htmlFor="startDate">Start Date:</label>
                <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <label htmlFor="endDate">End Date:</label>
                <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div>
                <label htmlFor="numOfGuests">Number of Guests:</label>
                <input type="number" id="numOfGuests" value={numOfGuests} min="1" onChange={(e) => setNumOfGuests(e.target.value)} />
              </div>
              <div>
                <label htmlFor="totalPrice">Total Price:</label>
                <input type="text" id="totalPrice" value={totalPrice} readOnly />
              </div>
              <div>
                <label htmlFor="userName">Name:</label>
                <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button className="reserver-btn" onClick={handleReserve}>Reserver</button>
            </div>
          </div>
        )}

        {showAuthModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowAuthModal(false)}>&times;</span>
              <Conn onConnect={handleLoginSuccess} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hotel;
