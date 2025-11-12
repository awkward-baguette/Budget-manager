// src/api.js
const BASE_URL = "http://localhost:3000/api";

// ----- Auth -----
export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function register(email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

// ----- Transactions (Income + Expense) -----
export async function getTransactions(token) {
  const res = await fetch(`${BASE_URL}/transactions`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}

export async function addTransaction(token, transactionData) {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(transactionData)
  });
  return res.json();
}

export async function updateTransaction(token, id, update) {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(update)
  });
  return res.json();
}

export async function deleteTransaction(token, id) {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Error deleting transaction");
  return res.json();
}

// ----- Optional helper for category totals -----
export async function getCategoryTotals(token) {
  const transactions = await getTransactions(token);
  const totals = {};
  transactions.forEach(t => {
    if (!totals[t.category]) totals[t.category] = 0;
    totals[t.category] += Number(t.amount);
  });
  return totals;
}
