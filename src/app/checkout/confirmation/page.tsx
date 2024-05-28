'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Button, Typography } from 'antd';
import OrderInformation from './components/OrderInformation'; 

const CheckoutConfirmationPage: React.FunctionComponent = () => {
  const router = useRouter();
  const [confirmationData, setConfirmationData] = useState<any>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const dataParam = queryParams.get('data');
    if (dataParam) {
      const decodedData = decodeURIComponent(dataParam);
      const parsedData = JSON.parse(decodedData);
      setConfirmationData(parsedData);
    }
  }, []);

  const status =  "success";
//confirmationData ? confirmationData.status :
  return (
    <div className="px-[450px] py-12 flex flex-col items-center">
      <div>
        <img
          src={"/payment-success.png"
          }
          alt="payment status"
          className="object-cover w-80"
        />
      </div>
      <div className="flex flex-col items-center gap-3 mt-6 mb-12">
        <Typography.Title level={2} style={{ margin: 0 }}>
          {status === "success"
            ? "Thank you for your purchase! 🎉"
            : "Payment declined 😢"}
        </Typography.Title>
        <span className="text-sm text-neutral-500">
          {status === "success"
            ? "Our staff will process your order soon"
            : "Something went wrong with your payment method. Please try again."}
        </span>
      </div>
      {/* {confirmationData && (
        <OrderInformation status={status} data={confirmationData.data} />
      )} */}
          <div className="flex items-center justify-center gap-4">
        
          <Button
            onClick={() => router.push("/products")}
            type="primary"
            className="bg-primary_blue"
            size="large"
          >
            Continue shopping
          </Button>
        
      </div>
    </div>
  );
};

export default CheckoutConfirmationPage;
