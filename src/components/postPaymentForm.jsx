import React, { useState } from 'react';
import { saveToAirtable } from '../lib/airtable';
import { sendConfirmationEmail } from '../lib/resend';

function PostPaymentForm({ businessData, paymentData, onSubmit }) {
  const [formData, setFormData] = useState({
    dmg_caller: '',
    dmg_consultant: '',
    expected_start_date: '',
    services_provided: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.dmg_caller || !formData.dmg_consultant || !formData.expected_start_date || !formData.services_provided) {
      setError('Please fill in all fields');
      return;
    }

    const airtableData = {
      ...businessData,
      ...paymentData,
      ...formData,
      expected_start_date: new Date(formData.expected_start_date).toISOString(),
    };

    try {
      await saveToAirtable(airtableData);
      await sendConfirmationEmail(airtableData);
      onSubmit();
    } catch (err) {
      setError('An error occurred while saving data. Please try again.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">DMG Caller</label>
        <input
          type="text"
          name="dmg_caller"
          value={formData.dmg_caller}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">DMG Consultant</label>
        <input
          type="text"
          name="dmg_consultant"
          value={formData.dmg_consultant}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Expected Start Date</label>
        <input
          type="date"
          name="expected_start_date"
          value={formData.expected_start_date}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Services Provided</label>
        <textarea
          name="services_provided"
          value={formData.services_provided}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          rows="4"
          required
        ></textarea>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
}

export default PostPaymentForm;