"use client";
import Topbar from "@/components/Topbar";


import CustomCarousel from "./carousel";
import { getDishById, updateDishById, updateScore, updateScore2 } from "@/apis/dish.api";

import { useCartStore } from "@/stores/useCartStore";
import { useAppStore } from "@/stores/useAppStore";
import { useAuthStore } from "@/stores/useAuthStore";


import React, { useEffect, useState, useRef } from "react";
import { useRouter,usePathname, useParams } from "next/navigation";
import { IDish } from "@/interfaces/IDish";

import LikeRadioButton from "./LikeButton";


import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  RadioChangeEvent,
  Row,
  Skeleton,
  Spin,
  Typography,
  message,
  notification,
} from "antd";
import { useDishStore } from "@/stores/useDishStore";
import { updateUserLike } from "@/apis/user.api";



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
  const user=  useAuthStore((state) => state.profile);
   const [like, setLike] = useState<boolean>(false);

  const [recommendedProductIds, setRecommendedProductIds] = useState<string[]>([]);
  
  const [previewImage, setPreviewImage] = useState<string>();
 
  
        
  const fetchDishData = useRef<any>();
  console.log(user?.likeddish);
  useEffect(() => {
 
    fetchDishData.current = async () => {
      setIsLoading(true);
      try {
          //get like state
        
        const { data: dishData } = await getDishById(dishId);
        setDish(dishData);
        setPreviewImage(dishData.images[0]);
        
          if (user?.likeddish.includes(dishData.id.toString()))
          {
            console.log("LIke is true");
            setLike(true);
          } else {
            console.log("LIke is false");
            setLike(false);
          }
        
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
  const [list, setList] = useState<boolean>();
  // type
  const [type, setType] = useState<string>();
  const handleTypeChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };
 if (!dish) {
      return <div>Loading...</div>;
  }
  
  const handleLikeChange = async (values: any) => { 
    setLike(!like); 
    const LB = document.getElementById('likebtn') as HTMLDivElement;
    if (!like)
    {
      LB.style.pointerEvents = 'none';
      }
    let updatedscore: number = like ? dish?.score -1 : dish?.score + 1;
    console.log("aaaaa ",  dish?.score)
    console.log("bbbbb ",updatedscore)
      const { score } = values;
    
    
    let payload={}
    
    setIsLoading(true);


    console.log("LIKE",like);

      try {
        if (!like) {
          await updateScore(dishId); updatedscore = updatedscore + 1;
          let a = user?.likeddish ?? [];
          a.push(dish.id.toString());
          const aa = a.map((item) => ({ value: item.toString() }))
          payload = {
            ...payload,likeddish:a
          }

          console.log("user: ", user);
          console.log("asdfsqfgwedg: ", user?.likeddish);
          const gg: string[] = ["1"];
          await updateUserLike(payload);
          
        
        } 

        router.refresh();
        setIsLoading(false);
        
      
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
        notification.error({
          message: error.message,
        });
      }
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
            <Row gutter={34} className="mt-4">
              
              <Typography.Title level={4} style={{ margin: 0 }}>Category:<span className="font-normal ml-2" >{dish?.category}</span></Typography.Title>
            </Row>
        </Col>

        {/* INFO */}
          <Col span={12}>
            
          {/* PRODUCT DESCRIPTION */}
          <Row><Typography.Title level={2} style={{ margin: 0 }}>
            Dish Description
            </Typography.Title>
             {loggedIn ? (
                <Badge  className="align-middle items-center " size="default">
                  <div id="likebtn"
                    onClick={handleLikeChange}
                className="text-xl cursor-pointer"
                  >
                    {like ?
                      (<LikeFilled className="text-primary_yellow font-bold ml-2 text-4xl" />)
                      : (
                    <LikeOutlined className="text-primary_yellow  font-bold  ml-2 text-4xl " />
                      )}
                
              </div>
            </Badge>
              ) : (
                <></>
              )}
            </Row>
          <p className="mb-20 text-lg leading-6 text-neutral-500">
            {dish?.description}
          </p>

          

          

          
          
        </Col>
        </Row>
        
      <Row className="mt-4" gutter={40}>
           <Col  className="text-center mb-2 text-3xl mt-5 font-semibold">
          <span>Recommended Products</span>
          </Col>
      </Row>
      
        <Row className="mt-4 mx-32" gutter={40}>
          <Col span={16}>
        <CustomCarousel productIds={dish.productid} />
          </Col>
        </Row>
      
    
    </div>

      
      
    </>


    
    
  );
}
export default DishDetail;
