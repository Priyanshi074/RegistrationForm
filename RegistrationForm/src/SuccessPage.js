import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div style={{ textAlign: 'center', padding: '20px' }}>No data submitted</div>;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      backgroundColor: '#e0f7fa',
    }}>
      <h2 style={{ textAlign: 'center', color: '#00796B' }}>🎉 Submission Successful</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.entries(state).map(([key, val]) => (
          <li key={key} style={{ margin: '10px 0', borderBottom: '1px solid #ccc' }}>
            <strong>{key.toUpperCase()}:</strong> {val}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')} style={{
        padding: '10px 20px',
        marginTop: '20px',
        fontSize: '1rem',
        backgroundColor: '#00796B',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}>
        Back to Form
      </button>
    </div>
  );
}

export default SuccessPage;
