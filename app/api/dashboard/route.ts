import { NextResponse } from "next/server";
import { fetchLiveDashboardData } from "../../dashboard/github";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.NEXT_PUBLIC_STAGE === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = await fetchLiveDashboardData();
  return NextResponse.json(data);
}
