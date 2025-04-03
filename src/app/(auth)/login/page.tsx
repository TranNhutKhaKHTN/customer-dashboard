"use client";

import { loginDefaultValue, loginValidationSchema } from "@/resources/login";
import { Text } from "@/components/core";
import { ROUTES, TOKEN_KEY } from "@/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Card } from "antd";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FormPassword, FormInput } from "@/components/form";
import { useState } from "react";

interface ILoginFormValue {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { replace } = useRouter();
  const [loading, setLoading] = useState(false);

  const formInstance = useForm<ILoginFormValue>({
    defaultValues: loginDefaultValue,
    resolver: zodResolver(loginValidationSchema),
  });

  const { handleSubmit } = formInstance;

  const onSubmit = (values: ILoginFormValue) => {
    setLoading(true);
    setCookie(TOKEN_KEY, values?.email);
    setTimeout(() => {
      setLoading(false);
      replace(ROUTES.LOGIN);
    }, 2000);
  };

  return (
    <div className="w-full max-w-[400px] px-4 mx-auto flex flex-col justify-center h-screen">
      <Card>
        <div className="flex justify-center flex-col items-center gap-4 pb-10">
          <Text strong className="!text-lg">
            Login
          </Text>
          <img src="/login/login.svg" className="w-20" />
        </div>
        <FormProvider {...formInstance}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <FormInput name="email" placeholder="Email" />
              <FormPassword name="password" placeholder="Password" />
              <Button
                className="w-full"
                type="primary"
                htmlType="submit"
                loading={loading}
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

export default LoginPage;
