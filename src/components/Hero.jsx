const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-blue-600">
        Crack Your Next Tech Interview 💼
      </h1>
      <p className="text-lg md:text-xl text-center max-w-xl text-gray-700">
        Personalized Interview Questions. AI-Powered Answers. Pin What Matters. All in One Place.
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg">
        Get Started
      </button>
    </section>
  );
};

export default Hero;
