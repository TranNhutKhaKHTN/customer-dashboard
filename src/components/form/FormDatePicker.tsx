import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import { withFormElement } from "./withFormElement";

interface FormDatePickerProps
  extends Omit<DatePickerProps, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string) => void;
}

const CustomDatePicker = ({
  value,
  onChange,
  ...props
}: FormDatePickerProps) => {
  return (
    <DatePicker
      {...props}
      value={value ? dayjs(value) : null}
      onChange={(date) => onChange?.(date ? date.toISOString() : "")}
    />
  );
};

export const FormDatePicker = withFormElement(CustomDatePicker);
