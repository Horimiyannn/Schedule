import axios from "axios";

export const CheckStatus = async () => {
   try {
     const response = await axios.get("http://localhost:3000/user/me", {
       withCredentials: true,
     });
     if (response.data.authStatus === false) {
       window.location.replace("/auth");
     }
     return response.data.user
   } catch (err) {
     console.error(err);
   }
 };

 