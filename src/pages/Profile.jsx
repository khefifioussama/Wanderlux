import React, { useState, useRef } from "react";
import "./Profile.css"; // Import your CSS file for styling

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prize, setPrize] = useState("");
  const [spinning, setSpinning] = useState(false);
  const wheelCanvasRef = useRef(null);
  const modalRef = useRef(null);

  const segments = [
    "Voyage Gratuit",
    "10% Off",
    "500 Points",
    "750 Points",
    "1000 Points",
    "1250 Points",
    "1500 Points"
  ];

  const spinWheel = () => {
    if (!spinning) {
      setSpinning(true);
      const startingAngle = Math.random() * 360;
      const spinAngle = 360 * 10 + Math.floor(Math.random() * 360); // Increased spin duration
      animateWheel(startingAngle, spinAngle);
    }
  };

  const animateWheel = (startingAngle, spinAngle) => {
    let currentAngle = startingAngle;
    const wheelCanvas = wheelCanvasRef.current;
    const ctx = wheelCanvas.getContext("2d");
    const spinSpeed = 10;

    const spinAnimation = () => {
      ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
      drawWheel(currentAngle);
      currentAngle += spinSpeed;

      if (currentAngle >= spinAngle) {
        clearInterval(animationInterval);
        const winnerIndex = getWinnerIndex(currentAngle);
        setPrize(segments[winnerIndex]);
        setSpinning(false);
        showModal();
      }
    };

    const animationInterval = setInterval(spinAnimation, 20);
  };

  const getWinnerIndex = (currentAngle) => {
    const sliceAngle = 360 / segments.length;
    const adjustedAngle = (currentAngle + 360) % 360;
    const winnerIndex = Math.floor(adjustedAngle / sliceAngle);
    return winnerIndex;
  };

  const drawWheel = (currentAngle) => {
    const wheelCanvas = wheelCanvasRef.current;
    const ctx = wheelCanvas.getContext("2d");
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    segments.forEach((segment, index) => {
      const startAngle = (index * 2 * Math.PI) / segments.length;
      const endAngle = ((index + 1) * 2 * Math.PI) / segments.length;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = getSegmentColor(index); // Get color for each segment
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((startAngle + endAngle) / 2);
      ctx.fillStyle = "#fff"; // Text color
      ctx.textAlign = "center";
      ctx.fillText(segment, radius / 2, 0);
      ctx.restore();
    });
  };

  const getSegmentColor = (index) => {
    // Define color for each segment
    const colors = ["#333", "#444", "#555", "#666", "#777", "#888", "#999"];
    return colors[index % colors.length];
  };

  const showModal = () => {
    const modal = modalRef.current;
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.display = "none";
      setPrize("");
    }, 3000);
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <form className="profile-form">
        {/* Form inputs */}
      </form>
      <div className="password-reset">
        {/* Password Reset section */}
      </div>
      <div className="spin-to-win">
        <h2>Spin to Win</h2>
        <canvas
          ref={wheelCanvasRef}
          width="400"
          height="400"
          className={`wheel ${spinning ? "spinning" : ""}`}
        ></canvas>
        <button className="spin-button" onClick={spinWheel} disabled={spinning}>
          Spin
        </button>
      </div>
      <div ref={modalRef} className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => modalRef.current.style.display = "none"}>&times;</span>
          <p>Congratulations! You won: {prize}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
