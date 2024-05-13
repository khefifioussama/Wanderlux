import React, { useState, useEffect } from 'react';
import { app, googleProvider } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Navbar from '../components/Navbar/Navbar';

const auth = getAuth(app);
const db = getFirestore(app);

const Conn = ({ onConnect }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Change default to login page
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(collection(db, 'users'), user.uid), {
        name: name,
        email: email,
        role: role
      });
      setModalContent('Signup successful!');
      setShowModal(true);
      setUser(user);
      onConnect(); // Call onConnect when user successfully signs up
    } catch (error) {
      setModalContent(error.message);
      setShowModal(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userName = userDoc.data().name;
        setUser(user);
        onConnect(); // Call onConnect when user successfully logs in
      } else {
        console.error('User data not found.');
      }
    } catch (error) {
      setModalContent(error.message);
      setShowModal(true);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(collection(db, 'users'), user.uid), {
          name: user.displayName,
          email: user.email,
          role: 'user'
        });
      }
      const userData = userDoc.exists() ? userDoc.data() : null;
      setUser(user);
      onConnect(); // Call onConnect when user successfully signs in with Google
    } catch (error) {
      setModalContent(error.message);
      setShowModal(true);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setModalContent('Password reset email sent successfully!');
      setShowModal(true);
    } catch (error) {
      setModalContent(error.message);
      setShowModal(true);
    }
  };

  return (
    <div>
      <Navbar user={user} handleLogout={() => signOut(auth)} />
      <div className="auth-container">
        <h1>{isSignUp ? 'Créer Compte' : 'Connecter'}</h1>
        {isSignUp ? (
          <form onSubmit={handleSignup}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Créer Un Compte</button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Connecter</button>
            <button type="button" onClick={handleResetPassword}>Oublier Mot De Passe?</button>
          </form>
        )}

        <div className="auth-toggle">
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Deja Avez Vous Un Compte? Connecter' : 'N\'a Pas Un Compte? Créer Compte'}
          </button>
        </div>

        <div className="google-signin">
          <button onClick={handleGoogleSignIn}>
            <FontAwesomeIcon icon={faGoogle} />
          </button>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <p>{modalContent}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conn;
