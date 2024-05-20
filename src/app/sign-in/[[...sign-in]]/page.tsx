"use client";
import { SignIn } from "@clerk/nextjs";
import { Button, Col, Form, Image, Input, Row, Typography } from "antd";


export default function Page() {
    return(
    <Row className="h-screen p-0 m-0">
      <Col span={12} className="bg-white flex flex-col items-center justify-start">
        <Row className="pt20 h-48   items-center">
            <Image src="/logo2.png" width={400}   loading="lazy2" preview={false}/>
        </Row>
        <Row className="mt-36">
            <SignIn path="/sign-in" />
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