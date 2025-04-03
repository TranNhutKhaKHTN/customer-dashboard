"use client";

import CustomerForm from "@/components/customer/CustomerForm";
import { useFetchCustomerDetail } from "@/hooks/customer";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useParams } from "next/navigation";

const CustomerDetailPage = () => {
  const params = useParams();

  const { data, isLoading } = useFetchCustomerDetail(params?.id as string);

  return (
    <Spin spinning={isLoading} indicator={<LoadingOutlined spin />}>
      <CustomerForm initValues={data} />
    </Spin>
  );
};

export default CustomerDetailPage;
