'use client'
import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Spin, Typography } from "antd";
import ClientTable from "./ClientTable";
import FilterMenu from "./FilterMenu";
import { useAppStore } from "@/stores/useAppStore";
import { useClientStore } from "@/stores/useClientStore";
import { getAllUsers } from "@/apis/user.api";
import AdminHeader from "../AdminHeader";
import Sidebar from "../AdminSidebar";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
const items = [
  { value: "all", title: "All clients" },
];

const ClientManagementPage: React.FunctionComponent = () => {
  const [selectedFilter, setSelectedFilter] = useState<any>(items[0]);

  const fetchProductData = useRef<any>(null);

  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const clients = useClientStore((state) => state.clients);
  const setClients = useClientStore((state) => state.setClients);
  const setFilteredClients = useClientStore(
    (state) => state.setFilteredClients
  );

  useEffect(() => {
    fetchProductData.current = async () => {
      setIsLoading(true);
      try {
        const { data } = await getAllUsers();
        console.log(data);
        setClients(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProductData.current();
  }, []);



  return (
    <AdminProtectedRoute>
<div>
        <Row className="mb-4">
          <AdminHeader/>
        </Row >
        <Row className="h-full">
  <Col className="ml-4 top-0 !w-64 !max-w-full h-screen ">
                <Sidebar/>
        </Col>
        <Col className="w-3/4">
    <div className="p-8">
      {/* TITlE */}
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Customer management
          </Typography.Title>
        </Col>
      </Row>

     

      {/* TABLE */}
      {!isLoading ? (
        <ClientTable />
      ) : (
        <Spin spinning={isLoading} size="large" />
      )}
          </div>
        </Col>
        </Row>
            
      </div>
      </AdminProtectedRoute>
  );
};

export default ClientManagementPage;
