import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';


const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+971', country: 'UAE' },
  { code: '+65', country: 'Singapore' },
];

const countries = [
  'India', 'United States', 'United Kingdom', 'Australia', 'Canada',
  'Germany', 'France', 'Japan', 'China', 'Singapore', 'UAE', 'Other'
];

const initialFormData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  countryCode: '+91',
  phone: '',
  country: '',
  city: '',
  pan: '',
  aadhaar: '',
};

const initialErrors = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  phone: '',
  country: '',
  city: '',
  pan: '',
  aadhaar: '',
};

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});


  const validate = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        if (!/^[A-Za-z\s]+$/.test(value)) return 'Only letters allowed';
        if (value.trim().length < 2) return 'Minimum 2 characters required';
        return '';

      case 'username':
        if (!value.trim()) return 'Username is required';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Only letters, numbers and underscore allowed';
        if (value.length < 3) return 'Minimum 3 characters required';
        return '';

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Minimum 8 characters required';
        if (!/[A-Z]/.test(value)) return 'Must contain at least one uppercase letter';
        if (!/[0-9]/.test(value)) return 'Must contain at least one number';
        if (!/[!@#$%^&*]/.test(value)) return 'Must contain at least one special character (!@#$%^&*)';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\d{10}$/.test(value)) return 'Enter valid 10-digit phone number';
        return '';

      case 'country':
        if (!value) return 'Country is required';
        return '';

      case 'city':
        if (!value.trim()) return 'City is required';
        if (!/^[A-Za-z\s]+$/.test(value)) return 'Only letters allowed';
        return '';

      case 'pan':
        if (!value.trim()) return 'PAN number is required';
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) return 'Invalid PAN format (e.g. ABCDE1234F)';
        return '';

      case 'aadhaar':
        if (!value.trim()) return 'Aadhaar number is required';
        if (!/^\d{12}$/.test(value.replace(/\s/g, ''))) return 'Aadhaar must be 12 digits';
        return '';

      default:
        return '';
    }
  };

  const isFormValid = () => {
    const fields = Object.keys(initialErrors);
    return fields.every(field => {
      const error = validate(field, formData[field]);
      return error === '';
    });
  };

  // Handlers 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const allErrors = {};
    const allTouched = {};
    Object.keys(initialErrors).forEach(field => {allErrors[field] = validate(field, formData[field]);
      allTouched[field] = true;
    });
    setErrors(allErrors);
    setTouched(allTouched);

    if (Object.values(allErrors).every(err => err === '')) {
      navigate('/details', { state: { formData } });
    }
  };

  
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h1>Create Account</h1>
          <p>Fill in the details below to register</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* Row: First Name + Last Name */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name <span className="required">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter first name"
                className={errors.firstName && touched.firstName ? 'error' : ''}
              />
              {errors.firstName && touched.firstName && (
                <span className="error-msg">⚠ {errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name <span className="required">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter last name"
                className={errors.lastName && touched.lastName ? 'error' : ''}
              />
              {errors.lastName && touched.lastName && (
                <span className="error-msg">⚠ {errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username <span className="required">*</span></label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Choose a username"
              className={errors.username && touched.username ? 'error' : ''}
            />
            {errors.username && touched.username && (
              <span className="error-msg">⚠ {errors.username}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              className={errors.email && touched.email ? 'error' : ''}
            />
            {errors.email && touched.email && (
              <span className="error-msg">⚠ {errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password <span className="required">*</span></label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Create a strong password"
                className={errors.password && touched.password ? 'error' : ''}
              />
              <button type="button"
                className="toggle-password"
                onClick={() => setShowPassword(prev => !prev)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && touched.password && (
              <span className="error-msg">⚠ {errors.password}</span>
            )}
            <div className="password-hint">
              Min 8 chars, 1 uppercase, 1 number, 1 special character
            </div>
          </div>

          {/* Phone with Country Code */}
          <div className="form-group">
            <label>Phone Number <span className="required">*</span></label>
            <div className="phone-wrapper">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="country-code-select"
              >
                {countryCodes.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.country})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="10-digit number"
                className={errors.phone && touched.phone ? 'error' : ''}
                maxLength={10}
              />
            </div>
            {errors.phone && touched.phone && (
              <span className="error-msg">⚠ {errors.phone}</span>
            )}
          </div>

          {/* Country + City */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country <span className="required">*</span></label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.country && touched.country ? 'error' : ''}
              >
                <option value="">Select country</option>
                {countries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.country && touched.country && (
                <span className="error-msg">⚠ {errors.country}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="city">City <span className="required">*</span></label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your city"
                className={errors.city && touched.city ? 'error' : ''}
              />
              {errors.city && touched.city && (
                <span className="error-msg">⚠ {errors.city}</span>
              )}
            </div>
          </div>

          {/* PAN Number */}
          <div className="form-group">
            <label htmlFor="pan">PAN Number <span className="required">*</span></label>
            <input
              type="text"
              id="pan"
              name="pan"
              value={formData.pan}
              onChange={(e) => handleChange({ target: { name: 'pan', value: e.target.value.toUpperCase() } })}
              onBlur={handleBlur}
              placeholder="e.g. ABCDE1234F"
              maxLength={10}
              className={errors.pan && touched.pan ? 'error' : ''}
            />
            {errors.pan && touched.pan && (
              <span className="error-msg">⚠ {errors.pan}</span>
            )}
          </div>

          {/* Aadhaar Number */}
          <div className="form-group">
            <label htmlFor="aadhaar">Aadhaar Number <span className="required">*</span></label>
            <input
              type="text"
              id="aadhaar"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="12-digit Aadhaar number"
              maxLength={12}
              className={errors.aadhaar && touched.aadhaar ? 'error' : ''}
            />
            {errors.aadhaar && touched.aadhaar && (
              <span className="error-msg">⚠ {errors.aadhaar}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-btn ${isFormValid() ? 'active' : 'disabled'}`}
            disabled={!isFormValid()}
          >
            Submit Registration
          </button>

        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
