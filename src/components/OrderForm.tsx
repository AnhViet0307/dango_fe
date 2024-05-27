import React from 'react';

const OrderForm = () => {
  return (
    <div>
      <div className="bg-gray-100 rounded-md p-4 mb-4">
        <h3 className="font-bold text-lg mb-2">Yêu cầu khác (nếu có)</h3>
        <textarea
          className="w-full resize-none rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows="4"
          placeholder="Nhập yêu cầu của bạn..."
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center w-full" 
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2" 
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 1a1 1 0 000 2h14a1 1 0 000-2H3zM3 5a1 1 0 000 2h14a1 1 0 000-2H3zM3 9a1 1 0 000 2h14a1 1 0 000-2H3z" />
        </svg>
        Order
      </button>
    </div>
  );
};

export default OrderForm;