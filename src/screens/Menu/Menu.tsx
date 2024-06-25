import React from 'react';

interface MenuProps {
  onToggleSidebar: () => void;
}

const Menu: React.FC<MenuProps> = ({ onToggleSidebar }) => {
  return (
    <div className="menu">
   
      {/* Add other menu items as needed */}
    </div>
  );
};

export default Menu;
