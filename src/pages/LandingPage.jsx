import { useState } from 'react';
import Hero from '../components/Hero';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <Hero onLoginClick={() => setShowLogin(true)} />

      <LoginModal
  isOpen={showLogin}
  onClose={() => setShowLogin(false)}
  onSwitchToSignup={() => {
    setShowLogin(false);
    setShowSignup(true);
  }}
/>

<SignupModal
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
