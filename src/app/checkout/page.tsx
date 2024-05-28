'use client'
import { Button, DatePicker, Typography, Col, Row, Form, notification } from 'antd';
import React, { useEffect, useState } from "react";
import Topbar from '@/components/Topbar';
import MainBanner from '@/components/MainBanner';
import CustomCarousel from '@/components/carousel';
import Head from 'next/head';
import DeliveryInformation from '@/app/checkout/components/DeliveryInformationForm';
import OrderSum from './components/OrderSum';
import OrderSummary from './components/OrderSummary';
import OrderForm from '@/app/checkout/components/OrderForm';
import { useRouter } from 'next/navigation';
import { ICart } from '@/interfaces/ICart';
import { addOrder } from "@/apis/order.api";
import { useAppStore } from "@/stores/useAppStore";
import { useCartStore } from "@/stores/useCartStore";
import { useLocation } from 'react-router-dom';

export default function Page() {

const navigate = useRouter();
  const [data, setData] = useState<ICart[]>([]);
  //const { state } = useLocation();
  const [form] = Form.useForm();
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const removeFromCart = useCartStore((state) => state.removeFromCart); 
  
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const orders = query.get('orders');
    if (orders) {
      setData(JSON.parse(decodeURIComponent(orders)));
    }
  }, []);


  const handlePay = async () => {
    setIsLoading(true);
    try {
       await form.validateFields(); // Validate the form fields
      const formData = form.getFieldsValue(); // Get form data
      const aaa: ICart[] = data; // Use data from state (or any other source)
      
      const products = aaa.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      const payload = { ...formData, products }; // Combine form data and products
      const response = await addOrder(payload);
      
      // Remove items from the cart
      aaa.forEach((item) => {
        removeFromCart(item.id);
      });
      
      setIsLoading(false);

      // Serialize the data for navigation
      const serializedData = encodeURIComponent(JSON.stringify({ aaa, ...formData, responseData: response.data }));
      
      // Navigate to the confirmation page with the combined data
      navigate.push(`/checkout/confirmation?data=${serializedData}`);


    } catch (error: any) {
      setIsLoading(false);
      if (!error.message) {
        const { errorFields } = error;
        errorFields.forEach((item: any) => {
          notification.error({
            message: item.errors[0],
          });
        });
      } else {
        notification.error({
          message: error.message,
        });
      }
    //   const serializedData = encodeURIComponent(JSON.stringify({ status: "failed" }));
    // navigate.push(`/checkout/confirmation?data=${serializedData}`);
    }
  };



  return (
    <div >
      <Topbar />
      <div className='px-64 mt-16 align-auto'>
        <DeliveryInformation form={form} />
        <div className="mt-5 p-4 border border-gray-300 rounded-md">
          <div className="bg-gray-100 rounded-md p-4 mb-3">
              <OrderSummary/>
              </div >
        </div>
        <OrderSum orders={data} onPay={handlePay} />
        {/* <OrderForm /> */}
      </div>
    </div>
  )
  
}