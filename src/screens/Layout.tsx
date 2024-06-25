import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Menu from './Menu/Menu';
import Home from './Home';
import './Layout.css'

interface LayoutProps {
  // Define any props for the Layout component if needed
}

const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="content">
        <Menu onToggleSidebar={toggleSidebar} />
       
      </div>
    </div>
  );
};

export default Layout;
