import React, { useState, useRef } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCamera, FaCheck, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    profilePic: null,
    agreeTerms: false,
  });

  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files && files[0]) {
      setFileName(files[0].name);
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.agreeTerms) {
      toast.error("You must agree to the terms and conditions");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("mobile", formData.contactNumber);
    if (formData.profilePic) {
      data.append("profilePic", formData.profilePic);
    }

    try {
      const response = await axios.post(
        "http://localhost:8082/api/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          validateStatus: (status) => {
            return status < 500; // Reject only if status is greater than or equal to 500
          }
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      if (response.data.token && response.data.user) {
        toast.success("Registration successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const errorMessage = err.response?.data?.error || 
                         err.response?.data?.message || 
                         err.message ||
                         "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h1 className="signup-title">Create Your Account</h1>
            <p className="signup-subtitle">Join Crowd-Funding and start your campaign</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Full Name & Email */}
            <div className="form-row">
              <div className="form-group">
                <div className="input-icon"><FaUser /></div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  minLength="3"
                />
              </div>

              <div className="form-group">
                <div className="input-icon"><FaEnvelope /></div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="form-row">
              <div className="form-group">
                <div className="input-icon"><FaLock /></div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 characters)"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <div className="input-icon"><FaLock /></div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>
            </div>

            {/* Contact Number & Profile Picture */}
            <div className="form-row">
              <div className="form-group">
                <div className="input-icon"><FaPhone /></div>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  className="form-input"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit phone number"
                />
              </div>

              <div className="form-group file-upload-group">
                <input
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <div className="file-upload-wrapper" onClick={triggerFileInput}>
                  <FaCamera className="file-upload-icon" />
                  <span className="file-upload-text">Choose Profile Picture</span>
                </div>
                {fileName && (
                  <div className="file-name-display">
                    <span>{fileName}</span>
                    <FaCheck className="file-check-icon" />
                  </div>
                )}
              </div>
            </div>

            {/* Terms of Service Checkbox */}
            <div className="terms-group">
              <input
                type="checkbox"
                id="terms"
                name="agreeTerms"
                className="terms-checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms" className="terms-label">
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="signup-btn" 
              disabled={!formData.agreeTerms || isLoading}
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  <FaUserPlus className="btn-icon" />
                  Create Account
                </>
              )}
            </button>

            {/* Links */}
            <div className="bottom-links">
              <Link to="/login" className="link">Already have an account? Sign In</Link>
              <Link to="/forgot-password" className="link">Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={5000} />
      <Footer />
    </>
  );
};

export default Signup;