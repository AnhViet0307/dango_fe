import React from 'react';

const OrderSummary = () => {
  return (
    <div className="bg-gray-100 rounded-md p-4">
      <div className="mb-3">
        <h3 className="font-bold text-lg">Order Summary</h3>
      </div>
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Product Price</p>
        <p className="text-right text-gray-700">64.500đ</p>
      </div>
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Shipping Fees</p>
        <p className="text-right text-gray-700">15.000đ</p>
      </div>
      <div className="mb-2 flex justify-between">
        <p className="font-bold text-lg text-gray-700">Total Price</p>
        <p className="font-bold text-lg text-right text-gray-700">79.500đ</p>
      </div>
      <div className="mb-4">
        <a href="#" className="flex items-center text-blue-500">
          <div className="rounded-full bg-blue-500 text-white p-3 mr-2">
            <span className="text-xl">+</span>
          </div>
          <span>Add a Voucher</span>
        </a>
      </div>
      <div className="mb-2">
        <h3 className="font-bold text-lg">Hình thức thanh toán</h3>
      </div>
      <div className="relative">
        <select
          className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="momo">Ví Momo</option>
          <option value="cash">Thanh toán khi nhận hàng</option>
          <option value="bank-transfer">Chuyển khoản ngân hàng</option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 absolute top-1/2 right-4 -translate-y-1/2 text-yellow-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default OrderSummary;