import React, { useState } from 'react';

function StudentComponent({ name, email, year, photo }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="student-card">
      <img
        src={photo}
        alt={name}
        className="student-avatar"
      />

      <h3>{name}</h3>

      {showDetails && (
        <div>
          <p>Email: {email}</p>
          <p>Year: {year}</p>
        </div>
      )}

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
}

export default StudentComponent;
