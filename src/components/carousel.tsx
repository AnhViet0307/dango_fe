"use client";
import React, { useEffect, useRef } from 'react';
import Carousel from '@itseasy21/react-elastic-carousel';
import { Card } from 'antd';
import Records from '@p/data/product.json';
import ProductCard from '@/app/products/components/ProductCard';
import { IProduct } from '@/interfaces/IProduct';
import { useAppStore } from '@/stores/useAppStore';
import { useTenProductStore } from '@/stores/useTenProductStore';
import { getTenProducts, searchProductsByName } from "@/apis/product.api";
const CustomCarousel = () => {
    const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const products = useTenProductStore((state) => state.products);
  const setProducts = useTenProductStore((state) => state.setProducts);
  const fetchProductData = useRef<any>();
useEffect(() => {
    fetchProductData.current = async () => {
      setIsLoading(true);
      try {

        const { data: productData } = await getTenProducts();


        setProducts(productData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProductData.current();
  }, []);



return (
    <Carousel  isRTL={false}  itemsToShow={4}>
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </Carousel>
  );
};

export default CustomCarousel;