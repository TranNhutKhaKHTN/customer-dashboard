import { ROUTES } from "@/constant";
import { ICustomerItem, TCustomerStatus } from "@/service/customer";
import { TableColumnsType, Tag } from "antd";
import Link from "next/link";
import { z } from "zod";

export const customerTableColumns: TableColumnsType<ICustomerItem> = [
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name, record) => {
      return (
        <Link href={ROUTES.CUSTOMER_DETAIL(record.id)}>
          <div className="hover:underline text-blue-500">{name}</div>
        </Link>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Last Contacted",
    dataIndex: "lastContacted",
    key: "lastContacted",
    width: 200,
  },
];

export const CUSTOMER_STATUS = {
  ACTIVE: {
    lable: "Active",
    value: "Active",
  },
  IN_ACTIVE: {
    lable: "Inactive",
    value: "Inactive",
  },
};

export const customerDefaultValue = {
  name: "",
  email: "",
  status: "Active" as TCustomerStatus,
  lastContacted: "",
  phoneNumber: "",
};

export const customerValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email format"),
  status: z.enum(["Active", "Inactive"], {
    errorMap: () => ({
      message: "Status must be either 'Active' or 'Inactive'",
    }),
  }),
  lastContacted: z.string().nonempty("Last contacted date is required"),
  phoneNumber: z.string().nonempty("Phone number is required"),
});
