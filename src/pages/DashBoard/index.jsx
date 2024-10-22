import React from "react";
import "./dashboard.css";
import { initialScrollTo } from "../../constants";
import TextEditor from "../../components/TextEditor";
const Dashboard = () => {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    bio: "",
  });

  console.log(user);

  React.useEffect(() => {
    initialScrollTo(0);
    const userInput = JSON.parse(localStorage.getItem("userInput"));
    if (userInput) {
      const { name, phoneNumber, address, email } = userInput;
      return setUser({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      });
    }
  }, []);

  return (
    <div className="home-container">
      <div className="container">
        <ul>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Phone Number: {user.phoneNumber}</li>
          <li>Address: {user.address}</li>
        </ul>
      </div>
      <TextEditor user={user} setUser={setUser} />
    </div>
  );
};

export default Dashboard;
