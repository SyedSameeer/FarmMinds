import React from 'react';
import { Users, ShoppingBasket, DollarSign, TrendingUp } from 'lucide-react';
import '../Admin/DashboardStats.css';
function DashboardStats({ userCount, productCount, totalRevenue }) {
  const stats = [
    {
      title: 'Total Users',
      value: userCount.toString(),
      icon: Users,
      change: '+12%',
      colorClass: 'dashboard-stats-icon-blue',
    },
    {
      title: 'Total Products',
      value: productCount.toString(),
      icon: ShoppingBasket,
      change: '+23%',
      colorClass: 'dashboard-stats-icon-green',
    },
    {
      title: 'Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+18%',
      colorClass: 'dashboard-stats-icon-purple',
    },
    {
      title: 'Growth',
      value: '27%',
      icon: TrendingUp,
      change: '+5%',
      colorClass: 'dashboard-stats-icon-yellow',
    },
  ];

  return (
    <div className="dashboard-stats-grid">
      {stats.map((stat) => (
        <div key={stat.title} className="dashboard-stats-card">
          <div className={`dashboard-stats-icon ${stat.colorClass}`}>
            <stat.icon className="dashboard-stats-icon-svg" />
          </div>
          <div className="dashboard-stats-content">
            <p className="dashboard-stats-title">{stat.title}</p>
            <div className="dashboard-stats-value-container">
              <h3 className="dashboard-stats-value">{stat.value}</h3>
              <span className="dashboard-stats-change">{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
