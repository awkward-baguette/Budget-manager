import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./Invest.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Investment = () => {
  // ---------- State ----------
  const [investments, setInvestments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    category: "",
    amount: "",
    duration: "",
    date: "",
    ProfitLoss: "",
  });

  // ---------- Add or Update Investment ----------
  const handleSubmit = () => {
    if (!form.category || !form.amount || !form.duration || !form.date)
      return alert("Please fill all fields.");

    const flag = Number(form.ProfitLoss) < 0 ? "loss" : "profit";

    if (editingId) {
      setInvestments((prev) =>
        prev.map((inv) =>
          inv.id === editingId ? { ...form, id: editingId, flag } : inv
        )
      );
      setEditingId(null);
    } else {
      const newInvestment = {
        id: Date.now(),
        ...form,
        flag,
      };
      setInvestments((prev) => [...prev, newInvestment]);
    }

    setForm({ category: "", amount: "", duration: "", date: "", ProfitLoss: "" });
  };

  // ---------- Edit ----------
  const handleEdit = (id) => {
    const inv = investments.find((i) => i.id === id);
    if (inv) {
      setForm(inv);
      setEditingId(id);
    }
  };

  // ---------- Delete ----------
  const handleDelete = (id) => {
    setInvestments((prev) => prev.filter((i) => i.id !== id));
  };

  // ---------- Totals ----------
  const totalInvested = useMemo(
    () => investments.reduce((sum, i) => sum + Number(i.amount), 0),
    [investments]
  );
  const totalProfit = useMemo(
    () => investments.reduce((sum, i) => sum + Number(i.ProfitLoss), 0),
    [investments]
  );

  // ---------- Dynamic Chart Data ----------
  const categoryAverages = useMemo(() => {
    const grouped = {};
    investments.forEach((i) => {
      if (!grouped[i.category]) grouped[i.category] = [];
      grouped[i.category].push(Number(i.amount) + Number(i.ProfitLoss));
    });

    return Object.entries(grouped).map(([cat, arr]) => ({
      label: cat,
      avg: arr.reduce((a, b) => a + b, 0) / arr.length,
    }));
  }, [investments]);

  const data = useMemo(() => {
    const labels = investments.map((i) => i.date || "Unknown Date");

    const datasets = categoryAverages.map((cat, idx) => ({
      label: `${cat.label} (₹)`,
      data: investments
        .filter((i) => i.category === cat.label)
        .map((i) => Number(i.amount) + Number(i.ProfitLoss)),
      borderColor: [
        "rgba(34,197,94,1)",
        "rgba(35,179,179,1)",
        "rgba(221,10,151,0.93)",
        "rgba(255,159,64,1)",
        "rgba(99,102,241,1)",
      ][idx % 5],
      backgroundColor: [
        "rgba(34,197,94,0.2)",
        "rgba(35,179,179,0.2)",
        "rgba(221,10,151,0.2)",
        "rgba(255,159,64,0.2)",
        "rgba(99,102,241,0.2)",
      ][idx % 5],
      fill: false,
      tension: 0.4,
    }));

    return { labels, datasets };
  }, [investments, categoryAverages]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Investment Growth Over Time" },
    },
    scales: {
      y: {
        ticks: { callback: (value) => `₹${value}` },
      },
    },
  };

  // ---------- ROI / CAGR Calculator ----------
  const [invested, setInvested] = useState("");
  const [current, setCurrent] = useState("");
  const [years, setYears] = useState("");
  const [roi, setRoi] = useState(null);
  const [cagr, setCagr] = useState(null);

  const calculate = () => {
    if (!invested || !current || !years) return;
    const i = Number(invested);
    const c = Number(current);
    const y = Number(years);
    const roiVal = ((c - i) / i) * 100;
    const cagrVal = ((c / i) ** (1 / y) - 1) * 100;
    setRoi(roiVal.toFixed(2));
    setCagr(cagrVal.toFixed(2));
  };

  const resetCalc = () => {
    setInvested("");
    setCurrent("");
    setYears("");
    setRoi(null);
    setCagr(null);
  };

  return (
    <div className="main">
      <div className="leftpanel">
        <div className="app">
          {/* ---- Summary ---- */}
          <div className="summary">
            <div className="card income">Total Amount Invested: ₹{totalInvested}</div>
            <div className="card spent">Total Profit: ₹{totalProfit}</div>
          </div>

          {/* ---- Investment List ---- */}
          <div className="transactions">
            <h3>My Investments</h3>
            <div className="transactions-header">
              <div className="start">
                <span>Category</span>
                <span>Amount</span>
                <span>Duration</span>
              </div>
              <div className="end">
                <span>Profit/Loss</span>
                <span>Date</span>
                <span>Actions</span>
              </div>
            </div>

            <div className="transaction-scroll">
              {investments.length === 0 ? (
                <p className="no-data">No investments yet. Add one below!</p>
              ) : (
                investments.map((t) => (
                  <div
                    key={t.id}
                    className={`transaction ${t.flag === "loss" ? "highlight" : ""}`}
                  >
                    <div className="icon">{t.category}</div>
                    <div className="amount">₹{t.amount}</div>
                    <div className="desc">{t.duration}</div>
                    <div className="mode">{t.ProfitLoss}</div>
                    <div className="date">{t.date}</div>
                    <div className="actions">
                      <button onClick={() => handleEdit(t.id)}>✏</button>
                      <button onClick={() => handleDelete(t.id)}>🗑</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ---- Add / Edit Investment Form ---- */}
          <div className="add-box">
            <h3>{editingId ? "Edit Investment" : "Add New Investment"}</h3>
            <input
              type="text"
              placeholder="Category (e.g. Stocks)"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount (₹)"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <input
              type="text"
              placeholder="Duration (e.g. 2 years)"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
            <input
              type="number"
              placeholder="Profit/Loss (₹)"
              value={form.ProfitLoss}
              onChange={(e) => setForm({ ...form, ProfitLoss: e.target.value })}
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <button onClick={handleSubmit}>
              {editingId ? "💾 Update Investment" : "➕ Add Investment"}
            </button>
            {editingId && (
              <button onClick={() => setEditingId(null)}>Cancel Edit</button>
            )}
          </div>
        </div>
      </div>

      {/* ---- Right Panel ---- */}
      <div className="right-panel">
        <div className="chart-box">
          <div className="chart-container">
            <Line data={data} options={options} />
          </div>

          {/* ---- ROI / CAGR ---- */}
          <div className="calculator-box">
            <h2>ROI / CAGR Calculator</h2>
            <div className="calculator-table">
              <div className="row">
                <label>Invested Amount (₹):</label>
                <input
                  type="number"
                  value={invested}
                  onChange={(e) => setInvested(e.target.value)}
                />
              </div>
              <div className="row">
                <label>Current Value (₹):</label>
                <input
                  type="number"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                />
              </div>
              <div className="row">
                <label>Years Held:</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>

              {roi && cagr && (
                <>
                  <div className="row result">
                    <label>ROI:</label>
                    <span>{roi}%</span>
                  </div>
                  <div className="row result">
                    <label>CAGR:</label>
                    <span>{cagr}%</span>
                  </div>
                </>
              )}

              <div className="row buttons">
                <button onClick={calculate}>Calculate</button>
                <button onClick={resetCalc}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;


// import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// } from "chart.js";
// import "./Invest.css";


// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const Investment = () => {
  
//   const data = {
//     labels: [
//       "Jan 2024", "Mar 2024", "May 2024", "Jul 2024",
//       "Sep 2024", "Nov 2024", "Jan 2025", "Mar 2025",
//       "May 2025", "Jul 2025", "Sep 2025"
//     ],
//     datasets: [
//       {
//         label: "Stocks (₹)",
//         data: [1000, 1200, 1400, 1600, 1850, 2100, 2500, 2900, 3300, 3800, 4500].map(Number),
//         fill: false,
//         borderColor: "rgba(34, 197, 94, 1)",
//         backgroundColor: "rgba(34, 197, 94, 0.2)",
//         tension: 0.4,
//         pointBackgroundColor: "rgba(34, 197, 94, 1)",
//         pointRadius: 4,
//       },
//       {
//         label: "Fixed Deposits (₹)",
//         data: [1000, 1020, 1040, 1060, 1850, 2100, 2500, 2900, 3300, 3800, 4500].map(Number),
//         borderColor: "rgba(35, 179, 179, 1)",
//         backgroundColor: "rgba(34, 197, 194, 0.2)",
//         tension: 0.4,
//         pointBackgroundColor: "rgba(35, 179, 179, 1)",
//         pointRadius: 4,
//       },
//       {
//         label: "Crypto",
//         data: [1000, 1250, 1700, 1400, 2100, 2600, 2000, 2800, 3600, 4200, 4800].map(Number),
//         borderColor: "rgba(221, 10, 151, 0.93)",
//         backgroundColor: "rgba(220, 56, 185, 0.2)",
//         fill: false,
//         tension: 0.4,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: {
//         display: true,
//         text: "Investment Growth Over Time",
//         font: { size: 18 },
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => `₹${context.parsed.y.toLocaleString()}`,
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: false,
//         ticks: {
//           callback: (value) => `₹${value}`,
//         },
//       },
//     },
//   };

//   // ROI/CAGR Calculator States
//   const [invested, setInvested] = useState("");
//   const [current, setCurrent] = useState("");
//   const [years, setYears] = useState("");
//   const [roi, setRoi] = useState(null);
//   const [cagr, setCagr] = useState(null);

//   // Calculator functions
//   const calculate = () => {
//     if (!invested || !current || !years) return;

//     // Convert inputs to numbers
//     const investedNum = Number(invested);
//     const currentNum = Number(current);
//     const yearsNum = Number(years);

//     const roiValue = ((currentNum - investedNum) / investedNum) * 100;
//     const cagrValue = ((currentNum / investedNum) ** (1 / yearsNum) - 1) * 100;

//     setRoi(roiValue.toFixed(2));
//     setCagr(cagrValue.toFixed(2));
//   };

//   const reset = () => {
//     setInvested("");
//     setCurrent("");
//     setYears("");
//     setRoi(null);
//     setCagr(null);
//   };

//   const investments = [
//   { id: 1, amount: 350, duration: "2 years", category: "Stocks", date: "27 Oct 2025", ProfitLoss: "150" ,flag:"profit"},
//   { id: 2, amount: 120, duration: "2 years", category: "Fixed Deposit", date: "27 Oct 2025", ProfitLoss: "50",flag:"profit" },
//   { id: 3, amount: 400, duration: "2 years", category: "Crypto", date: "18 Oct 2025", ProfitLoss: "-15",flag:"loss" },
//   { id: 4, amount: 50, duration: "2 years", category: "Recurring Deposit", date: "8 Oct 2025", ProfitLoss: "100" ,flag:"profit" },
//   { id: 5, amount: 9500, duration: "2 years", category: "Fixed Deposit", date: "30 Sept 2025", ProfitLoss: "100" ,flag:"profit" },
//   { id: 6, amount: 200, duration: "2 years", category: "Crypto Currency", date: "27 Oct 2025", ProfitLoss: "100",flag:"profit"  },
// ];
//   return (<div className="main">
//      <div className="leftpanel">
//      <div className="app">
//       <div className="summary">
//         <div className="card income">Total Amount Invested: ₹2000</div>
//         <div className="card spent">Total Profit: ₹1000</div>
//       </div>

//       <div className="transactions">
//         <h3>My Investments</h3>
//         <div className="transactions-header">
//           <div className="start">
//           <span>Category</span>
//           <span>Amount Invested</span>
//           <span>Duration</span>
//           </div>
//           <div className="end">
//           <span>Profit/Loss</span>
//           <span>Date Invested</span>
//           </div>
//         </div>
//         <div className="transaction-scroll">
//         {investments.map((t) => (
//           <div key={t.id} className={`transaction ${t.flag === "loss" ? "highlight" : ""}`}>
//             <div className="icon">{t.category}</div>
//             <div className="amount">₹{t.amount}</div>
//             <div className="desc">{t.duration}</div>
//             <div className="date">{t.date}</div>
//             <div className="mode">{t.ProfitLoss}</div>
//           </div>
//         ))}
//       </div>
//       </div>
      
//       <div className="actions">
//         <button className="add">+ Add</button>
//         <button className="delete">🗑 Delete</button>
//         <button className="edit">✏ Edit</button>
//         <button className="copy">📄 Make copy</button>
//       </div>
//     </div>
//         </div>
//     <div className="right-panel">
//     <div className="chart-box">
//       {/* Chart */}
//       <div className="chart-container">
//         <Line data={data} options={options} />
//       </div>

//       {/* ROI / CAGR Calculator */}
//       <div className="calculator-box">
//         <h2>ROI / CAGR Calculator</h2>
//         <div className="calculator-table">
//           <div className="row">
//             <label>Invested Amount (₹):</label>
//             <input
//               type="number"
//               value={invested}
//               onChange={(e) => setInvested(e.target.value)}
//               placeholder="e.g. 10000"
//             />
//           </div>
//           <div className="row">
//             <label>Current Value (₹):</label>
//             <input
//               type="number"
//               value={current}
//               onChange={(e) => setCurrent(e.target.value)}
//               placeholder="e.g. 12000"
//             />
//           </div>
//           <div className="row">
//             <label>Years Held:</label>
//             <input
//               type="number"
//               value={years}
//               onChange={(e) => setYears(e.target.value)}
//               placeholder="e.g. 2"
//             />
//           </div>

//           {roi !== null && cagr !== null && (
//             <>
//               <div className="row result">
//                 <label>ROI:</label>
//                 <span>{roi}%</span>
//               </div>
//               <div className="row result">
//                 <label>CAGR:</label>
//                 <span>{cagr}%</span>
//               </div>
//             </>
//           )}

//           <div className="row buttons">
//             <button onClick={calculate}>Calculate</button>
//             <button onClick={reset}>Reset</button>
//           </div>
//         </div>
//       </div>
//       </div>
//     </div>
//     </div>

//   );
// };

// export default Investment;


// import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// } from "chart.js";
// import "./Invest.css";


// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const Investment = () => {
  
//   const data = {
//     labels: [
//       "Jan 2024", "Mar 2024", "May 2024", "Jul 2024",
//       "Sep 2024", "Nov 2024", "Jan 2025", "Mar 2025",
//       "May 2025", "Jul 2025", "Sep 2025"
//     ],
//     datasets: [
//       {
//         label: "Stocks (₹)",
//         data: [1000, 1200, 1400, 1600, 1850, 2100, 2500, 2900, 3300, 3800, 4500].map(Number),
//         fill: false,
//         borderColor: "rgba(34, 197, 94, 1)",
//         backgroundColor: "rgba(34, 197, 94, 0.2)",
//         tension: 0.4,
//         pointBackgroundColor: "rgba(34, 197, 94, 1)",
//         pointRadius: 4,
//       },
//       {
//         label: "Fixed Deposits (₹)",
//         data: [1000, 1020, 1040, 1060, 1850, 2100, 2500, 2900, 3300, 3800, 4500].map(Number),
//         borderColor: "rgba(35, 179, 179, 1)",
//         backgroundColor: "rgba(34, 197, 194, 0.2)",
//         tension: 0.4,
//         pointBackgroundColor: "rgba(35, 179, 179, 1)",
//         pointRadius: 4,
//       },
//       {
//         label: "Crypto",
//         data: [1000, 1250, 1700, 1400, 2100, 2600, 2000, 2800, 3600, 4200, 4800].map(Number),
//         borderColor: "rgba(221, 10, 151, 0.93)",
//         backgroundColor: "rgba(220, 56, 185, 0.2)",
//         fill: false,
//         tension: 0.4,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: {
//         display: true,
//         text: "Investment Growth Over Time",
//         font: { size: 18 },
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => `₹${context.parsed.y.toLocaleString()}`,
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: false,
//         ticks: {
//           callback: (value) => `₹${value}`,
//         },
//       },
//     },
//   };

//   // ROI/CAGR Calculator States
//   const [invested, setInvested] = useState("");
//   const [current, setCurrent] = useState("");
//   const [years, setYears] = useState("");
//   const [roi, setRoi] = useState(null);
//   const [cagr, setCagr] = useState(null);

//   // Calculator functions
//   const calculate = () => {
//     if (!invested || !current || !years) return;

//     // Convert inputs to numbers
//     const investedNum = Number(invested);
//     const currentNum = Number(current);
//     const yearsNum = Number(years);

//     const roiValue = ((currentNum - investedNum) / investedNum) * 100;
//     const cagrValue = ((currentNum / investedNum) ** (1 / yearsNum) - 1) * 100;

//     setRoi(roiValue.toFixed(2));
//     setCagr(cagrValue.toFixed(2));
//   };

//   const reset = () => {
//     setInvested("");
//     setCurrent("");
//     setYears("");
//     setRoi(null);
//     setCagr(null);
//   };

//   const investments = [
//   { id: 1, amount: 350, duration: "2 years", category: "Stocks", date: "27 Oct 2025", ProfitLoss: "150" ,flag:"profit"},
//   { id: 2, amount: 120, duration: "2 years", category: "Fixed Deposit", date: "27 Oct 2025", ProfitLoss: "50",flag:"profit" },
//   { id: 3, amount: 400, duration: "2 years", category: "Crypto", date: "18 Oct 2025", ProfitLoss: "-15",flag:"loss" },
//   { id: 4, amount: 50, duration: "2 years", category: "Recurring Deposit", date: "8 Oct 2025", ProfitLoss: "100" ,flag:"profit" },
//   { id: 5, amount: 9500, duration: "2 years", category: "Fixed Deposit", date: "30 Sept 2025", ProfitLoss: "100" ,flag:"profit" },
//   { id: 6, amount: 200, duration: "2 years", category: "Crypto Currency", date: "27 Oct 2025", ProfitLoss: "100",flag:"profit"  },
// ];
//   return (<div className="main">
//      <div className="leftpanel">
//      <div className="app">
//       <div className="summary">
//         <div className="card income">Total Amount Invested: ₹2000</div>
//         <div className="card spent">Total Profit: ₹1000</div>
//       </div>

//       <div className="transactions">
//         <h3>My Investments</h3>
//         <div className="transactions-header">
//           <div className="start">
//           <span>Category</span>
//           <span>Amount Invested</span>
//           <span>Duration</span>
//           </div>
//           <div className="end">
//           <span>Profit/Loss</span>
//           <span>Date Invested</span>
//           </div>
//         </div>
//         <div className="transaction-scroll">
//         {investments.map((t) => (
//           <div key={t.id} className={`transaction ${t.flag === "loss" ? "highlight" : ""}`}>
//             <div className="icon">{t.category}</div>
//             <div className="amount">₹{t.amount}</div>
//             <div className="desc">{t.duration}</div>
//             <div className="date">{t.date}</div>
//             <div className="mode">{t.ProfitLoss}</div>
//           </div>
//         ))}
//       </div>
//       </div>
      
//       <div className="actions">
//         <button className="add">+ Add</button>
//         <button className="delete">🗑 Delete</button>
//         <button className="edit">✏ Edit</button>
//         <button className="copy">📄 Make copy</button>
//       </div>
//     </div>
//         </div>
//     <div className="right-panel">
//     <div className="chart-box">
//       {/* Chart */}
//       <div className="chart-container">
//         <Line data={data} options={options} />
//       </div>

//       {/* ROI / CAGR Calculator */}
//       <div className="calculator-box">
//         <h2>ROI / CAGR Calculator</h2>
//         <div className="calculator-table">
//           <div className="row">
//             <label>Invested Amount (₹):</label>
//             <input
//               type="number"
//               value={invested}
//               onChange={(e) => setInvested(e.target.value)}
//               placeholder="e.g. 10000"
//             />
//           </div>
//           <div className="row">
//             <label>Current Value (₹):</label>
//             <input
//               type="number"
//               value={current}
//               onChange={(e) => setCurrent(e.target.value)}
//               placeholder="e.g. 12000"
//             />
//           </div>
//           <div className="row">
//             <label>Years Held:</label>
//             <input
//               type="number"
//               value={years}
//               onChange={(e) => setYears(e.target.value)}
//               placeholder="e.g. 2"
//             />
//           </div>

//           {roi !== null && cagr !== null && (
//             <>
//               <div className="row result">
//                 <label>ROI:</label>
//                 <span>{roi}%</span>
//               </div>
//               <div className="row result">
//                 <label>CAGR:</label>
//                 <span>{cagr}%</span>
//               </div>
//             </>
//           )}

//           <div className="row buttons">
//             <button onClick={calculate}>Calculate</button>
//             <button onClick={reset}>Reset</button>
//           </div>
//         </div>
//       </div>
//       </div>
//     </div>
//     </div>

//   );
// };

// export default Investment;

