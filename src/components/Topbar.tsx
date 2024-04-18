'use client'
import "@/app/globals.css";
import {
    BarsOutlined,
    LogoutOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
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


import Image from "next/image";


const Topbar: React.FunctionComponent = () => { 
    const navigate = useRouter();
   
    const [open, setOpen] = useState<boolean>(false);
    const profile = useAuthStore((state) => state.profile);
    const cart = useCartStore((state) => state.cart);
    const loggedIn = useAuthStore((state) => state.loggedIn);

    // const items: MenuProps["items"] = [
    //     {
    //       key: "/settings",
    //       icon: <SettingOutlined />,
    //       onClick: () => {
    //         if (profile?.role === Role.ADMIN) {
    //             navigate("/admin/settings");
    //         } else if (profile?.role === Role.DELIVERER) {
    //             navigate("/delivery/settings");
    //         } else {
    //             navigate("/settings");
    //         }
    //         setOpen(!open);
    //     },
    //     label: "Settings",
    //     },
    //     {
    //         key: "logout",
    //         icon: <LogoutOutlined />,
    //         onClick: () => {
    //             setOpen(!open);
    //             logOut();
    //       },
    //       label: "Logout",
    //     },
    //   ];

    return (
        <div className="flex justify-between w-full bg-primary_blue ">
            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate.push("/")}
            >
          
          <Image src={'/Logo.png'} alt={'logo'} width={150} height={50}  className="ml-20p mb-20p" />

            {/* <Typography.Title level={3} style={{ margin: 0 }}>
                Beauty in Bloom
            </Typography.Title> */}
            </div>
        
        <div className="flex items-center gap-4 ">
        <SearchBar/>
            <Badge count={cart.length} size="default">
              <div
                className="text-xl cursor-pointer"
                onClick={() => navigate.push("/cart")}
              >
                <ShoppingCartOutlined />
              </div>
            </Badge>
                
                {loggedIn ?
                    (
                    <div/>
                    // <div>
                    //     <Popover
                    //     content={
                    //         <Menu
                    //         mode="vertical"
                    //         items={items}
                    //         className="!border-none"
                    //         selectedKeys={[""]}
                    //         />
                    //     }
                    //     trigger="click"
                    //     placement="bottomLeft"
                    //     open={open}
                    //     onOpenChange={() => setOpen(!open)}
                    //     >
                    //     <Avatar
                    //         src={profile?.avatar ? profile.avatar : "/assets/avatar.png"}
                    //         size={36}
                    //         className="cursor-pointer"
                    //     />
                    //     </Popover>
                    // </div>
            ) : (
                <>
                <Button
                    type="primary"
                    className="shadow-none bg-neutral-200 text-neutral-700"
                    onClick={() => navigate.push("/auth/sign-up")}
                >
                    Sign up
                </Button>
                <Button
                    type="primary"
                    className="shadow-none bg-primary"
                    onClick={() => navigate.push("/auth/login")}
                >
                    Login
                </Button>
              </>
            )}
          </div>
        </div>
      );
};

export default Topbar