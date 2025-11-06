import React, { useState } from "react";
import "./setting.css";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "settings-container dark" : "settings-container"}>
      <h1 className="settings-title">Settings</h1>

      {/* Appearance */}
      <div className="settings-card">
        <h2>Appearance</h2>
        <label className="toggle-label">
          Dark Mode
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleToggleDarkMode}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="settings-card">
        <h2>Reset Password</h2>
        <form className="settings-form">
          <label>
            Username
            <input type="text" placeholder="Enter username" />
          </label>
          <label>
            Old Password
            <input type="password" placeholder="Enter old password" />
          </label>
          <label>
            New Password
            <input type="password" placeholder="Enter new password" />
          </label>
          <button type="submit" className="settings-button">
            Reset Password
          </button>
        </form>
      </div>
      <div className="settings-card">
        <h2>Profile Settings</h2>
      </div>
    </div>
  );
};

export default SettingsPage;
