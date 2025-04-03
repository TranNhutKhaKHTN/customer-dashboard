export const ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  FORGOT_PASSWORD: "/forgot-password",
  CUSTOMER_DETAIL: (id: number) => `/${id}`,
  CREATE_CUSTOMER: "/new",
};

export const TOKEN_KEY = "dashboard_token";
