import { CUSTOMERS } from "@/_dp";
import { NextResponse } from "next/server";

export async function GET(_: Request, context: any) {
  const { id } = await context.params;

  const customer = CUSTOMERS.find((c) => c.id.toString() === id);

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json(customer);
}
