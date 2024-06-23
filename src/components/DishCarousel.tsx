"use client";
import React, { useEffect, useRef } from 'react';
import Carousel from '@itseasy21/react-elastic-carousel';
import { Card } from 'antd';
import Records from '@p/data/product.json';
import DishCard from '@/app/dishes/DishCard';
import { IProduct } from '@/interfaces/IProduct';
import { useAppStore } from '@/stores/useAppStore';
import { useTenProductStore } from '@/stores/useTenProductStore';
import { getTenProducts, searchProductsByName } from "@/apis/product.api";
import { usePopularDishStore } from '@/stores/usePopularDishStore';
import { getPopularDish } from '@/apis/dish.api';
import { getRecommendation } from '@/apis/recomendation.api';
import { useUserRecommendationStore } from '@/stores/useUserRecommendationStore';
import { useAuthStore } from '@/stores/useAuthStore';

const DishCarousel = () => {
    const isLoading = useAppStore((state) => state.isLoading);
    const setIsLoading = useAppStore((state) => state.setIsLoading);
    
  const dishes = usePopularDishStore((state) => state.dishes);
  const setDishes = usePopularDishStore((state) => state.setDishes);

   const recommendations = useUserRecommendationStore((state) => state.recommendations);
  const setRecommendations = useUserRecommendationStore((state) => state.setRecommendations);

  const fetchDishData = useRef<any>();
  const isLoggedIn= useAuthStore((state) => state.loggedIn);
  const user=useAuthStore((state) => state.profile);

  useEffect(() => {
    fetchDishData.current = async () => {
      setIsLoading(true);
      try {
        if (isLoggedIn||user?.likeddish.length!>=1) {
          const { data: recommendationData } = await getRecommendation(user?.id.toString()??"1");
          setRecommendations(recommendationData);
        } else {
          const { data: dishData } = await getPopularDish();
          setDishes(dishData);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchDishData.current();
  }, [isLoggedIn,user?.id]);

  const itemsToShow = isLoggedIn ? recommendations : dishes;


return (
    <Carousel  isRTL={false}  itemsToShow={4}>
      {itemsToShow.map((dish) => (
        <DishCard key={dish.id} data={dish} />
      ))}
    </Carousel>
  );
};

export default DishCarousel;