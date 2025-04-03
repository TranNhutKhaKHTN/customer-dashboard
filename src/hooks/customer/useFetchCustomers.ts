import {
  getCustomers,
  IFetchCustomers,
  IFetchCustomersResponse,
} from "@/service/customer";
import useSWR from "swr";

const FETCH_CUSTOMERS = "FETCH_CUSTOMERS";

export const useFetchCustomers = (params: IFetchCustomers) => {
  const { page = 1, pageSize = 10 } = params;
  return useSWR<IFetchCustomersResponse>(
    [FETCH_CUSTOMERS, params],
    () => getCustomers({ ...params, page, pageSize }),
    {
      // TODO: we can write a useSWRConfig for all api hook
      // to handle some option default
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );
};
