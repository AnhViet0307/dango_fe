"use client";
import { getAllBrands } from "@/apis/brand.api";
import { getAllCategories } from "@/apis/category.api";
import { getAllProducts, searchProductsByName } from "@/apis/product.api";
import { useAppStore } from "@/stores/useAppStore";
import { useBrandStore } from "@/stores/useBrandStore";
import { useCategoriesStore } from "@/stores/useCategoryStore";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, List, Row, Select, Skeleton, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";

import Dishcard from "./DishCard";
import Topbar from "@/components/Topbar";
import Records from "@p/data/product.json";
import { IDish } from "@/interfaces/IDish";
import { useDishStore } from "@/stores/useDishStore";
import { getAllDish, searchDishByName } from "@/apis/dish.api";
import Banner from "./Banner";





const DishesPage: React.FC = () => {
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const dishes = useDishStore((state) => state.dishes);
   //const [products, setProducts] = useState<IProduct[]>([]);
  const filteredDishes = useDishStore((state) => state.filteredDishes);
  const setFilteredProducts = useDishStore(
    (state) => state.setFilteredProducts
  );
  const setDishes = useDishStore((state) => state.setDishes);
  const setSortBy = useDishStore((state) => state.setSortBy);


  const [searchValue, setSearchValue] = useState<string>("");

  const fetchDishData = useRef<any>();

  



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

  const handleSearchDish = async () => {
    setIsLoading(true);
    try {
      if (searchValue && searchValue !== "") {
        const { data } = await searchDishByName(searchValue);
        setDishes(data);
      } else {
        const { data } = await getAllDish();
        setDishes(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };



  return (
    <div>
      <Topbar />
      <Banner />
      <Row className="mt-16 " gutter={56}>
        
        <Col className="mx-20">
          <Row gutter={16}>
            <Col flex={1}>
              <Input
                size="large"
                prefix={<SearchOutlined />}
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Col>
            <Col className="w-40">
              <Button
                onClick={handleSearchDish}
                type="primary"
                className="w-full bg-primary_blue"
                size="large"
              >
                Search
              </Button>
            </Col>
          </Row>
          <div className="flex items-center justify-between mt-10 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-neutral-900">Dish Results</span>
              <span className="text-xs text-neutral-500">{`${
                filteredDishes ? filteredDishes.length : dishes.length
              } dishes`}</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <span className="text-base text-neutral-500">Sort by</span>
              <Select
                defaultValue="newest"
                className="w-40 p-0 m-0 sorted-by-select"
                bordered={false}
                options={[
                  { value: "last", label: "Last posted" },
                  { value: "newest", label: "Newest posted" },
                ]}
                onChange={(value) => setSortBy(value)}
              />
            </div> */}
          </div>

          {!isLoading ? (
            <List
              grid={{ gutter: 24, column: 4 }}
              pagination={{
                position: "bottom",
                align: "center",
                defaultPageSize: 16,
              }}
              
              dataSource={ filteredDishes ||dishes}
              renderItem={(item) => (
                <List.Item>
                  <Dishcard data={item} />
                </List.Item>
              )}
            />
          ) : (
            <div className="flex justify-center w-full">
              <Spin spinning={isLoading} size="large" />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DishesPage;
