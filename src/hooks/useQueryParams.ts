"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import queryString from "query-string";

export const useQueryParams = <T = any>() => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const changeQueryParams = (params: T) => {
    const p = params as Record<string, any>;

    const paramsString =
      Object.values(p)?.filter((p) => p)?.length === 0
        ? ""
        : `${queryString.stringify(p)}`;

    router.push(`${pathname}?${paramsString}`);
  };

  const queryParams = Object.fromEntries(searchParams.entries()) as T;

  return { changeQueryParams, queryParams };
};
