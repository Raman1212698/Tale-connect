import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // TODO: Implement user login logic
  return NextResponse.json({ message: "Login endpoint" }, { status: 200 })
} 