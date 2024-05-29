
import { Button, DatePicker,Typography, Col,Row, Table} from 'antd';
import { useState } from "react";
import Topbar from '@/components/Topbar';
import MainBanner from '@/components/MainBanner';
import CustomCarousel from '@/components/carousel';
import Head from 'next/head';
import "./globals.css"
import Image from "next/image";
import reason1Image from "@p/fresh.jpg"
import reason2Image from "@p/variety.jpg"
import reason3Image from "@p/delivery.jpg"
export default function Page() {
  
  return (
    <div>
      <Topbar />
      <MainBanner />

      <Row justify="center" align="middle" style={{ minHeight: '300px' }}>
        {/* Heading */}
        <Col span={24} className="text-center mb-2 text-3xl mt-5 font-semibold">
          <span>Check out some of our</span><span className="text-[#ff9148]"> best seller!</span>
        </Col>
        <Col span={16}>
        <CustomCarousel />
        </Col>
      </Row>
      <hr className='mt-4 w-1/2 mx-auto '></hr>
      <Row justify="center" align="middle" >
        {/* Heading */}
        
        <Col span={24} className="text-center mb-5 text-3xl mt-10 font-semibold">
          <span><u>Why you should choose Dango?</u></span>
        </Col>
        </Row>
        
      <Row justify="center" align="middle" className='mb-10' >
        <Col span={5} className='bg-primary_blue pb-5 pt-20'style={{ minHeight: '340px' }} >
          <Image src={reason1Image} width={100} height={100}  alt='fresh' className='text-center outline mx-auto'/>
          <h1 className="text-xl font-semibold align-middle text-center">
            Provide only the freshest ingredients
          </h1>
          <h2 className="text-lg  text-center px-8 text-white">
          We prioritize freshness by sourcing directly from trusted suppliers. Enjoy top-quality ingredients in every order.
          </h2>
        </Col>
        <Col span={5} className='bg-tertiary_blue pb-5 pt-20'style={{ minHeight: '340px' }}>
          <Image src={reason2Image} width={100} height={100}  alt='variety' className='text-center outline mx-auto'/>
          <h1 className="text-xl font-semibold align-middle text-center">
            Wide range and a variety of products.
          </h1>
          <h2 className="text-lg  text-center px-8 text-slate-600">
          Explore a diverse selection of products, from essentials to gourmet items, all in one place. There is something for every palate.
          </h2>
        </Col>
        <Col span={5} className='bg-primary_yellow pb-5 pt-20'style={{ minHeight: '340px' }}>
          <Image src={reason3Image} width={100} height={100} alt={'delivery'} className='text-center outline mx-auto' />
          <h1 className="text-xl font-semibold align-middle text-center">
            Fast, reliable order processing and delivery.
          </h1>
          <h2 className="text-lg  text-center px-8 text-slate-600">
          Count on us for quick and accurate order processing and delivery. Get your items when you need them, hassle-free.
          </h2>
        </Col>
      </Row>
      <hr className=' mb-20 w-5/6 mx-auto '></hr>
      
    </div>
    

  )

  
}
