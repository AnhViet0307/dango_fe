'use client'
import { getAllBrands } from "@/apis/brand.api";
import { getAllCategories } from "@/apis/category.api";
import { getAllProducts } from "@/apis/product.api";
import { useAppStore } from "@/stores/useAppStore";
import { useBrandStore } from "@/stores/useBrandStore";
import { useCategoriesStore } from "@/stores/useCategoryStore";
import { useProductStore } from "@/stores/useProductStore";
import { Button, Col, Row, Spin, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import AddProductModal from "./AddDishModal";
import DishTable from "./DishTable";

import Sidebar from "../AdminSidebar";
import AdminHeader from "../AdminHeader";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { getAllDish } from "@/apis/dish.api";
import { useDishStore } from "@/stores/useDishStore";

const DishManagementPage: React.FunctionComponent = () => {
  const [show, setShow] = useState<boolean>(false);
  const fetchDishData = useRef<any>(null);

  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const products = useDishStore((state) => state.dishes);
  const setDishes = useDishStore((state) => state.setDishes);


  useEffect(() => {
    fetchDishData.current = async () => {
      setIsLoading(true);
      try {
        const { data: dishData } = await getAllDish();


        setDishes(dishData);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchDishData.current();
  }, []);

    return (
      <AdminProtectedRoute>
      <div>
        <Row className="mb-4">
          <AdminHeader/>
        </Row >
        <Row className="h-full">
  <Col className="ml-4 top-0 !w-64 !max-w-full h-screen ">
                <Sidebar/>
        </Col>
        <Col className="w-3/4">
          <div className="p-8">
            {/* TITlE */}
            <Row justify={"space-between"} align={"middle"} className="mb-10">
              <Col>
                <Typography.Title level={2} style={{ margin: 0 }}>
                  Dish management
                </Typography.Title>
              </Col>
              <Col>
                <Button
                  type="primary"
                  className="bg-primary_blue"
                    size="large"
                    
                  onClick={() => setShow(true)}
                >
                  Add new Dish
                </Button>
              </Col>
            </Row>

            

            {/* TABLE */}
            {!isLoading ? (
              <DishTable  />
            ) : (
              <div className="flex justify-center w-full">
                <Spin spinning={isLoading} size="large" />
              </div>
            )}

            <AddProductModal show={show} setShow={setShow} />
                </div>
        </Col>
        </Row>
            
</div>
     </AdminProtectedRoute> 
  );
};

export default DishManagementPage;
