// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./components/HomePage";
// import About from "./components/About";
// import HowItWorks from "./components/HowItWorks";
// import Services from "./components/Services";
// import Blog from "./components/Blog";
// import Contact from "./components/Contact";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import CryptoCrowdDashboard from "./components/CryptoCrowdDashboard";
// import AdminDashboard from "./components/AdminDashboard";
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//          <Route path="/about" element={<About />} />
//         <Route path="/how-it-works" element={<HowItWorks />} />
//           <Route path="/services" element={<Services />} />
//            <Route path="/blog" element={<Blog />} />
//            <Route path="/contact" element={<Contact/>}/>
//            <Route path="/signup" element={<Signup/>}/>
//            <Route path="/login" element={<Login/>}/>
//             <Route path="/dashboard" element={<CryptoCrowdDashboard/>}/>
//             <Route path="/admin-dashboard" element={<AdminDashboard/>}/>

//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CryptoCrowdDashboard from "./components/CryptoCrowdDashboard";
import AdminDashboard from "./components/AdminDashboard";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <CryptoCrowdDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;