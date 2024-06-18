import {
  AppstoreOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";
//import { useLocation } from "react-router-dom";
import { useRouter } from "next/navigation";
const Sidebar: React.FunctionComponent = () => {
  const navigate = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "/admin/dashboard",
      onClick: () => navigate.push("/admin/dashboard"),
      icon: <AppstoreOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/client-management",
      onClick: () => navigate.push("/admin/clientmanagement"),
      icon: <TeamOutlined />,
      label: "Customers",
    },
    {
      key: "/admin/product-management",
      onClick: () => navigate.push("/admin/productmanagement"),
      icon: <ShoppingCartOutlined />,
      label: "Products",
    },
    {
      key: "/admin/dish-management",
      onClick: () => navigate.push("/admin/dishmanagement"),
      icon: <LikeOutlined />,
      label: "Dishes",
    },
    
    {
      key: "/admin/settings",
      onClick: () => navigate.push("/admin/staffmanagement"),
      icon: <TeamOutlined />,
      label: "Staff",
    },
  ];

  

  return (
    <div className="w-full h-full px-10 bg-slate-20 border-0 border-r-2 border-solid border-neutral-100 py-11">
      <div className="flex mb-7 gap-x-3">
        <div
          className="cursor-pointer"
          onClick={() => navigate.push("/")}
        >
          <img src="/logo2.png" alt="logo" />
        </div>
        
      </div>
      <Menu
        mode="inline"
        // defaultSelectedKeys={["1"]}
        // selectedKeys={[location.pathname]}
        items={items}
        className="!border-none"
      />
    </div>
  );
};

export default Sidebar;
