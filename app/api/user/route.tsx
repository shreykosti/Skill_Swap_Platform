import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "user endpoint reached successfully",
  });
}
