'use client'
import { Role } from "@/constants/role";
import { useAuthStore } from "@/stores/useAuthStore";
import { Col, Row, Typography } from "antd";
import React, { useEffect } from "react";
import ChangePassword from "./ChangePassword";
import ProfileEdit from "./ProfileEdit";
import Topbar from "@/components/Topbar";
import AuthProtectedRoute from "@/components/AuthProtectedRoute";
import { useRouter } from "next/navigation";
const ProfilePage: React.FunctionComponent = (props) => {
    const profile = useAuthStore((state) => state.profile);
  const loggedIn = useAuthStore((state) => state.loggedIn);
    const rehydrated = useAuthStore((state) => state.rehydrated);
    const navigate = useRouter();

    useEffect(() => {
    if (!rehydrated) {
      // Auth state is still being rehydrated
      return;
    }

    if (!loggedIn) {
      navigate.push('/auth/login');
    } else {
        
        }
    }, [loggedIn, rehydrated]);
    return (
       
        <div>
            <Topbar />
            <div className="px-80  mt-4">
                <Row>
                    <Typography.Title level={1} style={{ margin: 0 }}>
                        Profile
                    </Typography.Title>
                </Row>
                <Row>
                    <ProfileEdit/>
                </Row>
                <hr></hr>
                <Row className="my-8">
                    <Typography.Title level={2} style={{ margin: 0 }}>
                        Change Password
                    </Typography.Title>
                </Row>
                <Row className="mb-4  "><Col span={24}><ChangePassword/></Col></Row>
            </div>
        </div>
   
    );
};
export default ProfilePage;