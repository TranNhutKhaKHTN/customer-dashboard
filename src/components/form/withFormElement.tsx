import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Form } from "antd";

interface WithFormElementProps {
  name: string;
  label?: React.ReactNode;
  rules?: any;
  shouldUnregister?: boolean;
  itemProps?: Omit<React.ComponentProps<typeof Form.Item>, "name">;
}

export function withFormElement<T extends object>(
  Component: React.ComponentType<T>
) {
  return ({
    name,
    label,
    rules,
    shouldUnregister,
    itemProps,
    ...props
  }: WithFormElementProps & T) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        shouldUnregister={shouldUnregister}
        render={({ field, fieldState }) => (
          <Form.Item
            label={label}
            help={fieldState.error?.message}
            validateStatus={fieldState.error ? "error" : ""}
            {...itemProps}
          >
            <Component {...(props as T)} {...field} />
          </Form.Item>
        )}
      />
    );
  };
}
