import { IProduct } from "@/interfaces/IProduct";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Typography, message } from "antd";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { IDish } from "@/interfaces/IDish";

interface IDishCardProps {
  data: IDish;
}

const DishCard: React.FunctionComponent<IDishCardProps> = ({ data }) => {
  const navigate = useRouter();


  const loggedIn = useAuthStore((state) => state.loggedIn);
  const profile = useAuthStore((state) => state.profile);

  const buttonRef = useRef<any>();

  const handleClickCart: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target !== buttonRef.current) {
      navigate.push(`dishes/${data.id}`);
    }
  };

  return (
    <Card
      
      hoverable
      size="default"
      cover={
        <img
          src={data.images[0]}
          alt="product image"
          className="object-cover h-48"
        />
      }
      onClick={handleClickCart}
    >
      <div className="flex flex-col ">
        <div className="flex-1">
          <Typography.Title
            ellipsis={{ rows: 1 }}
            level={4}
            style={{ margin: 0 }}
          >
            {data.name}
          </Typography.Title>
          {/* <Typography.Paragraph
            ellipsis={{ rows: 3 }}
            className="mt-2 mb-4 text-xs leading-5 text-neutral-500"
          >
            {data.description}
          </Typography.Paragraph> */}
        </div>
        {/* <div className="flex items-center justify-between">
          <Typography.Title level={3} style={{ margin: 0, fontWeight: 700 }}>
            {`${new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(JSON.parse(data.price as unknown as string))}`}
            <span className="text-base font-normal text-neutral-700">{` (${data.stock})`}</span>
          </Typography.Title>
          {data.stock > 0 ? (
            <Button
              ref={buttonRef}
              type="primary"
              className="bg-secondary_blue"
              onClick={() => {
                addToCart({ ...data, quantity: 1 });
                message.success("Item is added to cart!");
              }}
            >
              <PlusOutlined />
            </Button>
          ) : (
            <div className="px-3 py-2 text-base font-semibold text-red-400 border-2 border-red-400 border-solid rounded-md">
              Sold out
            </div>
          )}
        </div> */}
      </div>
    </Card>
  );
};

export default DishCard;
