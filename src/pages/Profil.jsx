import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/userSlice";
import NavBar from "../components/Nav";
import ContainerHP from "../components/ContainerHP";
import "../scss/Profil.scss";
import info from "../info.json";
import "../scss/Containeraccount.scss";

const Profil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleEditClick = () => {
    setUsername(user?.body?.userName || "");
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    dispatch(updateUserProfile({ userName: username }))
      
      .then(() => {
        setIsEditing(false); 
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
      });
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
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label>First Name: </label>
                  <input type="text" value={user?.body?.firstName || ""} disabled />
                </div>
                <div>
                  <label>Last Name: </label>
                  <input type="text" value={user?.body?.lastName || ""} disabled />
                </div>
              </div>
              <div className="container-button">
                <button type="button" onClick={handleSaveClick}>
                  Save
                </button>
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
                {user?.body?.userName || "User"}!
              </h1>
              <button className="edit-button" onClick={handleEditClick}>
                Edit Name
              </button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <ContainerHP>
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
        </ContainerHP>
      </main>
    </>
  );
};

export default Profil;
