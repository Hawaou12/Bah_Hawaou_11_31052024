// src/pages/User.js
import Account from "../../components/accounts/account";
import UserName from "../../containers/UserName/userName"
import "./user.css";
const accounts = [
 {
   id: 1,
   title: "Argent Bank Checking (x8349)",
   amount: "$2,082.79",
   description:"Available Balance",
 },
 {
   id: 2,
   title: "Argent Bank Savings (x6712)",
   amount: "$10,928.42",
   description:"Available Balance",
 },
 {
   id: 3,
   title: "Argent Bank Credit Card (x8349)",
   amount: "$184.30",
   description:"Current Balance",
 },
];
const User = () => {
 return (
   <div className="div">
   <main className="main bg-dark">
<UserName/>
{accounts.map(account=>( 
<Account title={account.title} amount={account.amount} description={account.description} key={account.id}/>))}
   </main>
   </div>
 );
};

export default User;