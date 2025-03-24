import { useEffect, useState } from "react";
import { CheckStatus } from "../../components/CheckStatus";
import { User } from "../../types/UserType";
import axios from "axios";
import { Sidebar } from "../../components/Sidebar/sidebar";

const UserPage = () => {
  const [user, setUser] = useState<User>({ id: "", name: "", role: "" });

  const getUser = async () => {
    const response = await axios.get("http://localhost:3000/user/me", {
      withCredentials: true,
    });
    setUser(response.data.user);
  };

  useEffect(() => {
    CheckStatus();
    getUser();
  }, []);

  return (
    <div className="mainpage">
      <Sidebar />
      <div className="content">
        <div>Нікнейм : {user.name}</div>
        <div>Роль: {user.role}</div>
      </div>
    </div>
  );
};

export default UserPage;
