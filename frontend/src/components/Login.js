// // src/components/Login.js
// import React, { useState } from "react";
// import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import "../styles/Login.css";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });

//   const navigate = useNavigate();

//   const dummyAdmins = [
//     { email: "admin1@cryptocrowd.com", password: "admin123" },
//     { email: "admin2@cryptocrowd.com", password: "secureadmin" },
//     { email: "admin3@cryptocrowd.com", password: "adminaccess" },
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isAdmin = dummyAdmins.some(
//       (admin) =>
//         admin.email === formData.email &&
//         admin.password === formData.password
//     );

//     if (isAdmin) {
//       localStorage.setItem("token", "dummy-admin-token");
//       localStorage.setItem("email", formData.email);

//       toast.success("Admin Login Successful!", {
//         position: "top-center",
//         autoClose: 2000,
//       });

//       setTimeout(() => navigate("/admin-dashboard"), 2200);
//       return;
//     }

//     // Normal user login with JWT
//     try {
//       const response = await axios.post("http://localhost:8082/api/auth/login", {
//         email: formData.email,
//         password: formData.password,
//       });

//       const { token } = response.data;

//       if (token) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("email", formData.email);

//         toast.success("Login Successful!", {
//           position: "top-center",
//           autoClose: 2000,
//         });

//         setTimeout(() => navigate("/dashboard"), 2200);
//       } else {
//         toast.error("Invalid login response", {
//           position: "top-center",
//         });
//       }
//     } catch (error) {
//       const message =
//         error.response?.data?.error || "Login failed. Please try again!";
//       toast.error(message, {
//         position: "top-center",
//       });
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <ToastContainer />
//       <div className="login-container">
//         <div className="login-card">
//           <div className="login-header">
//             <h1 className="login-title">Sign in</h1>
//             <p className="login-subtitle">Access your Crypto-Crowd Account</p>
//           </div>

//           <form className="login-form" onSubmit={handleSubmit}>
//             {/* Email */}
//             <div className="login-form-group">
//               <div className="login-input-icon"><FaEnvelope /></div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 className="login-form-input"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="login-form-group">
//               <div className="login-input-icon"><FaLock /></div>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 className="login-form-input"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Remember Me */}
//             <div className="login-options-row">
//               <div className="remember-me-container">
//                 <input
//                   type="checkbox"
//                   id="rememberMe"
//                   name="rememberMe"
//                   checked={formData.rememberMe}
//                   onChange={handleChange}
//                   className="remember-me-checkbox"
//                 />
//                 <label htmlFor="rememberMe" className="remember-me-label">
//                   Remember me
//                 </label>
//               </div>
//               <div className="login-forgot-password">
//                 <Link to="/forgot-password" className="login-link">
//                   Forgot Password?
//                 </Link>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button type="submit" className="login-btn">
//               <div className="login-btn-icon"><FaSignInAlt /></div>
//               Sign In
//             </button>

//             {/* Sign Up Redirect */}
//             <div className="login-bottom-links">
//               <span>
//                 Don't have an account?{" "}
//                 <Link to="/signup" className="login-link">Sign Up</Link>
//               </span>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8082/api/auth/login",
        {
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000, // 5 second timeout
        }
      );

      if (response.data.success) {
        const { token, user } = response.data;
        
        // Store token and user data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 2000,
        });

        // Redirect based on user role
        setTimeout(() => {
          navigate(user.role === "admin" ? "/admin-dashboard" : "/dashboard");
        }, 2200);
      } else {
        throw new Error(response.data.error || "Login failed");
      }
    } catch (error) {
      let errorMessage = "Login failed. Please try again!";
      
      if (error.response) {
        // Server responded with error status code
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "Server not responding. Please try again later.";
      }
      
      toast.error(errorMessage, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Sign in</h1>
            <p className="login-subtitle">Access your Crypto-Crowd Account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <div className="login-input-icon"><FaEnvelope /></div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="login-form-input"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="login-form-group">
              <div className="login-input-icon"><FaLock /></div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="login-form-input"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                autoComplete="current-password"
              />
            </div>

            <div className="login-options-row">
              <div className="remember-me-container">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="remember-me-checkbox"
                />
                <label htmlFor="rememberMe" className="remember-me-label">
                  Remember me
                </label>
              </div>
              <div className="login-forgot-password">
                <Link to="/forgot-password" className="login-link">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="login-spinner"></span>
              ) : (
                <>
                  <FaSignInAlt className="login-btn-icon" />
                  Sign In
                </>
              )}
            </button>

            <div className="login-bottom-links">
              <span>
                Don't have an account?{" "}
                <Link to="/signup" className="login-link">Sign Up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;