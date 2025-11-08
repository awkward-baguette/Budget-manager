import './Home.css'
import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { Line} from "react-chartjs-2";

function Pieing(){
    const [activeIndex, setActiveIndex] = useState(-1);

    const data = [
        { name: 'Geeksforgeeks', students: 400 },
        { name: 'Technical scripter', students: 700 },
        { name: 'Geek-i-knack', students: 200 },
        { name: 'Geek-o-mania', students: 1000 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <div className="thepie">
        <PieChart width={160} height={160}>
            <Pie
                activeIndex={activeIndex}
                data={data}
                dataKey="students"
                outerRadius="100%"
                fill="green"
                onMouseEnter={onPieEnter}
                style={{ cursor: 'pointer', outline: 'none' }} // Ensure no outline on focus
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>  
        </div>
    );
}

function Income(){
    return <div className="incoming"><p><b>Income: 5000</b></p></div>
}

function Budget(props){
    return (
    <div className="budgeting">
    <p><b>{props.name}</b></p>
    </div>
    );
}

function Recents(){
    const transactions = [
  { id: 1, amount: 350, desc: "Auto", category: "auto", date: "27 Oct 2025", mode: "Cash" },
  { id: 2, amount: 120, desc: "Metro", category: "auto", date: "27 Oct 2025", mode: "UPI" },
  { id: 3, amount: 400, desc: "Ritu payed back", category: "other", date: "18 Oct 2025", mode: "Cash" },
  { id: 4, amount: 50, desc: "Masala Puri", category: "food", date: "8 Oct 2025", mode: "Cash" },
  { id: 5, amount: 9500, desc: "Rent", category: "bills", date: "30 Sept 2025", mode: "Cash" },
  { id: 6, amount: 200, desc: "Parking", category: "auto", date: "27 Oct 2025", mode: "Cash" },
];
    return(
    <div className="recents">
      <div className="exp"><b>Recent expenditure</b></div>
        <div className="recents-header">
          <div className="first">
          <span>Category</span>
          <span>Cost</span>
          <span>Desc</span>
          </div>

          <div className="last">
          <span>Date</span>
          <span>Mode of Payment</span>
          </div>
        </div>

        <div className="recent-scroll">
        {transactions.map((t) => (
          <div key={t.id} className={`recent ${t.category === "other" ? "highlight" : ""}`}>
            <div className="icon">{t.category === "auto" ? "🚗" : t.category === "food" ? "🍴" : t.category === "bills" ? "🧾" : "•••"}</div>
            <div className="amount">₹{t.amount}</div>
            <div className="desc">{t.desc}</div>
            <div className="date">{t.date}</div>
            <div className="mode">{t.mode}</div>
          </div>
        ))}
        </div>
    </div>
    );
}

function StockChart(){
    const data = {
    labels: [
      "Jan 2024", "Mar 2024", "May 2024", "Jul 2024",
      "Sep 2024", "Nov 2024", "Jan 2025", "Mar 2025",
      "May 2025", "Jul 2025", "Sep 2025"
    ],
    datasets: [
      {
        label: "Stocks (₹)",
        data: [1000, 1200, 1400, 1600, 1850, 2100, 2500, 2900, 3300, 3800, 4500].map(Number),
        fill: false,
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "rgba(34, 197, 94, 1)",
        pointRadius: 4,
      },
      {
        label: "Fixed Deposits (₹)",
        data: [1000, 1020, 1040, 1060, 1850, 2100, 2500, 2900, 3300, 3800, 4500].map(Number),
        borderColor: "rgba(35, 179, 179, 1)",
        backgroundColor: "rgba(34, 197, 194, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "rgba(35, 179, 179, 1)",
        pointRadius: 4,
      },
      {
        label: "Crypto",
        data: [1000, 1250, 1700, 1400, 2100, 2600, 2000, 2800, 3600, 4200, 4800].map(Number),
        borderColor: "rgba(221, 10, 151, 0.93)",
        backgroundColor: "rgba(220, 56, 185, 0.2)",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Investment Growth Over Time",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
    },
  };
    return( <div className="prechart-container">
            <Line data={data} options={options} />
          </div>
    );
}

function Home(){
    return(
        <div className="all">
        <div className="top">
        <Pieing/>
        <div className="info">
        <Income/>
        <div className="budget1">
        <Budget name="Budget: 
        4000"/>
        <Budget name="Spent: 
        1000"/>
        </div>
        </div>
        </div>
        <div className="bottom">
        <Recents/>
        <StockChart/>
        </div>
        </div>
    )
}

export default Home;
