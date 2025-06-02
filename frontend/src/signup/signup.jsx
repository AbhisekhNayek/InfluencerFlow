import React, { useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const additionalStyles = `
  
`;

const SignupPage = () => {
  useEffect(() => {
    document.title = "Sign Up - MicroMatch";
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        //POST http://localhost:5000/api/auth/signup
        const response = await axios.post(`${apiBaseUrl}/api/auth/signup`, {
          name: formData.fullName,
          email: formData.email,
          password: formData.password
        });
  
        console.log('Signup successful:', response.data);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Signup failed:', error.response?.data?.message || error.message);
        setErrors({ server: error.response?.data?.message || 'Signup failed. Please try again later.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };
  
  return (
    <>
      <div className="signup-container white-bg">
        <div className="signup-inner">
          <img src="logo.svg" alt="Logo" className="logo" />
          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2 className="card-title">Sign Up Successful!</h2>
              <p className="card-text">Your account has been created successfully.</p>
              <button className="signup-button" onClick={() => window.location.href = '/login'}>
                Continue to Login
              </button>
            </div>
          ) : (
            <>
              <h1 className="form-title">Create Account</h1>
              <p className="subtitle">Join the revolution</p>
              <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>
  
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
  
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>
  
                <div className="input-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
  
                {errors.server && <div className="error-text">{errors.server}</div>}
  
                <button type="submit" className="signup-button">
                  Sign Up
                </button>
              </form>
              <div className="login-link">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
            </>
          )}
        </div>
  
        <div className="signup-illustration">
          <div className="monitor-wrapper">
            <img src="monitor.svg" alt="monitor" className="monitor" />
            <img src="dash.svg" alt="dash" className="monitor-icons dash" />
            <img src="miota.svg" alt="iota" className="monitor-icons iota" />
            <img src="eth.svg" alt="eth" className="monitor-icons eth" />
          </div>
        </div>
      </div>
    </>
  );
  
};

export default SignupPage;


//Dummy Signup code ---- comment code above and uncomment below for testing
// signup.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const SignupPage = () => {
//   const navigate = useNavigate();

//   const handleDummySignup = () => {
//     // Simulate successful signup and redirect
//     navigate('../general-dashboard');
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '100px' }}>
//       <h1>Dummy Signup Page</h1>
//       <p>Click the button below to simulate signup and go to General Dashboard</p>
//       <button 
//         onClick={handleDummySignup} 
//         style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
//       >
//         Sign Up
//       </button>
//       <div className="login-link">
//                 Go to general dashboard? <Link to="/general-dashboard">Log In</Link>
//              </div>
//     </div>
//   );
// };

// export default SignupPage;
