import React from 'react';
import { LayoutDashboard, Users, ShoppingBasket, Settings } from 'lucide-react';
import '../Admin/trail.css';
function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Users, label: 'Users', id: 'users' },
    { icon: ShoppingBasket, label: 'Products', id: 'products' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="farmadmin-sidebar">
      <div className="farmadmin-sidebar-header">
        <ShoppingBasket className="farmadmin-sidebar-logo" />
        <h1 className="farmadmin-sidebar-title">FarmAdmin</h1>
      </div>
      <nav className="farmadmin-sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`farmadmin-sidebar-item ${
              activeTab === item.id ? 'farmadmin-active' : ''
            }`}
          >
            <item.icon className="farmadmin-sidebar-icon" />
            <span className="farmadmin-sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
