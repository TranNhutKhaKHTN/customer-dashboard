export const ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  FORGOT_PASSWORD: "/forgot-password",
  CUSTOMER_DETAIL: (id: number) => `/${id}`,
};

export const TOKEN_KEY = "dashboard_token";
