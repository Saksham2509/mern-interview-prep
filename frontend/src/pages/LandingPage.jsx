import { useState } from 'react';
import Hero from '../components/Hero';

import Login from "./Auth/login";
import SignUp from "./Auth/SignUp";


const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <Hero onLoginClick={() => setShowLogin(true)} />

      <Login
  isOpen={showLogin}
  onClose={() => setShowLogin(false)}
  onSwitchToSignup={() => {
    setShowLogin(false);
    setShowSignup(true);
  }}
/>

<SignUp
  isOpen={showSignup}
  onClose={() => setShowSignup(false)}
  onSwitchToLogin={() => {
    setShowSignup(false);
    setShowLogin(true);
  }}
/>

    </>
  );
};

export default LandingPage;
