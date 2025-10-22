import React from "react";
import "./Bills.css";

export default function BillsDuePage() {
  const BillCard = ({ title, amount, dueDate, frequency }) => (
    <div className="bill-card">
      <h2>{title}</h2>
      <hr />
      <p className="amount">💵 ₹{amount}</p>
      <p className="secondary">Due date 📅: {dueDate}</p>
      <p className="secondary">Frequency 🔁: {frequency}</p>
    </div>
  );

  const bills = [
    { title: "ELECTRICITY", amount: 1500, dueDate: "25 Oct", frequency: "Monthly" },
    { title: "WATER", amount: 300, dueDate: "28 Oct", frequency: "Monthly" },
    { title: "RECHARGE", amount: 499, dueDate: "5 Nov", frequency: "Monthly" },
    { title: "WIFI", amount: 799, dueDate: "1 Nov", frequency: "Monthly" },
    { title: "NETFLIX", amount: 699, dueDate: "15 Nov", frequency: "Monthly" },
  ];

  return (
    <div className="bills-container">

      <div className="bills-grid">
        {bills.map((bill, i) => (
          <BillCard key={i} {...bill} />
        ))}
      </div>
      <br />

      <div className="actions">
        <button className="add-btn">➕ Add new bill</button>
        <button className="icon-btn">🗑 Delete</button>
        <button className="edit-btn">✏ Edit</button>
        <button className="copy-btn">📄 Copy</button>
      </div>
    </div>
  );
}
