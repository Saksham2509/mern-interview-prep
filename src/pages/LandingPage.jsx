import { useState } from 'react';
import Hero from '../components/Hero';
import LoginModal from '../components/LoginModal';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Hero onLoginClick={() => setShowLogin(true)} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default LandingPage;
