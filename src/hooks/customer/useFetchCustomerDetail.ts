import { getCustomerDetail, ICustomerItem } from "@/service/customer";
import useSWR from "swr";

const FETCH_CUSTOMER_DETAIL = "FETCH_CUSTOMER_DETAIL";

export const useFetchCustomerDetail = (id: string) => {
  return useSWR<ICustomerItem>([FETCH_CUSTOMER_DETAIL, id], () =>
    getCustomerDetail(id)
  );
};
