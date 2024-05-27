import React from "react";

const DeliveryInformation = () => {
  return (
    
    <div className="p-4 border border-gray-300 rounded-md">
        <div className="bg-gray-100 rounded-md p-4 mb-3">
      <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
      <div className="mb-3">
        <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone-number"
          placeholder="0123456789"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
        <div className="flex">
          <div className="w-1/3 pr-4">
            <label htmlFor="city-province" className="block text-sm font-medium text-gray-700">
              City/Province
            </label>
            <select
              id="city-province"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="ho-chi-minh">Ho Chi Minh</option>
              {/* Add more options here */}
            </select>
          </div>
          <div className="w-1/3 pr-4">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">
              District
            </label>
            <select
              id="district"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="go-vap">Go Vap</option>
              {/* Add more options here */}
            </select>
          </div>
          <div className="w-1/3">
            <label htmlFor="ward" className="block text-sm font-medium text-gray-700">
              Ward
            </label>
            <select
              id="ward"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="phuong-12">Phuong 12</option>
              {/* Add more options here */}
            </select>
          </div>
        </div>
      
      <div className="mb-3">
        <label htmlFor="home-address" className="block text-sm font-medium text-gray-700">
          Home Address
        </label>
        <input
          type="text"
          id="home-address"
          placeholder="12 Pasteur Street"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </div>
    </div>
  );
};

export default DeliveryInformation;