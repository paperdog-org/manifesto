import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {

    const respPC = await fetch(process.env.NEXT_BACKEND_URL+"paperdog2/paperdogorg", {
        method: "GET",
        headers: headers()
    }).then((res) =>
        res.json()
    )
    
    console.log('Export Call')
    console.log(respPC)
    console.log('')
    
    console.log('')

    return NextResponse.json(respPC)
}