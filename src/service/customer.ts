import queryString from "query-string";

export interface IFetchCustomers {
  page?: number;
  pageSize?: number;
  search?: string;
}

export type TCustomerStatus = "Active" | "Inactive";

export interface ICustomerItem {
  id: number;
  name: string;
  email: string;
  status: TCustomerStatus;
  lastContacted: string;
  phoneNumber: string;
}

export interface IFetchCustomersResponse {
  customers: ICustomerItem[];
  page: number;
  pageSize: number;
  totalPage: number;
  total: number;
}

export const getCustomers = (
  params: IFetchCustomers
): Promise<IFetchCustomersResponse> => {
  return fetch(`/api/customer?${queryString.stringify(params)}`).then((res) =>
    res.json()
  );
};

export const getCustomerDetail = (id: string): Promise<ICustomerItem> => {
  return fetch(`/api/customer/${id}`).then((res) => res.json());
};
