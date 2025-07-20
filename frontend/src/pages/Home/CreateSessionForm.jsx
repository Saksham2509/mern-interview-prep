import React, { useState } from 'react';
import toast from 'react-hot-toast';

import axiosInstance from '../../utils/axios';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- Validation ---
    if (!formData.role || !formData.experience || !formData.topicsToFocus) {
      setError('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        topicsToFocus: formData.topicsToFocus.split(',').map(topic => topic.trim()),
      };
      
      await axiosInstance.post(API_PATHS.SESSION.CREATE, payload);
      toast.success('New session created successfully!');
      onSuccess();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create session.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-1">
      {/* Form Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Start a New Journey</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill out a few details to unlock your personalized interview prep.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Target Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g., Frontend Developer"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience
          </label>
          <input
            id="experience"
            name="experience"
            type="text"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g., 3"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="topicsToFocus" className="block text-sm font-medium text-gray-700 mb-1">
            Topics to Focus On (comma-separated)
          </label>
          <input
            id="topicsToFocus"
            name="topicsToFocus"
            type="text"
            value={formData.topicsToFocus}
            onChange={handleChange}
            placeholder="e.g., React, Node.js, System Design"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Preparing for a senior role at a FAANG company."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-3 pt-4">
          <button
            type="button"
            onClick={onSuccess} // This now also works as the "Cancel" button
            className="mt-2 sm:mt-0 w-full justify-center sm:w-auto rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full justify-center sm:w-auto rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Session"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionForm;