import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { body } from "../../helpers/features/userSlice";
import UserEdit from "../UserEdit/userEdit";

const NameUser = () => {
  const infos = useSelector(body);
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found. Please log in.");
        }

        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserName(data?.user?.email || "Unknown User");
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return open ? (
    <UserEdit closeModal={setOpen} />
  ) : (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {`${userName}!`}
      </h1>
      <button onClick={(e) => { e.preventDefault(); setOpen(true); }} className="edit-button">
        Edit Name
      </button>
    </div>
  );
};

export default NameUser;
