import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // TODO: Return public user profile
  return NextResponse.json({ message: "Public user profile" }, { status: 200 })
} 