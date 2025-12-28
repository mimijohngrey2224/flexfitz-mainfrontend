//cleaner
import React from 'react';

function Sidebar({ activeTab, setActiveTab }) {
  const tabs = ['Orders', 'Wishlist', 'Profile', 'Settings'];

  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Dashboard</h2>

      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-4 py-2 rounded-md text-gray-700 hover:bg-pink-100 transition ${
              activeTab === tab ? 'bg-pink-500 text-white font-semibold' : ''
            }`}
          >
            {tab}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
