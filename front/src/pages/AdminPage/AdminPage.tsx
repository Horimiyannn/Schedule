import { useEffect } from "react";
import { AdminSidebar } from "../../components/AdminSidebar/AdminSidebar";
import { checkAdmin } from "../../components/CheckAdmin";

const AdminPage = () => {
  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <div className="mainpage">
      <AdminSidebar />
      <div
        className="content"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "40px",
        }}
      >
        AdminPage
      </div>
    </div>
  );
};

export default AdminPage;
