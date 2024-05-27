import React from 'react';

function SideBar() {
  return (
    <div className="sidebar bg-gray-200 p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">My Account</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer">Manage Profile</li>
        <li className="cursor-pointer">Recent Order</li>
        <li className="cursor-pointer">Shipping Addresses</li>
        <li className="cursor-pointer">Communication Preferences</li>
      </ul>
    </div>
  );
}

export default SideBar;