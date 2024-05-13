import React, { useState } from 'react';
import { firestore } from './firebase'; // Import the initialized firestore from firebase.js
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import { Link, useLocation } from 'react-router-dom';
function Groupe() {
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Extract form data
    const formData = {
      groupType: event.target.groupType.value,
      numberOfParticipants: event.target.numberOfParticipants.value,
      hotelName: event.target.hotelName.value,
      arrivalDate: event.target.arrivalDate.value,
      numberOfNights: event.target.numberOfNights.value,
      formula: event.target.formula.value,
      budgetPerPerson: event.target.budgetPerPerson.value,
      specificRequest: event.target.specificRequest.value,
      civility: event.target.civility.value,
      contactName: event.target.contactName.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      address: event.target.address.value,
    };

    try {
      // Add form data to the "Groupe" collection
      await addDoc(collection(firestore, 'Groupe'), formData);
      
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
      <br>
      </br>
   

      {/* Booking section */}
      <br></br><br></br><br></br><br></br>
      <section className="booking">
        <h1 className="heading-title"> Des Réductions Sont Disponibles Pour Les Voyages De Groupe.</h1>
        <br></br>
        <form onSubmit={handleSubmit} className="book-form">
          <div className="flex">
            <div className="inputBox">
              <span>Type de groupe *</span>
              <select name="groupType" required>
                <option value="Groupe d'amis">Groupe d'amis</option>
                <option value="Comité d'entreprise">Comité d'entreprise</option>
              </select>
            </div>
            <div className="inputBox">
              <span>Nombre de participants *</span>
              <input type="number" placeholder="Nombre de participants" name="numberOfParticipants" required />
            </div>
            <div className="inputBox">
              <span>Nom de l'Hôtel ou catégorie *</span>
              <input type="text" placeholder="Nom de l'Hôtel ou catégorie" name="hotelName" required />
            </div>
            <div className="inputBox">
              <span>Arrivée *</span>
              <input type="date" name="arrivalDate" required />
            </div>
            <div className="inputBox">
              <span>Nombre de nuits *</span>
              <input type="number" placeholder="Nombre de nuits" name="numberOfNights" required />
            </div>
            <div className="inputBox">
              <span>Formule *</span>
              <select name="formula" required>
                <option value="Logement Petit Déjeuner">Logement Petit Déjeuner</option>
                <option value="Demi-pension">Demi-pension</option>
                <option value="Pension complète">Pension complète</option>
              </select>
            </div>
            <div className="inputBox">
              <span>Budget/personne *</span>
              <input type="text" placeholder="Budget/personne" name="budgetPerPerson" required />
            </div>
            <div className="inputBox">
              <span>Demande spécifique *</span>
              <textarea rows="4" cols="50" placeholder="Demande spécifique" name="specificRequest" required />
            </div>
            <div className="inputBox">
              <span>Civilité *</span>
              <select name="civility" required>
                <option value="Mr">Mr</option>
                <option value="Mme">Mme</option>
              </select>
            </div>
            <div className="inputBox">
              <span>Nom contact *</span>
              <input type="text" placeholder="Nom & prénom" name="contactName" required />
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

export default Groupe;
