import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FormDetails.css';

function FormDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  // If someone navigates directly without form data
  if (!formData) {
    return (
      <div className="details-wrapper">
        <div className="details-container">
          <h2>No data found</h2>
          <p>Please fill the registration form first.</p>
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Go to Form
          </button>
        </div>
      </div>
    );
  }

  const fields = [
    { label: 'First Name', value: formData.firstName },
    { label: 'Last Name', value: formData.lastName },
    { label: 'Username', value: formData.username },
    { label: 'Email Address', value: formData.email },
    { label: 'Password', value: '•'.repeat(formData.password.length) },
    { label: 'Phone Number', value: `${formData.countryCode} ${formData.phone}` },
    { label: 'Country', value: formData.country },
    { label: 'City', value: formData.city },
    { label: 'PAN Number', value: formData.pan },
    { label: 'Aadhaar Number', value: formData.aadhaar },
  ];

  return (
    <div className="details-wrapper">
      <div className="details-container">
        <div className="details-header">
          <div className="success-icon">✓</div>
          <h1>Registration Successful!</h1>
          <p>Here are your submitted details</p>
        </div>

        <div className="details-grid">
          {fields.map((field, index) => (
            <div key={index} className="detail-item">
              <span className="detail-label">{field.label}</span>
              <span className="detail-value">{field.value}</span>
            </div>
          ))}
        </div>

        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Form
        </button>
      </div>
    </div>
  );
}

export default FormDetails;
