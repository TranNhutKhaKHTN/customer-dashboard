import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});

export const loginDefaultValue = {
  email: "",
  password: "",
};
