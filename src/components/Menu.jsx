import React, { useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  PieChartOutlined,
  NotificationOutlined,
  CreditCardOutlined,
  ClockCircleOutlined,
  LayoutOutlined,
  UserOutlined,
  ContactsOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

// Import components
import Etablisiment from "../pages/screens/etablisimment";
import Client from "../pages/screens/client";
import Contract from "../pages/screens/contract";
import Reservation from "../pages/screens/reservation";

const items = [
  {
    key: "sub1",
    label: "Gestion D'Etabblisiment",
    icon: <HomeOutlined />,
    children: [
      { key: "1", label: "Etabblisiment", icon: <HomeOutlined /> },
      { key: "2", label: "Dashboard", icon: <PieChartOutlined /> },
      { key: "3", label: "Notification", icon: <NotificationOutlined /> },
      { key: "4", label: "Transications", icon: <CreditCardOutlined /> },
      { key: "5", label: "Seance", icon: <ClockCircleOutlined /> },
      { key: "6", label: "Salle", icon: <LayoutOutlined /> },
    ],
  },
  {
    key: "sub2",
    label: "Gestion des clients",
    icon: <AppstoreOutlined />,
    children: [
      { key: "7", label: "Clients", icon: <UserOutlined /> },
      { key: "8", label: "Contrats", icon: <ContactsOutlined /> },
      { key: "9", label: "Reservations", icon: <BookOutlined /> },
    ],
  },
  { type: "divider" },
  {
    key: "sub4",
    label: "Gestion du Personnel",
    icon: <UserOutlined />,
    children: [
      { key: "11", label: "Option 9" },
      { key: "12", label: "Option 10" },
      { key: "13", label: "Option 11" },
      { key: "14", label: "Option 12" },
    ],
  },
  {
    key: "grp",
    label: "Group",
    type: "group",
    children: [
      //   { key: "15", label: "Option 13" },
      { icon: <LogoutOutlined />, key: "16", label: "Log out" },
    ],
  },
];


const MenuDashborad = () => {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState(1);
  const [stateOpenKeys, setStateOpenKeys] = useState(['sub1']);

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  
  const onClick = (e) => {
    if (e.key === "16") {
      // Logout logic
      localStorage.removeItem("jwtToken");
      navigate("/");
      console.log("Logging out");
    } else {
      setSelectedComponent(e.key);
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 1:
        return <Etablisiment />;
      case "2":
        return <Dashboard />;
      case "3":
        return <Notification />;
      case "4":
        return <Transications />;
      case "5":
        return <Seance />;
      case "6":
        return <Salle />;
      case "7":
        return <Client />;
      case "8":
        return <Contract />;
      case "9":
        return <Reservation />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex justify-start space-x-2">
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["sub1"]}
        defaultOpenKeys={["sub1"]}
        onOpenChange={onOpenChange}
        mode="inline"
        items={items}
      />
      <div className="w-full">{renderComponent()}</div>
    </div>
  );
};

export default MenuDashborad;
