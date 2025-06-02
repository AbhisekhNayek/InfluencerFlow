import React, { useState, useEffect } from "react";
import "./login.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  useEffect(() => {
    document.title = "Login - MicroMatch";
  }, []);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.token) {
        const decoded = jwtDecode(data.token);
        const role = decoded.role || null;

        // Set role-based redirect URL
        let url = "/general-dashboard";
        if (role === "admin") url = "/admin-dashboard";
        else if (role === "brand") url = "/business-dashboard";
        else if (role === "influencer") url = "/influencer-dashboard";

        // Save token
        localStorage.setItem("token", data.token);

        setRedirectUrl(url);
        setIsSubmitted(true);
      } else {
        setErrors({
          server: data.message || "Login failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ server: "Something went wrong. Please try again later." });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-inner animate-slide-in">
        <img src="logo.svg" alt="Logo" className="logo" />
        {isSubmitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2 className="card-title">Login Successful!</h2>
            <p className="card-text">Redirecting to your dashboard...</p>
            <button
              className="signup-button"
              onClick={() => (window.location.href = redirectUrl)}
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            <div className="signup-header">
              <h1>Welcome Back!</h1>
              <p>Please log in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form form">
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="signup-input"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="signup-input"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              {errors.server && (
                <span className="error-text">{errors.server}</span>
              )}

              <button type="submit" className="signup-button">
                Log In
              </button>
            </form>

            <div className="login-link">
              Don&apos;t have an account? <a href="/signup">Sign Up</a>
            </div>
          </>
        )}
      </div>

      <div className="signup-illustration">
        <div className="monitor-wrapper">
          <img src="monitor.svg" alt="monitor" className="monitor" />
          <img src="dash.svg" alt="dash" className="monitor-icons dash" />
          <img src="miota.svg" alt="iota" className="monitor-icons miota" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
