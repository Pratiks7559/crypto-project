import React from 'react';
import '../../styles/Dashboard.css'
const TransactionsTable = ({ transactions }) => {
  return (
    <div className="transactions-section">
      <h2>Recent Transactions</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.campaign}</td>
              <td>
                {tx.currency === '¥' ? (
                  `${tx.currency} ${tx.amount}`
                ) : (
                  `${tx.cryptoAmount} ${tx.currency}`
                )}
              </td>
              <td>{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;