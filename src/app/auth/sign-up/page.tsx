"use client";
import { signUp } from "@/apis/auth.api";
import { Button, Col, Form, Image, Input, Row, Typography ,notification} from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useAppStore } from "@/stores/useAppStore";


const Page: React.FunctionComponent = () => {
  const navigate = useRouter();

  const [form] = Form.useForm();
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const handleSignUp = async (values: any) => {
    const { ld, ...rest } = values;

    setIsLoading(true);
    const payload = {
      ...rest,
      likeddish:["1","2"],
    };
    try {
      await signUp(payload);
      setIsLoading(false);
      notification.success({
        message: "Create new account successfully!",
        duration: 0.5,
        onClose: () => navigate.push("/auth/login"),
      });
    } catch (error: any) {
      setIsLoading(false);
      notification.error({
        message: error.response.data.message,
      });
    }
  };
  
  return (
    <Row className="h-screen p-0 m-0">
      <Col span={12} className="bg-white flex flex-col items-center justify-start">
        <Row className="pt20 h-24   items-center">
            <Image src="/logo2.png" width={400}   loading="lazy2" preview={false}/>
        </Row>
        {/* <Row className="mt-36">
            <SignIn path="/sign-in" />
        </Row> */}
        <Row justify={"center"} align={"middle"} className="mt-16 drop-shadow-2xl bg-slate-100">
          <Col span={24} className="outline-2 rounded-lg outline outline-slate-500">
            <Typography.Title level={2} className="text-center pt-8">
              SIGN UP
            </Typography.Title>
            <Form
              form={form}
              labelCol={{ span: 24 }}
              className="px-16 "
              size="large"
              onFinish={(values) => handleSignUp(values)}
            >
              <Form.Item
            name="fullname"
            label="Full name"
            required={true}
            rules={[
              {
                required: true,
                message: "You must enter your fullname",
              },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            required={true}
            rules={[
              {
                required: true,
                message: "You must enter your Phone number",
              },
              {
                type: "string",
                message: "You must enter a valid phone number!",
              },
            ]}
          >
            <Input placeholder="phone number" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            required={true}
            rules={[
              {
                required: true,
                message: "You must enter your email",
              },
              {
                type: "email",
                message: "You must enter a valid email!",
              },
            ]}
          >
            <Input placeholder="example.email@gmail.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            required={true}
            rules={[
              {
                required: true,
                message: "You must enter your password",
              },
              {
                min: 8,
                message: "You must enter at least 8+ characters!",
              },
            ]}
          >
            <Input.Password placeholder="Enter at least 8+ characters" />
          </Form.Item>
              <Form.Item>
                <Button
                  loading={isLoading}
                  htmlType="submit"
                  className="w-full mt-8 text-white border-none bg-primary_blue"
                >
                  Sign up
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row className="mt-8">
          <Col>
            <span>Already have an account? </span>
            <span
              className="  underline cursor-pointer text-tertiary_blue"
              onClick={() => navigate.push("/auth/login")}
            >
              Sign in
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