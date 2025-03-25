import { useState } from "react";
import NavBar from "../components/Nav";
import Containeraccount from "../components/Containeraccount";
import "../scss/Profil.scss";
import info from "../info.json";

const Profil = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <NavBar />
      <main className="main bg-dark">
        <div className="header-account">
          {isEditing ? (
            <>
              <h1>Edit User info</h1>
              <div className="container-input">
                <div>
                  <label>Username: </label>
                  <input type="text" />
                </div>
                <div>
                  <label>First Name: </label>
                  <input type="text" />
                </div>
                <div>
                  <label>Last Name: </label>
                  <input type="text" />
                </div>
              </div>
              <div className="container-button">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>
                Welcome back
                <br />
              </h1>
              <button className="edit-button" onClick={handleEditClick}>
                Edit Name
              </button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Containeraccount>
          {info.transactions.map((transaction) => (
            <section key={transaction.id} className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">{transaction.title}</h3>
                <p className="account-amount">${transaction.montant}</p>
                <p className="account-amount-description">
                  {transaction.available}
                </p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
          ))}
        </Containeraccount>
      </main>
    </>
  );
};

export default Profil;
