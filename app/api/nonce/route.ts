import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {

    const respNonce = await fetch(process.env.NEXT_BACKEND_URL+"paperdog2/getnonce", {
        method: "GET",
        headers: headers()
    }).then((res) =>
        res.text()
    )

    console.log('Nonce Call')
    console.log(respNonce)
    console.log('')
    /**console.log(headers())*/

    return NextResponse.json({ nonce: respNonce}) 
}