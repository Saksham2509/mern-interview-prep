// src/pages/LandingPage.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Hero from "../components/Hero";
import Login from "./Auth/login";
import SignUp from "./Auth/SignUp";
import Features from "../components/Features";
import { UserContext } from "../context/userContext";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleHeroLogin = () => {
    if (user) navigate("/dashboard");
    else {
      setCurrentPage("login");
      setOpenAuthModal(true);
    }
  };
  const handleHeroSignup = () => {
    setCurrentPage("signup");
    setOpenAuthModal(true);
  };

  return (
    <>
      <Hero onLoginClick={handleHeroLogin} onSignupClick={handleHeroSignup} />

      <Features />

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </Modal>
    </>
  );
};

export default LandingPage;
