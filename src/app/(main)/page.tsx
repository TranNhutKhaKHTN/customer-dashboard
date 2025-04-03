"use client";

import { ROUTES } from "@/constant";
import { useQueryParams } from "@/hooks";
import { useFetchCustomers } from "@/hooks/customer/useFetchCustomers";
import { customerTableColumns } from "@/resources/customer";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";

export default function Home() {
  const debounceRef = useRef<any>(null);
  const [searchKey, setSearchKey] = useState("");

  const { queryParams, changeQueryParams } = useQueryParams();
  const { data, isValidating, isLoading } = useFetchCustomers(queryParams);

  const onPageChange = (page: number) => {
    changeQueryParams({
      ...queryParams,
      page,
    });
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      changeQueryParams({
        ...queryParams,
        page: 1,
        search: value,
      });
    }, 300);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between gap-5">
        <Input
          placeholder="Search..."
          style={{ width: 300 }}
          value={searchKey}
          onChange={onSearchChange}
        />

        <Link href={ROUTES.CREATE_CUSTOMER}>
          <Button type="primary">Create customer</Button>
        </Link>
      </div>
      <Table
        dataSource={data?.customers || []}
        size="middle"
        bordered
        rowKey="id"
        columns={customerTableColumns}
        loading={{
          indicator: <LoadingOutlined spin />,
          size: "large",
          spinning: isValidating || isLoading,
        }}
        pagination={{
          pageSize: data?.pageSize,
          current: data?.page,
          total: data?.total,
          showSizeChanger: false,
          onChange: onPageChange,
        }}
      />
    </div>
  );
}
