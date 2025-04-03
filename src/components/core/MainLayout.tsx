"use client";
// TODO: enhance remove use client for layout

import React, { PropsWithChildren, useState } from "react";
import type { MenuProps } from "antd";
import { Avatar, Button, Flex, Layout, Menu, Typography } from "antd";
import { PieChartFilled, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ROUTES, TOKEN_KEY } from "@/constant";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link href={ROUTES.HOME}>Customer</Link>,
    ROUTES.HOME,
    <PieChartFilled style={{ fontSize: 16 }} />
  ),
];

const MainLayout = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);
  const { push } = useRouter();

  const onLogout = () => {
    deleteCookie(TOKEN_KEY);
    push(ROUTES.LOGIN);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Flex
          style={{ width: "100%" }}
          gap={10}
          align="center"
          justify="center"
        >
          <Title level={5} className="!text-white pt-5">
            {collapsed ? "D" : "Dashboard"}
          </Title>
        </Flex>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={[items[0]?.key as string]}
        />
      </Sider>
      <Layout>
        <Header className="p-0 !bg-white">
          <div className="w-full h-full flex justify-between items-center">
            <Text strong className="text-2xl">
              Customer management
            </Text>
            <div className="h-full items-center flex gap-3">
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <Button onClick={onLogout}>Logout</Button>
            </div>
          </div>
        </Header>
        <Content className="m-[0_16px]">
          <div className="m-[36px_0]" />
          <div className="p-6 min-h-[360px] rounded-lg !bg-white">
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>@trannhutkhaKHTN</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
