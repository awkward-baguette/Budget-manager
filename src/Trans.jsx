
import React, { useState } from "react";
import "./Trans.css";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    desc: "",
    category: "",
    date: "",
    mode: "",
    type: "expense", // "income" or "expense"
  });
  const [editId, setEditId] = useState(null);
  const [budget, setBudget] = useState("");

  // Add or Update Transaction
  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.desc || !formData.category || !formData.date || !formData.mode) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      setTransactions(
        transactions.map((t) => (t.id === editId ? { ...formData, id: editId } : t))
      );
      setEditId(null);
    } else {
      setTransactions([...transactions, { ...formData, id: Date.now() }]);
    }

    setFormData({
      amount: "",
      desc: "",
      category: "",
      date: "",
      mode: "",
      type: "expense",
    });
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleEdit = (id) => {
    const t = transactions.find((tr) => tr.id === id);
    setFormData(t);
    setEditId(id);
  };

  const handleCopy = (id) => {
    const t = transactions.find((tr) => tr.id === id);
    setTransactions([...transactions, { ...t, id: Date.now() }]);
  };

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalSpent = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const balance = totalIncome - totalSpent;
  const budgetStatus = budget ? (balance >= 0 ? "Within Budget ✅" : "Over Budget ⚠️") : "No Budget Set";

  return (
    <div className="app">
      {/* Summary Section */}
      <div className="summary">
        <div className="card income">Income: ₹{totalIncome || 0}</div>
        <div className="card spent">Spent: ₹{totalSpent || 0}</div>
        <div className="card balance">Balance: ₹{balance || 0}</div>
        <div className="card budget">Budget: ₹{budget || 0}</div>
      </div>

      {/* Budget Input */}
      <div className="budget-input">
        <input
          type="number"
          placeholder="Set Monthly Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <span className={`budget-status ${balance < 0 ? "over" : "ok"}`}>
          {budgetStatus}
        </span>
      </div>

      {/* Transaction Form */}
      <form className="transaction-form" onSubmit={handleAddOrUpdate}>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="auto">Auto</option>
          <option value="food">Food</option>
          <option value="bills">Bills</option>
          <option value="salary">Salary</option>
          <option value="investment">Investment</option>
          <option value="other">Other</option>
        </select>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <select
          value={formData.mode}
          onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
        >
          <option value="">Mode</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>
        <button type="submit">{editId ? "Update" : "Add"} Transaction</button>
      </form>

      {/* Transaction List */}
      <div className="transactions">
        <div className="transactions-header">
          <span>Type</span>
          <span>Category</span>
          <span>Amount</span>
          <span>Description</span>
          <span>Date</span>
          <span>Mode</span>
          <span>Actions</span>
        </div>

        <div className="transaction-scroll">
          {transactions.map((t) => (
            <div
              key={t.id}
              className={`transaction ${t.type === "income" ? "income-row" : "expense-row"}`}
            >
              <div>{t.type === "income" ? "💰 Income" : "💸 Expense"}</div>
              <div>{t.category}</div>
              <div>₹{t.amount}</div>
              <div>{t.desc}</div>
              <div>{t.date}</div>
              <div>{t.mode}</div>
              <div className="action-buttons">
                <button className="edit" onClick={() => handleEdit(t.id)}>✏</button>
                <button className="delete" onClick={() => handleDelete(t.id)}>🗑</button>
                <button className="copy" onClick={() => handleCopy(t.id)}>📄</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Transactions;


// import React, { useState } from "react";
// import "./Trans.css";

// function Transactions() {
//   const [transactions, setTransactions] = useState([]);
//   const [formData, setFormData] = useState({
//     amount: "",
//     desc: "",
//     category: "",
//     date: "",
//     mode: "",
//   });
//   const [editId, setEditId] = useState(null);

//   // Add or Update Transaction
//   const handleAddOrUpdate = (e) => {
//     e.preventDefault();
//     if (!formData.amount || !formData.desc || !formData.category || !formData.date || !formData.mode) {
//       alert("Please fill all fields");
//       return;
//     }

//     if (editId) {
//       setTransactions(
//         transactions.map((t) =>
//           t.id === editId ? { ...formData, id: editId } : t
//         )
//       );
//       setEditId(null);
//     } else {
//       setTransactions([
//         ...transactions,
//         { ...formData, id: Date.now() },
//       ]);
//     }

//     setFormData({ amount: "", desc: "", category: "", date: "", mode: "" });
//   };

//   const handleDelete = (id) => {
//     setTransactions(transactions.filter((t) => t.id !== id));
//   };

//   const handleEdit = (id) => {
//     const t = transactions.find((tr) => tr.id === id);
//     setFormData(t);
//     setEditId(id);
//   };

//   const handleCopy = (id) => {
//     const t = transactions.find((tr) => tr.id === id);
//     setTransactions([...transactions, { ...t, id: Date.now() }]);
//   };

//   const totalSpent = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);
//   const totalIncome = transactions
//     .filter((t) => t.category === "income")
//     .reduce((sum, t) => sum + Number(t.amount || 0), 0);
//   const balance = totalIncome - totalSpent;

//   return (
//     <div className="app">
//       {/* Summary Section */}
//       <div className="summary">
//         <div className="card income">Income: ₹{totalIncome || 0}</div>
//         <div className="card spent">Spent: ₹{totalSpent || 0}</div>
//         <div className="card balance">Balance: ₹{balance || 0}</div>
//         <div className="card budget">Budget: ₹{balance > 0 ? balance : 0}</div>
//       </div>

//       {/* Transaction Form */}
//       <form className="transaction-form" onSubmit={handleAddOrUpdate}>
//         <input
//           type="number"
//           placeholder="Amount"
//           value={formData.amount}
//           onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={formData.desc}
//           onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
//         />
//         <select
//           value={formData.category}
//           onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//         >
//           <option value="">Select Category</option>
//           <option value="auto">Auto</option>
//           <option value="food">Food</option>
//           <option value="bills">Bills</option>
//           <option value="income">Income</option>
//           <option value="other">Other</option>
//         </select>
//         <input
//           type="date"
//           value={formData.date}
//           onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//         />
//         <select
//           value={formData.mode}
//           onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
//         >
//           <option value="">Mode</option>
//           <option value="Cash">Cash</option>
//           <option value="UPI">UPI</option>
//           <option value="Card">Card</option>
//         </select>
//         <button type="submit">{editId ? "Update" : "Add"} Transaction</button>
//       </form>

//       {/* Transaction Table */}
//       <div className="transactions">
//         <div className="transactions-header">
//           <span>Category</span>
//           <span>Amount</span>
//           <span>Description</span>
//           <span>Date</span>
//           <span>Mode</span>
//           <span>Actions</span>
//         </div>

//         <div className="transaction-scroll">
//           {transactions.map((t) => (
//             <div
//               key={t.id}
//               className={`transaction ${t.category === "other" ? "highlight" : ""}`}
//             >
//               <div className="icon">
//                 {t.category === "auto"
//                   ? "🚗"
//                   : t.category === "food"
//                   ? "🍴"
//                   : t.category === "bills"
//                   ? "🧾"
//                   : t.category === "income"
//                   ? "💰"
//                   : "•••"}
//               </div>
//               <div>₹{t.amount}</div>
//               <div>{t.desc}</div>
//               <div>{t.date}</div>
//               <div>{t.mode}</div>
//               <div className="action-buttons">
//                 <button className="edit" onClick={() => handleEdit(t.id)}>✏</button>
//                 <button className="delete" onClick={() => handleDelete(t.id)}>🗑</button>
//                 <button className="copy" onClick={() => handleCopy(t.id)}>📄</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Transactions;
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


