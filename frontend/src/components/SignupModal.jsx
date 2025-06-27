const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Create Account</h2>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <button
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:underline block mx-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
