import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // TODO: Return current user profile
  return NextResponse.json({ message: "Current user profile" }, { status: 200 })
} 