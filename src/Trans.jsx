
import React from "react";
import "./Trans.css";

const transactions = [
  { id: 1, amount: 350, desc: "Auto", category: "auto", date: "27 Oct 2025", mode: "Cash" },
  { id: 2, amount: 120, desc: "Metro", category: "auto", date: "27 Oct 2025", mode: "UPI" },
  { id: 3, amount: 400, desc: "Ritu payed back", category: "other", date: "18 Oct 2025", mode: "Cash" },
  { id: 4, amount: 50, desc: "Masala Puri", category: "food", date: "8 Oct 2025", mode: "Cash" },
  { id: 5, amount: 9500, desc: "Rent", category: "bills", date: "30 Sept 2025", mode: "Cash" },
  { id: 6, amount: 200, desc: "Parking", category: "auto", date: "27 Oct 2025", mode: "Cash" },
];

function Transactions() {
  return (
    <div className="app">
      <div className="summary">
        <div className="card income">Income: ₹2000</div>
        <div className="card spent">Spent: ₹2000</div>
        <div className="card balance">Balance: ₹2000</div>
        <div className="card budget">Budget: ₹2000</div>
      </div>

      <div className="transactions">
        <div className="transactions-header">
          <div className="start">
          <span>Category</span>
          <span>Cost</span>
          <span>Desc</span>
          </div>
          <div className="end">
          <span>Date</span>
          <span>Mode of Payment</span>
          </div>
        </div>
        <div className="transaction-scroll">
        {transactions.map((t) => (
          <div key={t.id} className={`transaction ${t.category === "other" ? "highlight" : ""}`}>
            <div className="icon">{t.category === "auto" ? "🚗" : t.category === "food" ? "🍴" : t.category === "bills" ? "🧾" : "•••"}</div>
            <div className="amount">₹{t.amount}</div>
            <div className="desc">{t.desc}</div>
            <div className="date">{t.date}</div>
            <div className="mode">{t.mode}</div>
          </div>
        ))}
      </div>
      </div>

      <div className="actions">
        <button className="add">+ Add</button>
        <button className="delete">🗑 Delete</button>
        <button className="edit">✏ Edit</button>
        <button className="copy">📄 Make copy</button>
      </div>
    </div>
  );
}

export default Transactions;

{/*import React from "react";
import "./Trans.css";

const transactions = [
  { id: 1, amount: 350, desc: "Auto", category: "auto", date: "27 Oct 2025", mode: "Cash" },
  { id: 2, amount: 120, desc: "Metro", category: "auto", date: "27 Oct 2025", mode: "UPI" },
  { id: 3, amount: 400, desc: "Ritu payed back", category: "other", date: "18 Oct 2025", mode: "Cash" },
  { id: 4, amount: 50, desc: "Masala Puri", category: "food", date: "8 Oct 2025", mode: "Cash" },
  { id: 5, amount: 9500, desc: "Rent", category: "bills", date: "30 Sept 2025", mode: "Cash" },
  { id: 6, amount: 200, desc: "Parking", category: "auto", date: "27 Oct 2025", mode: "Cash" },
];

function Transactions() {
  return (
    <div className="app">
      <div className="summary">
        <div className="card income">Income: ₹2000</div>
        <div className="card spent">Spent: ₹2000</div>
        <div className="card balance">Balance: ₹2000</div>
        <div className="card budget">Budget: ₹2000</div>
      </div>

      <div className="transactions">
        <div className="transactions-header">
          <span>Categ</span>
          <span>Cost</span>
          <span>Desc</span>
          <span>Date</span>
          <span>Mode of Payment</span>
        </div>
        {transactions.map((t) => (
          <div key={t.id} className={`transaction ${t.category === "other" ? "highlight" : ""}`}>
            <div className="icon">{t.category === "auto" ? "🚗" : t.category === "food" ? "🍴" : t.category === "bills" ? "🧾" : "•••"}</div>
            <div className="amount">₹{t.amount}</div>
            <div className="desc">{t.desc}</div>
            <div className="date">{t.date}</div>
            <div className="mode">{t.mode}</div>
          </div>
        ))}
      </div>

      <div className="actions">
        <button className="delete">🗑 Delete</button>
        <button className="edit">✏ Edit</button>
        <button className="copy">📄 Make copy</button>
      </div>
    </div>
  );
}

export default Transactions;

{/*import React from "react";
import "./trans.css";


const Trans = () => {
  return (
    <main>
    
      <div className="container">
        <div className="badge1">Income: ₹2000</div>
        <div className="badge2">Spent: ₹2000</div>
        <div className="badge3">Balance: ₹2000</div>
        <div className="badge4">Budget: ₹2000</div>
      </div>

  
      <div className="table">
      
        <div className="table-top">
          <span className="table-title">Transactions:</span>
     
        </div>

     
        <div className="table-header">
          <div className="col">Category &nbsp;&nbsp; Cost</div>
          <div className="col">Date &nbsp;&nbsp; Mode of Payment</div>
        </div>

      -
        <div className="transaction-scroll">
          <div className="transaction-card">
            <div className="left">
              <span className="icon">🚗</span>
              <div>
                <p className="amount">₹350</p>
                <p className="desc">Auto</p>
              </div>
            </div>
            <div className="right">
              <p className="date">27 Oct 2025</p>
              <p className="mode">Cash</p>
            </div>
          </div>

          <div className="transaction-card">
            <div className="left">
              <span className="icon">🚇</span>
              <div>
                <p className="amount">₹120</p>
                <p className="desc">Metro</p>
              </div>
            </div>
            <div className="right">
              <p className="date">28 Oct 2025</p>
              <p className="mode">UPI</p>
            </div>
          </div>

          
          {Array.from({ length: 2 }).map((_, i) => (
            <div className="transaction-card" key={i}>
              <div className="left">
                <span className="icon">🍔</span>
                <div>
                  <p className="amount">₹{100 + i * 10}</p>
                  <p className="desc">Food</p>
                </div>
              </div>
              <div className="right">
                <p className="date">29 Oct 2025</p>
                <p className="mode">Card</p>
              </div>
            </div>
          ))}
        </div>

  
        <div className="add-btn-container">
          <button className="add-btn">+ Add More</button>
        </div>
      </div>
    </main>
  );
};

export default Trans;
*/}

