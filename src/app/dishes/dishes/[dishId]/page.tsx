"use client";
import Topbar from "@/components/Topbar";


import CustomCarousel from "./carousel";
import { getDishById } from "@/apis/dish.api";
import { useCartStore } from "@/stores/useCartStore";
import { useAppStore } from "@/stores/useAppStore";
import { useAuthStore } from "@/stores/useAuthStore";


import React, { useEffect, useState, useRef } from "react";
import { useRouter,usePathname, useParams } from "next/navigation";
import { IDish } from "@/interfaces/IDish";




import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  RadioChangeEvent,
  Row,
  Skeleton,
  Spin,
  Typography,
  message,
} from "antd";
import { useDishStore } from "@/stores/useDishStore";



const DishDetail: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
const params: any = useParams();
const dishId: string | number = JSON.parse(params.dishId);

  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const dish = useDishStore((state) => state.dish);
  const setDish = useDishStore((state) => state.setDish);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const [previewImage, setPreviewImage] = useState<string>();

  const fetchDishData = useRef<any>();

  useEffect(() => {
    fetchDishData.current = async () => {
      setIsLoading(true);
      try {
        const { data: dishData } = await getDishById(dishId);
        setDish(dishData);
        setPreviewImage(dishData.images[0]);
        //if (dishData.inventory === 0) setQuantity(0);
        console.log(dish);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        
      }
    };
    fetchDishData.current();
  }, []);

  // colors
  const colors = ["#FDE5FFFF", "#1599ae"];
  const [color, setColor] = useState<string>();

  // type
  const [type, setType] = useState<string>();
  const handleTypeChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };




  return (
    <>
      <div className="  ">
        <Topbar/>
      </div>
      

      <div className="px-32 py-10">
      <Typography.Title style={{ margin: 0 }}>{dish?.name}</Typography.Title>
      {/* PRODUCT INFORMATION */}
      <Row className="mt-6 " gutter={40}>
        {/* IMAGES */}
        <Col span={12}>
          <div className="w-full h-[435px]">
            {isLoading ? (
              <Skeleton.Image active={isLoading} className="w-full h-full" />
            ) : (
              <img
                src={previewImage} alt=""
                className="object-cover w-full h-full rounded-md border-2  border-slate-350"
              />
            )}
          </div>
          <Row gutter={34} justify={"start"} className="mt-8 h-36">
            {dish?.images.map((image, index) => (
              // eslint-disable-next-line react/jsx-key
              <Col span={8} className="h-full">
                <img
                  key={index}
                  src={image}
                  alt="moremimage"
                  className={`object-cover w-full h-full rounded-md cursor-pointer border-2  border-slate-350 ${
                    image === previewImage ? "opacity-100" : "opacity-75"
                  }`}
                  onMouseEnter={() => setPreviewImage(image)}
                />
              </Col>
            ))}
          </Row>
        </Col>

        {/* INFO */}
        <Col span={12}>
          {/* PRODUCT DESCRIPTION */}
          <Typography.Title level={3} style={{ margin: 0 }}>
            Dish description
          </Typography.Title>
          <p className="mb-20 text-lg leading-6 text-neutral-500">
            {dish?.description}
          </p>

          

          

          {/* PAYMENT BUTTON GROUP */}
          
        </Col>
      </Row>
      <Row className="mt-4" gutter={40}>
           <Col  className="text-center mb-2 text-3xl mt-5 font-semibold">
          <span>Recommended Products</span>
        </Col>
        <Col >
        {/* <CustomCarousel productIds={dish?.productId||[]} /> */}
        </Col>
      </Row>
    
    </div>

      
      
    </>


    
    
  );
}
export default DishDetail;
