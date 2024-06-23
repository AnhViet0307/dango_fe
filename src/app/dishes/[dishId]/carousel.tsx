"use client";
import React, { useEffect, useRef } from 'react';
import Carousel from '@itseasy21/react-elastic-carousel';
import ProductCard from '@/app/products/components/ProductCard';
import { useAppStore } from '@/stores/useAppStore';
import { useProductsByIdsStore } from '@/stores/useProductsByIdsStore';
import { getProductById } from "@/apis/product.api";
import { IProduct } from '@/interfaces/IProduct';

interface CustomCarouselProps {
  productIds: string[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ productIds }) => {
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const productsByIds = useProductsByIdsStore((state) => state.productsByIds);
  const setProductsByIds = useProductsByIdsStore((state) => state.setProductsByIds);
  const fetchProductData = useRef<any>();

  useEffect(() => {
    fetchProductData.current = async () => {
      setIsLoading(true);
      try {
        console.log(productIds);
        if (productIds == null) return;

        const fetchedProducts: IProduct[] = [];
        for (const id of productIds) {
          const { data: productData } = await getProductById(id);
          fetchedProducts.push(productData);
        }
        setProductsByIds(fetchedProducts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProductData.current();
  }, [productIds, setIsLoading, setProductsByIds]);

  return (
    <Carousel isRTL={false} itemsToShow={5}>
      {productsByIds.map((product: IProduct) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
