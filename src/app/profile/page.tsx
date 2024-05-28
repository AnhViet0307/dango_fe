import React from 'react';
import Sidebar from './Sidebar';
import ManageProfile from './ManageProfile';
import Topbar from '@/components/Topbar';

function App() {
  return (
    <div>
        <Topbar/>
<div className="app-container flex">
        
      <Sidebar />
      <div className="flex-1 ml-4">
        <ManageProfile />
      </div>
    </div>
    </div>
    
  );
}

export default App;