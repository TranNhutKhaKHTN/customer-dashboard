"use client";

import { Button, Card, message } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { FormDatePicker, FormInput } from "@/components/form";
import { Text } from "../core";
import { ICustomerItem } from "@/service/customer";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CUSTOMER_STATUS,
  customerDefaultValue,
  customerValidationSchema,
} from "@/resources/customer";
import FormSelect from "../form/FormSelect";

interface CustomerFormProps {
  initValues?: ICustomerItem;
  // TODO: we can use callback function to handle action for create and edit
  // onSubmit?: (value)=>void
}

const CustomerForm = ({ initValues }: CustomerFormProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const formInstance = useForm({
    defaultValues: customerDefaultValue,
    resolver: zodResolver(customerValidationSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = formInstance;

  useEffect(() => {
    if (initValues) {
      reset(initValues);
    }
  }, [initValues]);

  const onSubmit = async () => {
    //TODO: we can handle api here or call callback function
    messageApi.success("Success!");
  };

  return (
    <div className="w-full max-w-[380px] mx-auto pb-10">
      {contextHolder}
      <Card>
        <div className="flex justify-center flex-col gap-5 items-center pb-6">
          <Text strong className="text-lg">
            Customer information
          </Text>
          <img src="/customer/customer.svg" className="w-20" />
        </div>
        <FormProvider {...formInstance}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <FormInput name="name" placeholder="Name" />
              <FormSelect
                options={Object.values(CUSTOMER_STATUS)}
                name="status"
                placeholder="Status"
              />
              <FormInput name="email" placeholder="Email" />
              <FormInput name="phoneNumber" placeholder="Phone number" />
              <FormDatePicker
                name="lastContacted"
                placeholder="Last contacted"
              />
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                disabled={!isDirty}
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default CustomerForm;
