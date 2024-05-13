import React, { useState, useEffect } from 'react';
import { firestore, storage } from './firebase';
import { addDoc, collection, updateDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { deleteUser } from 'firebase/auth';

function Dashboard() {
  const [error, setError] = useState(null);
  const [hotelImage, setHotelImage] = useState(null);
  const [hotelImageUrl, setHotelImageUrl] = useState('');
  const [hotelFormData, setHotelFormData] = useState({
    name: '',
    starRating: '',
    description: '',
    location: '',
    priceLogement: '',
    priceDemiPension: '',
    pricePensionComplete: ''
  });
  const [hotelFormVisible, setHotelFormVisible] = useState(false); 

  const [carImage, setCarImage] = useState(null);
  const [carImageUrl, setCarImageUrl] = useState('');
  const [carFormData, setCarFormData] = useState({
    nom: '',
    carburant: '', 
    prix_jour: '',
    prix_mois: '',
    description: '',
    categorie: '', 
    disponibility: {} 
  });
  const [carFormVisible, setCarFormVisible] = useState(false); 

  const [selectedDate, setSelectedDate] = useState(''); 
  const [carDisponibility, setCarDisponibility] = useState(''); 

  useEffect(() => {
    if (selectedDate && carFormData.disponibility[selectedDate]) {
      setCarDisponibility(carFormData.disponibility[selectedDate]);
    } else {
      setCarDisponibility('');
    }
  }, [selectedDate, carFormData]);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setSelectedDate(getCurrentDate()); 
  }, []);

  const handleHotelChange = (e) => {
    setHotelFormData({ ...hotelFormData, [e.target.name]: e.target.value });
  };

  const handleHotelImageChange = (e) => {
    setHotelImage(e.target.files[0]);
  };

  const handleHotelImageUpload = async () => {
    try {
      const storageRef = ref(storage, `images/${hotelImage.name}`);
      await uploadBytes(storageRef, hotelImage);
      const url = await getDownloadURL(storageRef);
      setHotelImageUrl(url); 
    } catch (error) {
      console.error('Error uploading image: ', error);
      setError('Error uploading image. Please try again with a different image.');
    }
  };
  
  const handleHotelSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await handleHotelImageUpload();
      const newData = { ...hotelFormData, imageUrl: hotelImageUrl };
      await addDoc(collection(firestore, 'hotels'), newData);
      console.log('Hotel data added to Firestore successfully!');
    } catch (error) {
      console.error('Error adding hotel data to Firestore: ', error);
      setError('Error adding hotel data. Please try again later.');
    }
  };

  const handleCarChange = (e) => {
    setCarFormData({ ...carFormData, [e.target.name]: e.target.value });
  };

  const handleCarImageChange = (e) => {
    setCarImage(e.target.files[0]);
  };

  const handleCarImageUpload = async () => {
    try {
      const storageRef = ref(storage, `images/${carImage.name}`);
      await uploadBytes(storageRef, carImage);
      const url = await getDownloadURL(storageRef);
      setCarImageUrl(url); 
    } catch (error) {
      console.error('Error uploading image: ', error);
      setError('Error uploading image. Please try again with a different image.');
    }
  };
  
  const handleCarSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await handleCarImageUpload();
      const newData = { ...carFormData, imageUrl: carImageUrl, disponibility: { [getCurrentDate()]: 'disponible' } };
      await addDoc(collection(firestore, 'voitures'), newData);
      console.log('Car data added to Firestore successfully!');
      setCarFormData({
        nom: '',
        carburant: '',
        prix_jour: '',
        prix_mois: '',
        description: '',
        categorie: '',
        disponibility: { [getCurrentDate()]: 'disponible' } 
      });
      setCarFormVisible(false); 
    } catch (error) {
      console.error('Error adding car data to Firestore: ', error);
      setError('Error adding car data. Please try again later.');
    }
  };

  const handleDisponibilityChange = async () => {
    try {
      const carDocRef = doc(firestore, 'voitures', 'CAR_ID'); 
      await updateDoc(carDocRef, {
        [`disponibility.${selectedDate}`]: carDisponibility
      });
      console.log('Car disponibility updated successfully!');
    } catch (error) {
      console.error('Error updating car disponibility: ', error);
      setError('Error updating car disponibility. Please try again later.');
    }
  };

  const handleAddUser = async () => {
    // Implement logic to add new user
  };

  const handleRoleChange = async (userId, newRole) => {
    // Implement logic to update user role
  };

  const handleDeleteUser = async (userId) => {
    // Implement logic to delete user
  };

  const [users, setUsers] = useState([]);
  const [userManagementVisible, setUserManagementVisible] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const [collectionsData, setCollectionsData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users: ', error);
        setError('Error fetching users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);
  const fetchCollectionsData = async () => {
    try {
      const collectionNames = ['Comite_Entreprise', 'Groupe', 'hotels', 'omra', 'users', 'voitures'];
      const dataPromises = collectionNames.map(async (collectionName) => {
        const collectionRef = collection(firestore, collectionName);
        const querySnapshot = await getDocs(collectionRef);
        const collectionData = querySnapshot.docs.map((doc) => doc.data());
        console.log(collectionData); // Log the data for debugging
        return { collectionName, data: collectionData };
      });
      const collectionsData = await Promise.all(dataPromises);
      setCollectionsData(collectionsData);
    } catch (error) {
      console.error('Error fetching collections data: ', error);
      setError('Error fetching collections data. Please try again later.');
    }
  };
  

  const toggleCollections = () => {
    setShowCollections(!showCollections);
    if (!showCollections) {
      fetchCollectionsData();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">Dashboard</div>
        <nav className="sidebar-nav">
          <button onClick={() => {setHotelFormVisible(true); setCarFormVisible(false); setUserManagementVisible(false);}}>Show Hotel Form</button>
          <button onClick={() => {setHotelFormVisible(false); setCarFormVisible(true); setUserManagementVisible(false);}}>Show Car Form</button>
          <button onClick={() => {setHotelFormVisible(false); setCarFormVisible(false); setUserManagementVisible(true);}}>Gérer Utilisateurs</button>
          <button onClick={toggleCollections}>Show Collections</button>
        </nav>
      </div>

      <div className="main-content">
        {showCollections && (
          <section className="collections">
            {collectionsData.map((collectionItem) => (
              <div key={collectionItem.collectionName}>
                <h2>{collectionItem.collectionName}</h2>
                <table>
                  <thead>
                    <tr>
                      {Object.keys(collectionItem.data[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {collectionItem.data.map((doc) => (
                      <tr key={doc.id}>
                        {Object.values(doc).map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </section>
        )}

        {hotelFormVisible && (
          <section className="form">
            <form onSubmit={handleHotelSubmit}>
              <h2>Add Hotel</h2>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={hotelFormData.name} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label>Star Rating:</label>
                <input type="text" name="starRating" value={hotelFormData.starRating} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea name="description" value={hotelFormData.description} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label>Location:</label>
                <input type="text" name="location" value={hotelFormData.location} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label>Price Logement:</label>
                <input type="text" name="priceLogement" value={hotelFormData.priceLogement} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label>Price Demi-Pension:</label>
                <input type="text" name="priceDemiPension" value={hotelFormData.priceDemiPension} onChange={handleHotelChange} required />
              </div>
              <div className="form-group">
                <label>Price Pension Complète:</label>
                <input type="text" name="pricePensionComplete" value={hotelFormData.pricePensionComplete} onChange={handleHotelChange} required />
              </div>
              <input type="file" onChange={handleHotelImageChange} />
              <button type="submit">Submit</button>
            </form>
            {error && <p>{error}</p>}
          </section>
        )}

        {carFormVisible && (
          <section className="form">
            <form onSubmit={handleCarSubmit}>
              <h2>Add Car</h2>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="nom" value={carFormData.nom} onChange={handleCarChange} required />
              </div>
              <div className="form-group">
                <label>Carburant:</label>
                <select name="carburant" value={carFormData.carburant} onChange={handleCarChange} required>
                  <option value="">Select Carburant</option>
                  <option value="diesel">Diesel</option>
                  <option value="essence">Essence</option>
                </select>
              </div>
              <div className="form-group">
                <label>Prix par Jour:</label>
                <input type="text" name="prix_jour" value={carFormData.prix_jour} onChange={handleCarChange} required />
              </div>
              <div className="form-group">
                <label>Prix par Mois:</label>
                <input type="text" name="prix_mois" value={carFormData.prix_mois} onChange={handleCarChange} required />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea name="description" value={carFormData.description} onChange={handleCarChange} required />
              </div>
              <div className="form-group">
                <label>Catégorie:</label>
                <input type="text" name="categorie" value={carFormData.categorie} onChange={handleCarChange} required />
              </div>
              <input type="file" onChange={handleCarImageChange} />
              <button type="submit">Submit</button>
            </form>
            {error && <p>{error}</p>}
          </section>
        )}

        {userManagementVisible && (
          <section className="form">
            <h2>Gérer Utilisateurs</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td contentEditable={true} onBlur={(e) => handleRoleChange(user.id, e.target.innerText)}>{user.role}</td>
                    <td>
                      <button onClick={() => handleRoleChange(user.id, 'newRole')}>Changer de rôle</button>
                      <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleAddUser}>Ajouter Utilisateur</button>
            {error && <p>{error}</p>}
          </section>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
