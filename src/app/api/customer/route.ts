import { CUSTOMERS } from "@/_dp";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);

  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const searchQuery = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const filteredCustomers = CUSTOMERS.filter((customer) => {
    const nameMatches = customer.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const emailMatches = customer.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return nameMatches || emailMatches;
  });

  const totalCustomers = filteredCustomers.length;
  const totalPage = Math.ceil(totalCustomers / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const customersPage = filteredCustomers.slice(startIndex, endIndex);

  return NextResponse.json({
    customers: customersPage,
    page,
    pageSize,
    totalPage,
    total: totalCustomers,
  });
}
