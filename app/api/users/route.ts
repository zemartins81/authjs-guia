import {db} from "@/lib/db"

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const data = await req.json()
    const { name, email, password } = data

    return NextResponse.json({ message: "teste" })
}
