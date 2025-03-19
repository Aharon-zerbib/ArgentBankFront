import React from "react";
import "../scss/Containeraccount.scss";
import info from "../info.json";

const Containeraccount = () => {
  return (
    <div>
      {info.transactions.map((transaction) => (
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">{transaction.title}</h3>
            <p className="account-amount">${transaction.montant}</p>
            <p className="account-amount-description">
              {transaction.available}
            </p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Containeraccount;
