"use client";
import React from 'react';
import Carousel from '@itseasy21/react-elastic-carousel';
import { Card } from 'antd';
import Records from '@p/data/product.json';
import ProductCard from '@/app/products/components/ProductCard';
import { IProduct } from '@/interfaces/IProduct';

const CustomCarousel = () => {
    const products: IProduct[] = Records.slice(2, 11);
return (
    <Carousel  isRTL={false}  itemsToShow={4}>
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </Carousel>
  );
};

export default CustomCarousel;