'use client'
import "@/app/globals.css";

import {
  AppstoreOutlined,
    BarsOutlined,
    LogoutOutlined,
    SettingOutlined,
  ShoppingCartOutlined,
    
    UserOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Badge,
    Button,
    
    Menu,
    MenuProps,
    Popover,
    Typography,
    } from "antd";
import { Role } from "@/constants/role";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import SearchBar from "./SearchBar"
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import { logOut } from "@/utils/auth";


import Image from "next/image";


const Topbar: React.FunctionComponent = () => { 
    const navigate = useRouter();
  //const { user, error, isLoading } = useUser();
    
    
    const [open, setOpen] = useState<boolean>(false);
    const profile = useAuthStore((state) => state.profile);
    const cart = useCartStore((state) => state.cart);
    const loggedIn = useAuthStore((state) => state.loggedIn);

    const items: MenuProps["items"] = [
        {
          key: "profile",
          icon: <UserOutlined />,
          onClick: () => {
            // if (profile?.role === Role.ADMIN) {
            //     navigate.push("/admin/settings");
            // } else if (profile?.role === Role.STAFF) {
            //     navigate.push("/delivery/settings");
            // } else {
                navigate.push("/profile");
            // }
            setOpen(!open);
        },
        label: "Profile",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            onClick: () => {
                setOpen(!open);
              logOut();
              navigate.push("/");
          },
          label: "Logout",
        },
      ];
    if (profile?.role === Role.CUSTOMER) {
        items.unshift({
          key: "/orders",
          icon: <BarsOutlined />,
          onClick: () => {
            navigate.push("/orders");
            setOpen(!open);
          },
          label: "Orders",
        });
  }
  if (profile?.role === Role.STAFF) {
        items.unshift({
          key: "/process",
          icon: <BarsOutlined />,
          onClick: () => {
            navigate.push("/process");
            setOpen(!open);
          },
          label: "Process orders",
        });
  }
  if (profile?.role === Role.ADMIN) {
        items.unshift({
          key: "/dashboard",
          icon: <AppstoreOutlined />,
          onClick: () => {
            navigate.push("/admin/dashboard");
            setOpen(!open);
          },
          label: "Dashboard",
        });
      }
    return (
        <div className="flex justify-between w-full bg-primary_blue px-10 py-2" >
            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate.push("/")}
            >
          
          <Image src={'/Logo.png'} alt={'logo'} width={150} height={50}  className="ml-20p mb-20p" />

           
            </div>
        
        <div className="flex items-center gap-4 ">
          {/* s<SearchBar/> */}
          <Button
                    type="text"
                    className="shadow-none text-white mr-5 text-base align-middle font-bold text-center outline outline-primary_yellow"
                    onClick={() => navigate.push("/products")}
                >
                    Products
                </Button>
            <Badge count={cart.length} size="default">
              <div
                className="text-xl cursor-pointer"
                onClick={() => navigate.push("/cart")}
              >
                <ShoppingCartOutlined className="text-white font-bold w-8 h-auto" />
              </div>
            </Badge>
                
                {loggedIn ?
                    (
                    
                    <div>
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
                            src={profile?.avatar ? profile.avatar : "/assets/avatar.png"}
                            size={36}
                            className="cursor-pointer"
                        />
                        </Popover>
                    </div>
            ) : (
                <>
                <Button
                    type="primary"
                    className="shadow-none text-base bg-white hover:bg-secondary_blue text-neutral-700 font-medium"
                    onClick={() => navigate.push("/auth/sign-up")}
                >
                   {/* <a href="/api/auth/signup">Sign up</a> */}Sign-up
                </Button>
                <Button
                    type="primary"
                    className=" shadow-none text-base font-medium bg-secondary_blue"
                    onClick={() => navigate.push("/auth/login")}
                >
                    {/* <a href="/api/auth/login">Login</a> */}Login
                </Button>
              </>
            )}
          </div>
        </div>
      );
};

export default Topbar