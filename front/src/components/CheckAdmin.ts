import axios from "axios";

export const checkAdmin = async () => {
   try {
     const response = await axios.get("http://localhost:3000/user/me", {
       withCredentials: true,
     });
     if (response.data.authStatus === false) {
       window.location.replace("/auth");
     } else if (response.data.user.role !== "ADMIN") {
       window.location.replace("/");
     }
   } catch (err) {
     console.error(err);
   }
 };