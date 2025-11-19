import React, { useState } from "react";
import "./setting.css";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => setDarkMode(!darkMode);

  const handleResetPassword = async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const oldPassword = e.target.oldPassword.value;
  const newPassword = e.target.newPassword.value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, oldPassword, newPassword }),
    });

    const data = await res.json();
    alert(data.message);
    e.target.reset();
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


  // Logout handler: just refresh the page
  const handleLogout = () => {
    window.location.reload(); // assumes login page shows automatically
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

      {/* Reset Password */}
      <div className="settings-card">
        <h2>Reset Password</h2>
        <form className="settings-form" onSubmit={handleResetPassword}>
          <label>
            Username
            <input name="username" type="text" placeholder="Enter username" required />
          </label>
          <label>
            Old Password
            <input name="oldPassword" type="password" placeholder="Enter old password" required />
          </label>
          <label>
            New Password
            <input name="newPassword" type="password" placeholder="Enter new password" required />
          </label>
          <button type="submit" className="settings-button">
            Reset Password
          </button>
        </form>
      </div>

      {/* Logout */}
      <div className="settings-card">
        <h2>Logout</h2>
        <button onClick={handleLogout} className="settings-button logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;

// import React, { useState } from "react";
// import "./setting.css";

// const SettingsPage = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   // Local state for reset password form
//   const [username, setUsername] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleToggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   // -------------------------
//   // RESET PASSWORD HANDLER
//   // -------------------------
//   const handleResetPassword = async (e) => {
//   e.preventDefault();

//   const username = e.target.username.value;
//   const oldPassword = e.target.oldPassword.value;
//   const newPassword = e.target.newPassword.value;

//   try {
//     const res = await fetch("/api/auth/reset-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, oldPassword, newPassword }),
//     });

//     const data = await res.json();
//     alert(data.message);
//     e.target.reset();
//   } catch (err) {
//     console.error(err);
//     alert("Something went wrong");
//   }
// };



//   // -------------------------
//   // LOGOUT HANDLER
//   // -------------------------
//   // LOGOUT HANDLER
// const handleLogout = () => {
//   localStorage.clear();
//   sessionStorage.clear();
//   window.location.reload();
// };

//   return (
//     <div className={darkMode ? "settings-container dark" : "settings-container"}>
//       <h1 className="settings-title">Settings</h1>

//       {/* Appearance */}
//       <div className="settings-card">
//         <h2>Appearance</h2>
//         <label className="toggle-label">
//           Dark Mode
//           <input
//             type="checkbox"
//             checked={darkMode}
//             onChange={handleToggleDarkMode}
//           />
//           <span className="slider"></span>
//         </label>
//       </div>

//       {/* Reset Password */}
//   ;

//      <div className="settings-card">
//   <h2>Reset Password</h2>
//   <form className="settings-form" onSubmit={handleResetPassword}>
//     <label>
//       Username
//       <input name="username" type="text" placeholder="Enter username" required />
//     </label>
//     <label>
//       Old Password
//       <input name="oldPassword" type="password" placeholder="Enter old password" required />
//     </label>
//     <label>
//       New Password
//       <input name="newPassword" type="password" placeholder="Enter new password" required />
//     </label>
//     <button type="submit" className="settings-button">
//       Reset Password
//     </button>
//   </form>
// </div>

//       {/* Profile Settings */}
//       <div className="settings-card">
//         <h2>Profile Settings</h2>
//       </div>

//       {/* LOGOUT BUTTON */}
//       <button className="logout-button" onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// };

// export default SettingsPage;
