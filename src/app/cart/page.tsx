import { Button, Typography } from "antd";
import React from "react";
import CartTable from "./CartTable";
import Topbar from "@/components/Topbar";
const CartPage = () => {
    return (
        <>
            <Topbar />
    <div className="py-12 px-60">
      {/* <Typography.Title level={2} style={{ margin: 0 }}>
        Shopping cart
      </Typography.Title> */}
          
          <h1>Shopping cart</h1>
      <div className="mt-8">
        <CartTable />
      </div>
            </div>
        </>
  );
};

export default CartPage;
