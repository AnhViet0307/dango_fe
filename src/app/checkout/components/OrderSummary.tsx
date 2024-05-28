'use client'
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import OrdersTable from "./OrdersTable";
import { ICart } from "@/interfaces/ICart";

interface IOrderSummaryProps {
  data: ICart[];
}

const OrderSummary: React.FunctionComponent = () => {
  return (
    <div className="">
      <Typography.Title
        level={4}
        style={{ margin: 0, marginBottom: 20 }}
        className="flex items-center gap-2"
      >
        <ShoppingCartOutlined />
        <span className="font-bold">Your order</span>
      </Typography.Title>
      <OrdersTable />
    </div>
  );
};

export default OrderSummary;
