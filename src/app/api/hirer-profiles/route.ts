import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // TODO: Create hirer profile
  return NextResponse.json({ message: "Create hirer profile" }, { status: 201 })
}

export async function GET(req: NextRequest) {
  // TODO: List/search hirer profiles
  return NextResponse.json({ message: "List hirer profiles" }, { status: 200 })
} 