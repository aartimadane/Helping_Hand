import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Donor Dashboard</h1>
      </header>
      <div className="dashboard-main">
        <aside className="dashboard-sidebar">
          <nav>
            <ul>
              <li>Overview</li>
              <li>My Donations</li>
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </nav>
        </aside>
        <section className="dashboard-content">
          <h2>Welcome to the Donor Dashboard</h2>
          <p>This is where you can manage your donations and profile.</p>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
