import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./InfluencerSignIn.css";

const InfluencerSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gmail: "",
    password: "",
    category: "",
    instaId: "",
    contactNo: "",
    pincode: "",
    youtubeChannel: ""
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState({
    type: "", // "success", "error", "info"
    message: ""
  });
  const [allowPermission, setAllowPermission] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check URL for Instagram code and form data
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    
    // Try to load form data from sessionStorage
    try {
      const savedFormData = sessionStorage.getItem('influencerFormData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        console.log("Loaded form data from sessionStorage:", parsedData);
        setFormData(parsedData);
      }
    } catch (error) {
      console.error("Error loading form data:", error);
      setStatusMessage({
        type: "error",
        message: "Failed to restore your form data. Please fill out the form again."
      });
    }

    // Process Instagram code if present
    if (code) {
      console.log("Instagram Code from URL:", code);
      setIsLoading(true);
      setStatusMessage({
        type: "info",
        message: "Verifying Instagram connection..."
      });
      
      axios.get(`https://micromatch-backend.onrender.com/api/influencers/verify-instagram?code=${code}`)
        .then(res => {
          console.log("Instagram Verification Response:", res);
          if (res.data.success) {
            setAllowPermission(true);
            setAccessToken(res.data.access_token);
            setInstagramId(res.data.insta_scoped_id);
            setStatusMessage({
              type: "success",
              message: "Instagram connected successfully! You can now complete signup."
            });
          } else {
            setStatusMessage({
              type: "error",
              message: "Instagram verification failed. Please try connecting again."
            });
          }
        })
        .catch(err => {
          console.error("Error verifying Instagram:", err);
          setStatusMessage({
            type: "error",
            message: `Instagram connection error: ${err.response?.data?.message || "Please try again."}`
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  // Save form data whenever it changes
  useEffect(() => {
    try {
      // Skip saving if it's an empty object (initial state)
      if (Object.values(formData).some(value => value !== "")) {
        sessionStorage.setItem('influencerFormData', JSON.stringify(formData));
        console.log("Form data saved to sessionStorage:", formData);
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      setStatusMessage({
        type: "error",
        message: "Failed to save form data. Please check your browser storage settings."
      });
    }
  }, [formData]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.gmail.trim()) tempErrors.gmail = "Email is required";
    if (!formData.password.trim()) tempErrors.password = "Password is required";
    if (!formData.category.trim()) tempErrors.category = "Category is required";
    if (!formData.instaId.trim()) tempErrors.instaId = "Instagram username is required";
    if (!formData.contactNo.trim()) tempErrors.contactNo = "Contact number is required";
    if (!formData.pincode.trim()) tempErrors.pincode = "Pincode is required";
    if (!allowPermission) tempErrors.permission = "Please connect Instagram first.";

    setErrors(tempErrors);
    console.log("Validation Errors:", tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      const errorList = Object.values(tempErrors).join(', ');
      setStatusMessage({
        type: "error",
        message: `Please fix the following errors: ${errorList}`
      });
    }

    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleInstagramAuth = () => {
    try {
      // Save form data to sessionStorage before redirecting
      sessionStorage.setItem('influencerFormData', JSON.stringify(formData));
      console.log("Form data saved before Instagram redirect:", formData);
      
      setStatusMessage({
        type: "info",
        message: "Redirecting to Instagram for authentication..."
      });
      
      // Redirect to Instagram auth
      console.log("Redirecting to Instagram for authentication...");
      window.location.href = `https://api.instagram.com/oauth/authorize?client_id=847228190287555&redirect_uri=https://micromatch-frontend.onrender.com/influencer-signin&scope=user_profile,user_media&response_type=code`;
    } catch (error) {
      console.error("Error before Instagram redirect:", error);
      setStatusMessage({
        type: "error",
        message: "Error preparing for Instagram authentication. Please try again."
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted, Current State:", {
      formData,
      allowPermission,
      accessToken: accessToken ? "Present" : "Missing", 
      instagramId: instagramId ? "Present" : "Missing"
    });

    if (validate()) {
      setIsLoading(true);
      setStatusMessage({
        type: "info",
        message: "Creating your account... Please wait."
      });

      try {
        // Prepare request body with all required fields
        const requestBody = {
          name: formData.name,
          gmail: formData.gmail,
          contactNo: formData.contactNo,
          instaId: formData.instaId,
          youtubeChannel: formData.youtubeChannel || "",
          pincode: formData.pincode,
          category: formData.category,
          password: formData.password,
          access_token: accessToken,
          insta_scoped_id: instagramId
        };
        
        console.log("Sending registration request:", requestBody);
        
        const res = await axios.post("https://micromatch-backend.onrender.com/api/influencers/register", requestBody);
        console.log("Sign-Up Response:", res);

        if (res.data.success) {
          // Clear session storage
          sessionStorage.removeItem('influencerFormData');
          setStatusMessage({
            type: "success",
            message: "Signup successful! Redirecting to login page..."
          });
          
          // Delay navigation so user can see success message
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setStatusMessage({
            type: "error",
            message: `Signup failed: ${res.data.message || "Please try again."}`
          });
        }
      } catch (err) {
        console.error("Signup error:", err);
        const errorMsg = err.response?.data?.message || "Please try again later.";
        setStatusMessage({
          type: "error",
          message: `Signup error: ${errorMsg}`
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Add CSS styles directly for status messages
  const getStatusStyle = () => {
    switch(statusMessage.type) {
      case 'success': 
        return { backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginBottom: '15px' };
      case 'error': 
        return { backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '15px' };
      case 'info': 
        return { backgroundColor: '#cce5ff', color: '#004085', padding: '10px', borderRadius: '5px', marginBottom: '15px' };
      default: 
        return { display: 'none' };
    }
  };

  return (
    <div className="influencer-signin-container">
      <h2>Influencer Sign Up</h2>
      
      {/* Status Message Banner */}
      {statusMessage.message && (
        <div className="status-message" style={getStatusStyle()}>
          {statusMessage.message}
        </div>
      )}
      
      {isLoading && <div className="loading" style={{
        backgroundColor: '#e9ecef',
        color: '#495057',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'center'
      }}>Processing... Please wait</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error" style={{color: 'red', fontSize: '0.8em'}}>{errors.name}</span>}

        <input
          type="email"
          name="gmail"
          placeholder="Email"
          value={formData.gmail}
          onChange={handleChange}
        />
        {errors.gmail && <span className="error" style={{color: 'red', fontSize: '0.8em'}}>{errors.gmail}</span>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error" style={{color: 'red', fontSize: '0.8em'}}>{errors.password}</span>}

        <input
          type="text"
          name="contactNo"
          placeholder="Contact Number"
          value={formData.contactNo}
          onChange={handleChange}
        />
        {errors.contactNo && <span className="error" style={{color: 'red', fontSize: '0.8em'}}>{errors.contactNo}</span>}

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
        {errors.pincode && <span className="error" style={{color: 'red', fontSize: '0.8em'}}>{errors.pincode}</span>}

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        {errors.category && <span className="error" style={{color: 'red', fontSize: '0.8em'}}>{errors.category}</span>}

        <input
          type="text"
          name="instaId"
          placeholder="Instagram Username"
          value={formData.instaId}
          onChange={handleChange}
        />
        {errors.instaId && <span className="error" style={{color: 'red', fontSize: '0.8em'}}>{errors.instaId}</span>}

        <input
          type="text"
          name="youtubeChannel"
          placeholder="YouTube Channel (Optional)"
          value={formData.youtubeChannel}
          onChange={handleChange}
        />

        <div className="instagram-status">
          <button
            type="button"
            className={`connect-button ${allowPermission ? "connected" : ""}`}
            onClick={handleInstagramAuth}
            disabled={isLoading}
            style={{
              backgroundColor: allowPermission ? '#28a745' : '#007bff',
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {allowPermission ? "Connected ✅" : "Connect with Instagram"}
          </button>
          {errors.permission && <span className="error" style={{color: 'red', fontSize: '0.8em', display: 'block', marginTop: '5px'}}>{errors.permission}</span>}
        </div>

        <button
          type="submit"
          className={`signup-button ${allowPermission ? "" : "disabled"}`}
          disabled={!allowPermission || isLoading}
          style={{
            backgroundColor: allowPermission ? '#28a745' : '#6c757d',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            marginTop: '15px',
            cursor: (!allowPermission || isLoading) ? 'not-allowed' : 'pointer',
            opacity: (!allowPermission || isLoading) ? 0.7 : 1
          }}
        >
          {isLoading ? "Processing..." : "Sign Up"}
        </button>
      </form>

      <p>Already have an account? <Link to="/influencer-login">Login</Link></p>
    </div>
  );
};

export default InfluencerSignIn;