import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession()
    console.log('API Call : ')
    console.log(session)

    return NextResponse.json({ name: session?.user?.name ?? "Not Logged In"})
}