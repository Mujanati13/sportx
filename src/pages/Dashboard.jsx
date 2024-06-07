import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import MenuPrime from "../components/MenuPrim";
function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const token = localStorage.getItem("jwtToken");
      if (token == null) {
        navigate("/login");
      }
    };
    handleLogout();
  }, []);
  
  return (
    <div className="flex flex-col items-start w-full ">
      <div className="flex items-center justify-between p-4 bg-orange-10 w-full shadow-md">
        <div className="flex items-center space-x-2 ">
          <Avatar icon={<UserOutlined />} />
          <p className="font-normal text-sm">Mohammed Janati</p>
        </div>
        {/* <h1 className="font-medium">Sport X</h1> */}
        {/* <Badge count={5} size="small">
          <BellOutlined className="text-lg" />
        </Badge> */}
      </div>
      <MenuPrime />
    </div>
  );
}

export default Dashboard;
