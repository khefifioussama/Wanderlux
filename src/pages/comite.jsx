import React, { useState } from 'react';
import { firestore } from './firebase'; // Import the initialized firestore from firebase.js
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import { Link, useLocation } from 'react-router-dom';
function Comite() {
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Extract form data
    const formData = {
      comiteName: event.target.comiteName.value,
      numberOfMembers: event.target.numberOfMembers.value,
      civility: event.target.civility.value,
      contactName: event.target.contactName.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      address: event.target.address.value,
    };

    try {
      // Add form data to the "Comite_Entreprise" collection
      await addDoc(collection(firestore, 'Comite_Entreprise'), formData);
      
      console.log("Form data added to Firestore successfully!");
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error("Error adding form data to Firestore: ", error);
      // Optionally, you can show an error message to the user here
      setError(error.message);
    }
  };

  return (
    <div>
    <br></br>
    <br></br>
      <div className="heading" style={{background: "url(images/header-bg-3.png) no-repeat"}}>
        <h1>Inscription Comité</h1>
      </div>

      {/* Booking section */}
      <section className="booking">
        <h1 className="heading-title">Votre Comité D’Entreprise N’est Pas Encore Partenaire ?</h1>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="flex">
            <div className="inputBox">
              <span>Nom du comité ou de l’Amicale *</span>
              <input type="text" placeholder="Entrer le nom du comité ou de l’Amicale" name="comiteName" required />
            </div>
            <div className="inputBox">
              <span>Nombre d’adhérent *</span>
              <input type="number" placeholder="Entrer le nombre d’adhérent" name="numberOfMembers" required />
            </div>
            <div className="inputBox">
              <span>Civilité *</span>
              <select name="civility" required>
                <option value="Mr">Mr</option>
                <option value="Mme">Mme</option>
              </select>
            </div>
            <div className="inputBox">
              <span>Nom du Contact *</span>
              <input type="text" placeholder="Entrer le nom du contact" name="contactName" required />
            </div>
            <div className="inputBox">
              <span>Téléphone *</span>
              <input type="tel" placeholder="Entrer votre téléphone" name="phone" required />
            </div>
            <div className="inputBox">
              <span>Email *</span>
              <input type="email" placeholder="Entrer votre email" name="email" required />
            </div>
            <div className="inputBox">
              <span>Adresse *</span>
              <input type="text" placeholder="Entrer votre adresse" name="address" required />
            </div>
          </div>

          <button type="submit" className="btn" name="send">Envoyer</button>
          {error && <p>{error}</p>}
        </form>
      </section>
 
    </div>
  );
}

export default Comite;
