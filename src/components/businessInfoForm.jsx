import React, { useState } from 'react';

function BusinessInfoForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    client_business_name: '',
    contact: '',
    client_email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client_business_name || !formData.contact || !formData.client_email) {
      alert('Please fill in all fields');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.client_email)) {
      alert('Please enter a valid email');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Business Name</label>
        <input
          type="text"
          name="client_business_name"
          value={formData.client_business_name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Name</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="client_email"
          value={formData.client_email}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Proceed to Payment
      </button>
    </form>
  );
}

export default BusinessInfoForm;