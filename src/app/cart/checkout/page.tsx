import { Button, DatePicker,Typography, Col,Row} from 'antd';
import { useState } from "react";
import Topbar from '@/components/Topbar';
import MainBanner from '@/components/MainBanner';
import CustomCarousel from '@/components/carousel';
import Head from 'next/head';
import DeliveryInformation from '@/components/DeliveryInformationForm';
import OrderSummary from '@/components/OrderSum';
import CheckOutCartTable from './CheckOutCartTable';
import OrderForm from '@/components/OrherForm';

export default function Page() {
  return (
    <div>
        <Topbar />
        <DeliveryInformation />
        <div className="mt-5 p-4 border border-gray-300 rounded-md">
        <div className="bg-gray-100 rounded-md p-4 mb-3">
            <CheckOutCartTable/>
            </div >
        </div>
        <OrderSummary/>
        <OrderForm/>
    </div>
  )
  
}