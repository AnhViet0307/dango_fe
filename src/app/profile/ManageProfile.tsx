import React from 'react';

function ManageProfile() {
  return (
    <div className="bg-white rounded-md p-4">
      <h2 className="text-xl font-bold mb-4">Manage Profile</h2>
      <div className="bg-gray-100 rounded-md p-4">
        <div className="mb-3">
          <label
            htmlFor="full-name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="full-name"
            value="TRAN VAN ANH"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="phone-number"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone-number"
            value="0123456789"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value="vananh@gmail.com"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="radio"
              name="gender"
              id="male"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="male" className="ml-3 block text-sm font-medium text-gray-700">
              Male
            </label>
            <input
              type="radio"
              name="gender"
              id="female"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 ml-6"
            />
            <label htmlFor="female" className="ml-3 block text-sm font-medium text-gray-700">
              Female
            </label>
          </div>
        </div>
        <div className="flex justify-center"> {/* Add this div */}
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">Save</button>
        </div>
      </div>
    </div>
  );
}

export default ManageProfile;