import { useEffect, useState } from "react";
import { checkAdmin } from "../../../components/CheckAdmin";
import { User } from "../../../types/UserType";
import axios from "axios";
import { AdminSidebar } from "../../../components/AdminSidebar/AdminSidebar";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    checkAdmin();
  }, []);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/getallusers"
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="mainpage">
      <AdminSidebar />
      <div className="content">
        {users.map((user) => {
          return (
            <div>
              <div>{user.name}</div>
              <div>{user.role}</div>
              <div>{user.id}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminUsers;
