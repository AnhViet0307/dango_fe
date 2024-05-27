import { Button } from "antd";
import React from "react";

const Banner: React.FunctionComponent = () => {
  // return (
  //   <div className="flex items-center justify-between px-48 py-10 bg-primary-100">
  //     <div className="flex flex-col items-start">
  //       <span className="mb-3 text-xl text-neutral-900">
  //         Only with the freshest 🔥
  //       </span>
  //       <span className="mb-6 text-4xl font-bold leading-[56px]">
  //         The Best Place To
  //         <br />
  //         Find And Buy
  //         <br />
  //         Amazing <span className="text-[#8353E2FF]">Product</span>
  //       </span>
        
  //     </div>
  //     <div className="relative h-60 w-auto">
  //       <img
  //         src="../banner.png"
  //         alt="banner"
  //         className="absolute transform -translate-x-1/2 -translate-y-1/2 w-auto max-h-full"
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <div className="relative px-48 py-10 bg-primary-100">
      {/* Image container with absolute positioning */}
      <div className="absolute inset-0 z-0">
        <img
          src="../banner.png"
          alt="banner"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content container with relative positioning */}
      <div className="relative z-10">
        <div className="flex flex-col items-start text-white">
          <span className="mb-3 text-lg">Only the freshest of fresh 🔥</span>
          <span className="mb-6 text-4xl font-bold leading-[56px]">
            The Best Place To
            <br />
            Find And Buy
            <br />
            Amazing <span className="text-[#00992e]">Groceries</span>
          </span>
          
        </div>
      </div>
    </div>
  );
};


export default Banner;
