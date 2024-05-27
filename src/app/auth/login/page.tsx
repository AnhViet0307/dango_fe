"use client";

import { Button, Col, Form, Image, Input, Row, Typography } from "antd";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useAppStore } from "@/stores/useAppStore";
import dynamic from 'next/dynamic';




const Page: React.FunctionComponent = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { logIn } = useContext(AuthContext) as any;

  const isLoading = useAppStore((state) => state.isLoading);

  const handleLogin = async (values: any) => {
    await logIn(values);
  };
  
  return (
    <Row className="h-screen p-0 m-0">
      <Col span={12} className="bg-white flex flex-col items-center justify-start">
        <Row className="pt20 h-36   items-center">
            <Image src="/logo2.png" width={400}   loading="lazy2" preview={false}/>
        </Row>
        {/* <Row className="mt-36">
            <SignIn path="/sign-in" />
        </Row> */}
        <Row justify={"center"} align={"middle"} className="mt-36 drop-shadow-2xl bg-slate-100">
          <Col span={24} className="outline-2 rounded-lg outline outline-slate-500">
            <Typography.Title level={2} className="text-center pt-8">
              SIGN IN
            </Typography.Title>
            <Form
              form={form}
              labelCol={{ span: 24 }}
              className="px-16 "
              size="large"
              onFinish={(values) => handleLogin(values)}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="example.email@gmail.com" />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input.Password placeholder="Enter at least 8+ characters" />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={isLoading}
                  htmlType="submit"
                  className="w-full mt-8 text-white border-none bg-primary_blue"
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row className="mt-8">
          <Col>
            <span>Don&#39;t have an account? </span>
            <span
              className="  underline cursor-pointer text-tertiary_blue"
              onClick={() => router.push("/auth/sign-up")}
            >
              Sign up
            </span>
          </Col>
        </Row>
      </Col>
      <Col
        span={12}
        className="flex flex-col items-center justify-center bg-secondary_blue "
    >
        <Image src="/login-sideimg.png" loading="lazy" preview={false} />
        <Typography className="text-center mt-5">
          <Typography.Title level={1} style={{ color: "white" }}>
            Dango
          </Typography.Title>
          <Typography.Title level={2} style={{ color: "white" }}>
            For the Freshest meals!
          </Typography.Title>
        </Typography>
      </Col>
        </Row>
    )
}

export default Page;