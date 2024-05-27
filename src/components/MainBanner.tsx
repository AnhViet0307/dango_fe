/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
const MainBanner: React.FunctionComponent = () => {

  const router = useRouter();
  return (
    <div className="relative px-48 py-10 bg-primary-100 " style={{ height: "400px" }}>
      {/* Image container with absolute positioning */}
      <div className="absolute inset-0 z-0">
        <img
          src="../banner.png"
          alt="banner"
          className=" w-full h-full object-cover"
        />
      </div>

      {/* Content container with relative positioning */}
      <div className="relative z-10">
        <div className="flex flex-col items-start text-white">
          <span className="mb-3 text-lg">Only the freshest of fresh 🔥</span>
          <span className="mb-6 text-4xl font-bold leading-[55px]">
            The Best Place To
            <br />
            Find And Buy
            <br />
            Amazing <span className="text-[#00992e]">Groceries</span>
          </span>
          <Button type="primary" onClick={()=>router.push("/products")} className="bg-primary_blue" size="large">
          Shop now!
        </Button>  
        </div>

      </div>
    </div>
  );
};


export default MainBanner;
