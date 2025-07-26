import { NextResponse } from "@/pages/node_modules/next/server";

export async function GET() {
  return NextResponse.json({
    message: "user endpoint reached successfully",
  });
}
