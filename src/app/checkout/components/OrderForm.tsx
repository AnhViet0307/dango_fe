import React from 'react';

const OrderForm = () => {
  return (
    <div>
      {/* <div className="bg-gray-100 rounded-md p-4 mb-4">
        <h3 className="font-bold text-lg mb-2">Yêu cầu khác (nếu có)</h3>
        <textarea
          className="w-full resize-none rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows="4"
          placeholder="Nhập yêu cầu của bạn..."
        />
      </div> */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white mx-auto mt-6 mb-24 font-bold py-3 px-auto rounded-xl flex items-center justify-center w-1/3" 
      >
        
        Order
      </button>
    </div>
  );
};

export default OrderForm;