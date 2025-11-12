// src/Trans.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";




// axios.post("http://localhost:3000/api/transactions", payload, {
//   headers: { Authorization: `Bearer ${token}` }
// })
// .then(res => console.log(res.data))
// .catch(err => console.error("Error saving transaction:", err.response?.data || err.message));

const BASE_URL = "http://localhost:3000/api"; // Express backend

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    desc: "",
    category: "",
    date: "",
    mode: "",
    type: "expense",
  });

  const token = localStorage.getItem("token"); // assuming user token is stored

  // Fetch transactions on load
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Add new transaction
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!form.amount || !form.desc || !form.category) return;

  //   try {
  //     const res = await axios.post(`${BASE_URL}/transactions`, form, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setTransactions([res.data, ...transactions]); // prepend new transaction
  //     setForm({ amount: "", desc: "", category: "", date: "", mode: "", type: "expense" });
  //   } catch (err) {
  //     console.error("Error saving transaction:", err);
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.amount || !form.desc || !form.category) return;

  try {
    // Prepare payload to match Mongoose schema
    const payload = {
      amount: Number(form.amount),      // ensure number
      desc: form.desc,
      category: form.category,
      date: form.date ? new Date(form.date) : new Date(),
      mode: form.mode,
      type: form.type || "expense",
    };

    const res = await axios.post(`${BASE_URL}/transactions`, payload, {
      headers: { Authorization: `Bearer ${token}` }, // token from auth
    });

    // Prepend new transaction
    setTransactions([res.data, ...transactions]);

    // Reset form
    setForm({
      amount: "",
      desc: "",
      category: "",
      date: "",
      mode: "",
      type: "expense",
    });
  } catch (err) {
    console.error("Error saving transaction:", err.response?.data || err.message);
  }
};


  // Delete transaction
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="app">
      {/* Summary */}
      <div className="summary">
        <div className="card income">Income: ₹{totalIncome}</div>
        <div className="card spent">Expenses: ₹{totalExpense}</div>
        <div className="card balance">Balance: ₹{balance}</div>
      </div>

      {/* Transaction Form */}
      <form className="transaction-form" onSubmit={handleSubmit}>
        <input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          placeholder="Mode"
          value={form.mode}
          onChange={(e) => setForm({ ...form, mode: e.target.value })}
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>

      {/* Transaction List */}
      <div className="transaction-scroll">
        {transactions.map((t) => (
          <div key={t._id} className={`transaction ${t.type}`}>
            <span>{t.type === "income" ? "💰" : "💸"}</span>
            <span>{t.desc}</span>
            <span>₹{t.amount}</span>
            <span>{t.category}</span>
            <span>{new Date(t.date).toLocaleDateString()}</span>
            <span>{t.mode}</span>
            <button onClick={() => handleDelete(t._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:3000/api/transactions"; // backend endpoint

// function Dashboard() {
//   const [transactions, setTransactions] = useState([]);
//   const [form, setForm] = useState({
//     amount: "",
//     desc: "",
//     category: "",
//     date: "",
//     mode: "",
//     type: "expense", // expense or income
//   });
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const res = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTransactions(res.data);
//     } catch (err) {
//       console.error("Error fetching transactions:", err);
//     }
//   };

//   const addTransaction = async () => {
//     if (!form.amount || !form.desc || !form.category) return;

//     try {
//       const res = await axios.post(API_URL, form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTransactions([res.data, ...transactions]);
//       setForm({ amount: "", desc: "", category: "", date: "", mode: "", type: "expense" });
//     } catch (err) {
//       console.error("Error adding transaction:", err);
//     }
//   };

//   const deleteTransaction = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTransactions(transactions.filter((t) => t._id !== id));
//     } catch (err) {
//       console.error("Error deleting transaction:", err);
//     }
//   };

//   // Totals
//   const totalIncome = transactions
//     .filter((t) => t.type === "income")
//     .reduce((sum, t) => sum + Number(t.amount), 0);
//   const totalExpense = transactions
//     .filter((t) => t.type === "expense")
//     .reduce((sum, t) => sum + Number(t.amount), 0);
//   const balance = totalIncome - totalExpense;

//   // Optional: calculate category budgets
//   const categoryTotals = {};
//   transactions.forEach((t) => {
//     if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
//     categoryTotals[t.category] += Number(t.amount);
//   });

//   return (
//     <div className="dashboard">
//       <div className="summary">
//         <div className="card income">Income: ₹{totalIncome}</div>
//         <div className="card spent">Expenses: ₹{totalExpense}</div>
//         <div className="card balance">Balance: ₹{balance}</div>
//       </div>

//       <div className="transaction-form">
//         <input
//           placeholder="Amount"
//           value={form.amount}
//           onChange={(e) => setForm({ ...form, amount: e.target.value })}
//         />
//         <input
//           placeholder="Description"
//           value={form.desc}
//           onChange={(e) => setForm({ ...form, desc: e.target.value })}
//         />
//         <input
//           placeholder="Category"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//         />
//         <input
//           type="date"
//           value={form.date}
//           onChange={(e) => setForm({ ...form, date: e.target.value })}
//         />
//         <input
//           placeholder="Mode"
//           value={form.mode}
//           onChange={(e) => setForm({ ...form, mode: e.target.value })}
//         />
//         <select
//           value={form.type}
//           onChange={(e) => setForm({ ...form, type: e.target.value })}
//         >
//           <option value="expense">Expense</option>
//           <option value="income">Income</option>
//         </select>
//         <button onClick={addTransaction}>Add</button>
//       </div>

//       <div className="transactions-list">
//         {transactions.map((t) => (
//           <div key={t._id} className={`transaction ${t.type}`}>
//             <span>{t.type === "income" ? "💰" : "💸"}</span>
//             <span>{t.desc}</span>
//             <span>₹{t.amount}</span>
//             <span>{t.category}</span>
//             <span>{new Date(t.date).toLocaleDateString()}</span>
//             <button onClick={() => deleteTransaction(t._id)}>Delete</button>
//           </div>
//         ))}
//       </div>

//       <div className="category-summary">
//         <h3>Expenses by Category:</h3>
//         <ul>
//           {Object.entries(categoryTotals).map(([cat, amt]) => (
//             <li key={cat}>
//               {cat}: ₹{amt}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import "./Trans.css";

// // function Transactions() {
// //   const [transactions, setTransactions] = useState([]);
// //   const [formData, setFormData] = useState({
// //     amount: "",
// //     desc: "",
// //     category: "",
// //     date: "",
// //     mode: "",
// //     type: "expense", // "income" or "expense"
// //   });
// //   const [editId, setEditId] = useState(null);

// //   const API_URL = "/api/transactions";

// //   // Fetch all transactions on load
// //   useEffect(() => {
// //     fetchTransactions();
// //   }, []);

// //   const fetchTransactions = async () => {
// //     try {
// //       const res = await axios.get(API_URL);
// //       //setTransactions(res.data);
// //        setTransactions(Array.isArray(res.data) ? res.data : [])
// //     } catch (err) {
// //       console.error("Error fetching transactions:", err);
// //     }
// //   };

// //   // Add or update transaction
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!formData.amount || !formData.desc || !formData.category || !formData.date || !formData.mode) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     try {
// //       if (editId) {
// //         // Update
// //         const res = await axios.put(`${API_URL}/${editId}`, formData);
// //         setTransactions(transactions.map((t) => (t._id === editId ? res.data : t)));
// //         setEditId(null);
// //       } else {
// //         // Add
// //         const res = await axios.post(API_URL, formData);
// //         setTransactions([res.data, ...transactions]);
// //       }

// //       setFormData({
// //         amount: "",
// //         desc: "",
// //         category: "",
// //         date: "",
// //         mode: "",
// //         type: "expense",
// //       });
// //     } catch (err) {
// //       console.error("Error saving transaction:", err);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`${API_URL}/${id}`);
// //       setTransactions(transactions.filter((t) => t._id !== id));
// //     } catch (err) {
// //       console.error("Error deleting transaction:", err);
// //     }
// //   };

// //   const handleEdit = (id) => {
// //     const t = transactions.find((tr) => tr._id === id);
// //     setFormData(t);
// //     setEditId(id);
// //   };

// //   const handleCopy = async (id) => {
// //     const t = transactions.find((tr) => tr._id === id);
// //     try {
// //       const res = await axios.post(API_URL, { ...t, _id: undefined });
// //       setTransactions([res.data, ...transactions]);
// //     } catch (err) {
// //       console.error("Error copying transaction:", err);
// //     }
// //   };

// //   // Totals
// //   const totalIncome = transactions
// //     .filter((t) => t.type === "income")
// //     .reduce((sum, t) => sum + Number(t.amount), 0);
// //   const totalSpent = transactions
// //     .filter((t) => t.type === "expense")
// //     .reduce((sum, t) => sum + Number(t.amount), 0);
// //   const balance = totalIncome - totalSpent;

// //   return (
// //     <div className="app">
// //       <div className="summary">
// //         <div className="card income">Income: ₹{totalIncome}</div>
// //         <div className="card spent">Spent: ₹{totalSpent}</div>
// //         <div className="card balance">Balance: ₹{balance}</div>
// //       </div>

// //       {/* Transaction Form */}
// //       <form className="transaction-form" onSubmit={handleSubmit}>
// //         <select
// //           value={formData.type}
// //           onChange={(e) => setFormData({ ...formData, type: e.target.value })}
// //         >
// //           <option value="expense">Expense</option>
// //           <option value="income">Income</option>
// //         </select>
// //         <input
// //           type="number"
// //           placeholder="Amount"
// //           value={formData.amount}
// //           onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
// //         />
// //         <input
// //           type="text"
// //           placeholder="Description"
// //           value={formData.desc}
// //           onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
// //         />
// //         <select
// //           value={formData.category}
// //           onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //         >
// //           <option value="">Select Category</option>
// //           <option value="auto">Auto</option>
// //           <option value="food">Food</option>
// //           <option value="bills">Bills</option>
// //           <option value="salary">Salary</option>
// //           <option value="investment">Investment</option>
// //           <option value="other">Other</option>
// //         </select>
// //         <input
// //           type="date"
// //           value={formData.date}
// //           onChange={(e) => setFormData({ ...formData, date: e.target.value })}
// //         />
// //         <select
// //           value={formData.mode}
// //           onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
// //         >
// //           <option value="">Mode</option>
// //           <option value="Cash">Cash</option>
// //           <option value="UPI">UPI</option>
// //           <option value="Card">Card</option>
// //         </select>
// //         <button type="submit">{editId ? "Update" : "Add"} Transaction</button>
// //       </form>

// //       {/* Transaction List */}
// //       <div className="transactions">
// //         <div className="transactions-header">
// //           <span>Type</span>
// //           <span>Category</span>
// //           <span>Amount</span>
// //           <span>Description</span>
// //           <span>Date</span>
// //           <span>Mode</span>
// //           <span>Actions</span>
// //         </div>

// //         <div className="transaction-scroll">
// //           {transactions.map((t) => (
// //             <div
// //               key={t._id}
// //               className={`transaction ${t.type === "income" ? "income-row" : "expense-row"}`}
// //             >
// //               <div>{t.type === "income" ? "💰 Income" : "💸 Expense"}</div>
// //               <div>{t.category}</div>
// //               <div>₹{t.amount}</div>
// //               <div>{t.desc}</div>
// //               <div>{t.date.split("T")[0]}</div>
// //               <div>{t.mode}</div>
// //               <div className="action-buttons">
// //                 <button className="edit" onClick={() => handleEdit(t._id)}>✏</button>
// //                 <button className="delete" onClick={() => handleDelete(t._id)}>🗑</button>
// //                 <button className="copy" onClick={() => handleCopy(t._id)}>📄</button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Transactions;

// // // import React, { useState } from "react";
// // // import "./Trans.css";

// // // function Transactions() {
// // //   const [transactions, setTransactions] = useState([]);
// // //   const [formData, setFormData] = useState({
// // //     amount: "",
// // //     desc: "",
// // //     category: "",
// // //     date: "",
// // //     mode: "",
// // //     type: "expense", // "income" or "expense"
// // //   });
// // //   const [editId, setEditId] = useState(null);
// // //   const [budget, setBudget] = useState("");

// // //   // Add or Update Transaction
// // //   const handleAddOrUpdate = (e) => {
// // //     e.preventDefault();
// // //     if (!formData.amount || !formData.desc || !formData.category || !formData.date || !formData.mode) {
// // //       alert("Please fill all fields");
// // //       return;
// // //     }

// // //     if (editId) {
// // //       setTransactions(
// // //         transactions.map((t) => (t.id === editId ? { ...formData, id: editId } : t))
// // //       );
// // //       setEditId(null);
// // //     } else {
// // //       setTransactions([...transactions, { ...formData, id: Date.now() }]);
// // //     }

// // //     setFormData({
// // //       amount: "",
// // //       desc: "",
// // //       category: "",
// // //       date: "",
// // //       mode: "",
// // //       type: "expense",
// // //     });
// // //   };

// // //   const handleDelete = (id) => {
// // //     setTransactions(transactions.filter((t) => t.id !== id));
// // //   };

// // //   const handleEdit = (id) => {
// // //     const t = transactions.find((tr) => tr.id === id);
// // //     setFormData(t);
// // //     setEditId(id);
// // //   };

// // //   const handleCopy = (id) => {
// // //     const t = transactions.find((tr) => tr.id === id);
// // //     setTransactions([...transactions, { ...t, id: Date.now() }]);
// // //   };

// // //   // Calculate totals
// // //   const totalIncome = transactions
// // //     .filter((t) => t.type === "income")
// // //     .reduce((sum, t) => sum + Number(t.amount || 0), 0);

// // //   const totalSpent = transactions
// // //     .filter((t) => t.type === "expense")
// // //     .reduce((sum, t) => sum + Number(t.amount || 0), 0);

// // //   const balance = totalIncome - totalSpent;
// // //   const budgetStatus = budget ? (balance >= 0 ? "Within Budget ✅" : "Over Budget ⚠️") : "No Budget Set";

// // //   return (
// // //     <div className="app">
// // //       {/* Summary Section */}
// // //       <div className="summary">
// // //         <div className="card income">Income: ₹{totalIncome || 0}</div>
// // //         <div className="card spent">Spent: ₹{totalSpent || 0}</div>
// // //         <div className="card balance">Balance: ₹{balance || 0}</div>
// // //         <div className="card budget">Budget: ₹{budget || 0}</div>
// // //       </div>

// // //       {/* Budget Input */}
// // //       <div className="budget-input">
// // //         <input
// // //           type="number"
// // //           placeholder="Set Monthly Budget"
// // //           value={budget}
// // //           onChange={(e) => setBudget(e.target.value)}
// // //         />
// // //         <span className={`budget-status ${balance < 0 ? "over" : "ok"}`}>
// // //           {budgetStatus}
// // //         </span>
// // //       </div>

// // //       {/* Transaction Form */}
// // //       <form className="transaction-form" onSubmit={handleAddOrUpdate}>
// // //         <select
// // //           value={formData.type}
// // //           onChange={(e) => setFormData({ ...formData, type: e.target.value })}
// // //         >
// // //           <option value="expense">Expense</option>
// // //           <option value="income">Income</option>
// // //         </select>
// // //         <input
// // //           type="number"
// // //           placeholder="Amount"
// // //           value={formData.amount}
// // //           onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
// // //         />
// // //         <input
// // //           type="text"
// // //           placeholder="Description"
// // //           value={formData.desc}
// // //           onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
// // //         />
// // //         <select
// // //           value={formData.category}
// // //           onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// // //         >
// // //           <option value="">Select Category</option>
// // //           <option value="auto">Auto</option>
// // //           <option value="food">Food</option>
// // //           <option value="bills">Bills</option>
// // //           <option value="salary">Salary</option>
// // //           <option value="investment">Investment</option>
// // //           <option value="other">Other</option>
// // //         </select>
// // //         <input
// // //           type="date"
// // //           value={formData.date}
// // //           onChange={(e) => setFormData({ ...formData, date: e.target.value })}
// // //         />
// // //         <select
// // //           value={formData.mode}
// // //           onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
// // //         >
// // //           <option value="">Mode</option>
// // //           <option value="Cash">Cash</option>
// // //           <option value="UPI">UPI</option>
// // //           <option value="Card">Card</option>
// // //         </select>
// // //         <button type="submit">{editId ? "Update" : "Add"} Transaction</button>
// // //       </form>

// // //       {/* Transaction List */}
// // //       <div className="transactions">
// // //         <div className="transactions-header">
// // //           <span>Type</span>
// // //           <span>Category</span>
// // //           <span>Amount</span>
// // //           <span>Description</span>
// // //           <span>Date</span>
// // //           <span>Mode</span>
// // //           <span>Actions</span>
// // //         </div>

// // //         <div className="transaction-scroll">
// // //           {transactions.map((t) => (
// // //             <div
// // //               key={t.id}
// // //               className={`transaction ${t.type === "income" ? "income-row" : "expense-row"}`}
// // //             >
// // //               <div>{t.type === "income" ? "💰 Income" : "💸 Expense"}</div>
// // //               <div>{t.category}</div>
// // //               <div>₹{t.amount}</div>
// // //               <div>{t.desc}</div>
// // //               <div>{t.date}</div>
// // //               <div>{t.mode}</div>
// // //               <div className="action-buttons">
// // //                 <button className="edit" onClick={() => handleEdit(t.id)}>✏</button>
// // //                 <button className="delete" onClick={() => handleDelete(t.id)}>🗑</button>
// // //                 <button className="copy" onClick={() => handleCopy(t.id)}>📄</button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Transactions;


// // // // import React, { useState } from "react";
// // // // import "./Trans.css";

// // // // function Transactions() {
// // // //   const [transactions, setTransactions] = useState([]);
// // // //   const [formData, setFormData] = useState({
// // // //     amount: "",
// // // //     desc: "",
// // // //     category: "",
// // // //     date: "",
// // // //     mode: "",
// // // //   });
// // // //   const [editId, setEditId] = useState(null);

// // // //   // Add or Update Transaction
// // // //   const handleAddOrUpdate = (e) => {
// // // //     e.preventDefault();
// // // //     if (!formData.amount || !formData.desc || !formData.category || !formData.date || !formData.mode) {
// // // //       alert("Please fill all fields");
// // // //       return;
// // // //     }

// // // //     if (editId) {
// // // //       setTransactions(
// // // //         transactions.map((t) =>
// // // //           t.id === editId ? { ...formData, id: editId } : t
// // // //         )
// // // //       );
// // // //       setEditId(null);
// // // //     } else {
// // // //       setTransactions([
// // // //         ...transactions,
// // // //         { ...formData, id: Date.now() },
// // // //       ]);
// // // //     }

// // // //     setFormData({ amount: "", desc: "", category: "", date: "", mode: "" });
// // // //   };

// // // //   const handleDelete = (id) => {
// // // //     setTransactions(transactions.filter((t) => t.id !== id));
// // // //   };

// // // //   const handleEdit = (id) => {
// // // //     const t = transactions.find((tr) => tr.id === id);
// // // //     setFormData(t);
// // // //     setEditId(id);
// // // //   };

// // // //   const handleCopy = (id) => {
// // // //     const t = transactions.find((tr) => tr.id === id);
// // // //     setTransactions([...transactions, { ...t, id: Date.now() }]);
// // // //   };

// // // //   const totalSpent = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);
// // // //   const totalIncome = transactions
// // // //     .filter((t) => t.category === "income")
// // // //     .reduce((sum, t) => sum + Number(t.amount || 0), 0);
// // // //   const balance = totalIncome - totalSpent;

// // // //   return (
// // // //     <div className="app">
// // // //       {/* Summary Section */}
// // // //       <div className="summary">
// // // //         <div className="card income">Income: ₹{totalIncome || 0}</div>
// // // //         <div className="card spent">Spent: ₹{totalSpent || 0}</div>
// // // //         <div className="card balance">Balance: ₹{balance || 0}</div>
// // // //         <div className="card budget">Budget: ₹{balance > 0 ? balance : 0}</div>
// // // //       </div>

// // // //       {/* Transaction Form */}
// // // //       <form className="transaction-form" onSubmit={handleAddOrUpdate}>
// // // //         <input
// // // //           type="number"
// // // //           placeholder="Amount"
// // // //           value={formData.amount}
// // // //           onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
// // // //         />
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Description"
// // // //           value={formData.desc}
// // // //           onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
// // // //         />
// // // //         <select
// // // //           value={formData.category}
// // // //           onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// // // //         >
// // // //           <option value="">Select Category</option>
// // // //           <option value="auto">Auto</option>
// // // //           <option value="food">Food</option>
// // // //           <option value="bills">Bills</option>
// // // //           <option value="income">Income</option>
// // // //           <option value="other">Other</option>
// // // //         </select>
// // // //         <input
// // // //           type="date"
// // // //           value={formData.date}
// // // //           onChange={(e) => setFormData({ ...formData, date: e.target.value })}
// // // //         />
// // // //         <select
// // // //           value={formData.mode}
// // // //           onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
// // // //         >
// // // //           <option value="">Mode</option>
// // // //           <option value="Cash">Cash</option>
// // // //           <option value="UPI">UPI</option>
// // // //           <option value="Card">Card</option>
// // // //         </select>
// // // //         <button type="submit">{editId ? "Update" : "Add"} Transaction</button>
// // // //       </form>

// // // //       {/* Transaction Table */}
// // // //       <div className="transactions">
// // // //         <div className="transactions-header">
// // // //           <span>Category</span>
// // // //           <span>Amount</span>
// // // //           <span>Description</span>
// // // //           <span>Date</span>
// // // //           <span>Mode</span>
// // // //           <span>Actions</span>
// // // //         </div>

// // // //         <div className="transaction-scroll">
// // // //           {transactions.map((t) => (
// // // //             <div
// // // //               key={t.id}
// // // //               className={`transaction ${t.category === "other" ? "highlight" : ""}`}
// // // //             >
// // // //               <div className="icon">
// // // //                 {t.category === "auto"
// // // //                   ? "🚗"
// // // //                   : t.category === "food"
// // // //                   ? "🍴"
// // // //                   : t.category === "bills"
// // // //                   ? "🧾"
// // // //                   : t.category === "income"
// // // //                   ? "💰"
// // // //                   : "•••"}
// // // //               </div>
// // // //               <div>₹{t.amount}</div>
// // // //               <div>{t.desc}</div>
// // // //               <div>{t.date}</div>
// // // //               <div>{t.mode}</div>
// // // //               <div className="action-buttons">
// // // //                 <button className="edit" onClick={() => handleEdit(t.id)}>✏</button>
// // // //                 <button className="delete" onClick={() => handleDelete(t.id)}>🗑</button>
// // // //                 <button className="copy" onClick={() => handleCopy(t.id)}>📄</button>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Transactions;
