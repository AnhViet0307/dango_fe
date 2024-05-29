'use client'
import { changeOrderStatus } from "@/apis/order.api";
import { Status } from "@/constants/status";
import { IOrder } from "@/interfaces/IOrder";
import { Button, Form, Modal, Select, notification } from "antd";
import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
interface IEditOrderModalProps {
  show: boolean;
  setShow: any;
  data: IOrder;
}

const EditOrderModal: React.FunctionComponent<IEditOrderModalProps> = ({
  show,
  setShow,
  data,
}) => {
  const navigate = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  const statusOptions = [
    { value: Status.CANCELLED, label: Status.CANCELLED },
    { value: Status.DELIVERED, label: Status.DELIVERED },
    { value: Status.PENDING, label: Status.PENDING },
     { value: Status.PROCESSING, label: Status.PROCESSING},
  ];

  const handleChangeStatus = async (value: any) => {
    setIsLoading(true);
    try {
      await changeOrderStatus(data.id, value.status);
      notification.success({
        message: "Delete product successfully!",
        duration: 0.25,
        onClose: () => navigate.refresh(),
      });
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      notification.error({
        message: error.message,
      });
    }
  };

  return (
    <Modal
      title="Change order status"
      centered
      open={show}
      footer={[
        // eslint-disable-next-line react/jsx-key
        <Button onClick={() => setShow(false)}>Cancel</Button>,
        // eslint-disable-next-line react/jsx-key
        <Button
          type="primary"
          className="bg-primary_blue"
          loading={isLoading}
          onClick={() => form.submit()}
        >
          Save
        </Button>,
      ]}
      onCancel={() => setShow(false)}
      width={400}
    >
      <Form form={form} labelCol={{ span: 24 }} onFinish={handleChangeStatus}>
        <Form.Item name="status" initialValue={data.status}>
          <Select options={statusOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOrderModal;
