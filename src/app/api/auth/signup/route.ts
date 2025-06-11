import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // TODO: Implement user signup logic
  return NextResponse.json({ message: "Signup endpoint" }, { status: 201 })
} 