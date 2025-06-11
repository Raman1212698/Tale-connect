import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // TODO: Get specific talent profile
  return NextResponse.json({ message: "Get talent profile" }, { status: 200 })
}

export async function PUT(req: NextRequest) {
  // TODO: Update specific talent profile
  return NextResponse.json({ message: "Update talent profile" }, { status: 200 })
} 