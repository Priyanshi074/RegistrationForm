import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const countries = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
};

function FormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (form.country) {
      setCities(countries[form.country]);
      setForm((f) => ({ ...f, city: '' }));
    }
  }, [form.country]);

  const validate = () => {
    const err = {};
    if (!form.firstName.trim()) err.firstName = 'First name is required';
    if (!form.lastName.trim()) err.lastName = 'Last name is required';
    if (!form.username.trim()) err.username = 'Username is required';
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) err.email = 'Invalid email';
    if (!form.password || form.password.length < 6) err.password = 'Password must be at least 6 characters';
    if (!form.phoneCode) err.phoneCode = 'Country code is required';
    if (!form.phoneNumber.match(/^\d{10}$/)) err.phoneNumber = 'Phone number must be 10 digits';
    if (!form.country) err.country = 'Country is required';
    if (!form.city) err.city = 'City is required';
    if (!form.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]$/)) err.pan = 'Invalid PAN number';
    if (!form.aadhar.match(/^\d{12}$/)) err.aadhar = 'Aadhar must be 12 digits';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      navigate('/success', { state: form });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '4px 0 10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  };

  const labelStyle = {
    fontWeight: '600',
    marginTop: '10px',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '0.85rem',
    marginBottom: '5px',
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {[
          ['First Name', 'firstName'],
          ['Last Name', 'lastName'],
          ['Username', 'username'],
          ['Email', 'email'],
        ].map(([label, name]) => (
          <div key={name}>
            <label style={labelStyle}>{label}</label>
            <input style={inputStyle} type="text" name={name} value={form[name]} onChange={handleChange} />
            {errors[name] && <div style={errorStyle}>{errors[name]}</div>}
          </div>
        ))}

        <label style={labelStyle}>Password</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            style={{ ...inputStyle, flex: 1 }}
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ ...buttonStyle, backgroundColor: '#555' }}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <div style={errorStyle}>{errors.password}</div>}

        <label style={labelStyle}>Phone</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="+91"
            name="phoneCode"
            value={form.phoneCode}
            onChange={handleChange}
            style={{ ...inputStyle, width: '25%' }}
          />
          <input
            type="text"
            placeholder="1234567890"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>
        {errors.phoneCode && <div style={errorStyle}>{errors.phoneCode}</div>}
        {errors.phoneNumber && <div style={errorStyle}>{errors.phoneNumber}</div>}

        <label style={labelStyle}>Country</label>
        <select style={inputStyle} name="country" value={form.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(countries).map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        {errors.country && <div style={errorStyle}>{errors.country}</div>}

        <label style={labelStyle}>City</label>
        <select style={inputStyle} name="city" value={form.city} onChange={handleChange}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
        {errors.city && <div style={errorStyle}>{errors.city}</div>}

        <label style={labelStyle}>PAN Number</label>
        <input style={inputStyle} type="text" name="pan" value={form.pan} onChange={handleChange} />
        {errors.pan && <div style={errorStyle}>{errors.pan}</div>}

        <label style={labelStyle}>Aadhar Number</label>
        <input style={inputStyle} type="text" name="aadhar" value={form.aadhar} onChange={handleChange} />
        {errors.aadhar && <div style={errorStyle}>{errors.aadhar}</div>}

        <button type="submit" style={Object.keys(validate()).length > 0 ? disabledButtonStyle : buttonStyle} disabled={Object.keys(validate()).length > 0}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormPage;
