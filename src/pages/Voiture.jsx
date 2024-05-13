import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { FaGasPump, FaCar } from 'react-icons/fa';
import Conn from './Conn'; // Import the Conn component for authentication

function Voiture() {
  const [error, setError] = useState(null);
  const [cars, setCars] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numOfDays, setNumOfDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user authentication
  const [showAuthModal, setShowAuthModal] = useState(false); // State to show authentication modal

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'voitures'));
        const fetchedCars = [];
        querySnapshot.forEach((doc) => {
          fetchedCars.push({ id: doc.id, ...doc.data() });
        });
        setCars(fetchedCars);
      } catch (error) {
        console.error('Error fetching cars: ', error);
        setError('Error fetching cars. Please try again later.');
      }
    };

    fetchCars();

    // Check if user is already logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const showModal = (car) => {
    if (!isLoggedIn) {
      // Show authentication modal if user is not logged in
      setSelectedCar(car);
      setShowAuthModal(true);
    } else {
      // Show reservation modal if user is logged in
      setSelectedCar(car);
      setModalVisible(true);
    }
  };
  
  const calculateTotalPrice = () => {
    if (selectedPrice && selectedCar) {
      if (selectedPrice === 'prix_jour' && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const pricePerDay = parseFloat(selectedCar.prix_jour);
        const totalPrice = pricePerDay * diffDays;
        setTotalPrice(totalPrice);
        setNumOfDays(diffDays);
      } else if (selectedPrice === 'prix_mois') {
        const start = new Date();
        const end = new Date(start);
        end.setMonth(end.getMonth() + 1); // Add one month
        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);
        const pricePerMonth = parseFloat(selectedCar.prix_mois);
        setTotalPrice(pricePerMonth);
        setNumOfDays(null);
      }
    }
  };
  
  useEffect(() => {
    calculateTotalPrice();
  }, [selectedPrice, startDate, endDate, selectedCar]);

  const handleReserve = async () => {
    if (!selectedCar || !selectedPrice || !userName || !phoneNumber || !email || !startDate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const reservationData = {
        carName: selectedCar.nom,
        carCategory: selectedCar.categorie,
        selectedPrice: selectedPrice,
        startDate,
        endDate,
        numOfDays,
        totalPrice,
        userName,
        phoneNumber,
        email,
      };

      await addDoc(collection(firestore, 'Reservation-voiture'), reservationData);
      alert('Reservation successful!');
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding reservation: ', error);
      alert('Error adding reservation. Please try again later.');
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    // Proceed with reservation after successful login
    handleReserve();
  };

  return (
    <div>
      <div className="heading" style={{ background: "url(images/header-bg-3.png) no-repeat" }}>
        <h1>Nos Voitures</h1>
      </div>

      <section className="main-content">
        <h2>Voitures</h2>
        <div className="cars-container">
          {cars.map((car) => (
            <div className="car" key={car.id} onClick={() => showModal(car)}>
              <img src={car.imageUrl} alt={car.nom} />
              <div className="car-details">
                <h3>{car.nom}</h3>
                <p><FaCar /> <strong>Catégorie:</strong> {car.categorie}</p>
                <p><FaGasPump /> <strong>Carburant:</strong> {car.carburant}</p>
                <p><strong>Prix par jour:</strong> {car.prix_jour}</p>
                <p><strong>Prix par mois:</strong> {car.prix_mois}</p>
              </div>
            </div>
          ))}
        </div>
        {error && <p>{error}</p>}
      </section>

      {modalVisible && selectedCar && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <h2>Réserver {selectedCar.nom}</h2>
            <div>
              <label htmlFor="price">Choisir Prix:</label>
              <select id="price" onChange={(e) => setSelectedPrice(e.target.value)}>
                <option value="">Sélectionner</option>
                <option value="prix_jour">Prix par jour</option>
                <option value="prix_mois">Prix par mois</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate">Date de début:</label>
              <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="endDate">Date de fin:</label>
              <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="totalPrice">Prix total:</label>
              <input type="text" id="totalPrice" value={totalPrice} readOnly />
            </div>
            <div>
              <label htmlFor="userName">Nom:</label>
              <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="phoneNumber">Numéro de téléphone:</label>
              <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button className="reserve-btn" onClick={handleReserve}>Réserver</button>
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
  );
}

export default Voiture;
