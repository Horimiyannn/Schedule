import { Link } from "react-router-dom";
import axios from "axios";

export const AdminSidebar = () => {
  const logout = async () =>{
    await axios.post("http://localhost:3000/user/logout","", {
      withCredentials: true,
    })
  }

  return (
    <nav className="sidebar">
      <Link to="/admin" className="link">Головна</Link>
      <Link to="/auth" className="link" onClick={logout}>Вийти</Link>
      <Link to ="/user" className="link">Профіль</Link>
      <Link to="/admin" className="link">Admin</Link>
    </nav>
  );
};
