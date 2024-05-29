'use client'
import { useAuthStore } from "@/stores/useAuthStore";
import { logOut } from "@/utils/auth";
import {
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, MenuProps, Popover } from "antd";
import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
const AdminHeader: React.FunctionComponent = () => {
  const navigate = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const profile = useAuthStore((state) => state.profile);

  const items: MenuProps["items"] = [
    {
      key: "/profile",
      icon: <UserOutlined />,
      onClick: () => {
        navigate.push("/profile");
        setOpen(!open);
      },
      label: "Profile",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        logOut();
        navigate.push("/");
        setOpen(!open);
      },
      label: "Logout",
    },
  ];

  return (
    <div className="bg-primary_blue w-full items-end text-right px-16 ">
      <Popover
        content={
          <Menu
            mode="vertical"
            items={items}
            className="!border-none"
            selectedKeys={[""]}
          />
        }
        trigger="click"
        placement="bottomLeft"
        open={open}
        onOpenChange={() => setOpen(!open)}
      >
        <Avatar
          src={profile?.avatar ? profile.avatar : "https://picsum.photos/200"}
          size={36}
          className="cursor-pointer"
        />
      </Popover>
    </div>
  );
};

export default AdminHeader;
