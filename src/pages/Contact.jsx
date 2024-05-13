import React, { useState } from 'react';
import Location from "../components/Location/Location";
import { firestore } from './firebase'; // Import the initialized firestore from firebase.js
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'Contact'), formData);
      console.log("Form data added to Firestore successfully!");
      // Show the modal on successful form submission
      setModalVisible(true);
      // Optionally, you can clear the form fields here
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error adding form data to Firestore: ", error);
      // Optionally, you can show an error message to the user here
    }
    console.log("Modal visible:", modalVisible); // Add this line for debugging
  };
  

  return (
    <>
      <div className="container pt-14">
        <div className="py-10">
          <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">Contact</h1>
          <p>
            Pour nous contacter, veuillez utiliser le formulaire ci-dessous. Remplissez les champs avec vos coordonnées et votre message, puis cliquez sur le bouton "Envoyer". Notre équipe se fera un plaisir de vous répondre dans les plus brefs délais.
          </p>
          <br />
        </div>
      </div>
      
      {/* Contact Form */}
      <section className="contact">
        <form onSubmit={handleSubmit} className="book-form">
          <div className="inputBox">
            <span>Nom :</span>
            <input type="text" placeholder="Entrer Votre Nom" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="inputBox">
            <span>Email :</span>
            <input type="email" placeholder="Entrer Votre email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="inputBox">
            <span>Message :</span>
            <textarea placeholder="Votre message" name="message" value={formData.message} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="btn" name="send">Envoyer</button>
        </form>
      </section>

      {/* Modal */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <p>Message envoyé avec succès!</p>
          </div>
        </div>
      )}

      <Location />
    </>
  );
};

export default Contact;
