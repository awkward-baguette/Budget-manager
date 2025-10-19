import React from "react";
import "./trans.css";


const Trans = () => {
  return (
    <main>
      {/* Top badges */}
      <div className="container">
        <div className="badge1">Income: ₹2000</div>
        <div className="badge2">Spent: ₹2000</div>
        <div className="badge3">Balance: ₹2000</div>
        <div className="badge4">Budget: ₹2000</div>
      </div>

      {/* Transaction section */}
      <div className="table">
        {/* Header row with filter icon */}
        <div className="table-top">
          <span className="table-title">Transactions:</span>
     
        </div>

        {/* Column headings */}
        <div className="table-header">
          <div className="col">Category &nbsp;&nbsp; Cost</div>
          <div className="col">Date &nbsp;&nbsp; Mode of Payment</div>
        </div>

        {/* Scrollable transactions list */}
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

        {/* Add More Button */}
        <div className="add-btn-container">
          <button className="add-btn">+ Add More</button>
        </div>
      </div>
    </main>
  );
};

export default Trans;
