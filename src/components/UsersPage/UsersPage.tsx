import { useEffect } from "react";
import ChatBar from "./ChatBar/ChatBar";
import UserLayout from "./SideBar/UserLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DesktopSidebar from "./SideBar/DesktopSidebar";

const UsersPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/userspage", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        navigate("/");
        toast.error("Invalid Credentials!");
        console.log("Protected Routes Error ", err);
      });
  }, []);
  return (
    <>
      <div className="flex">
        <div className="mr-20">
          <DesktopSidebar />
        </div>

        <div className="bg-slate-500">
          <UserLayout>
            
          </UserLayout>
        </div>

        <div className="relative w-full h-screen">
          <ChatBar />
        </div>
      </div>
    </>
  );
};

export default UsersPage;
