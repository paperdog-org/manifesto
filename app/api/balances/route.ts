import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: NextRequest) {

    const token = await getToken({ req, secret })
    const realtoken = token?.access_token
    
    const respPC = await fetch(process.env.NEXT_BACKEND_URL + "paperdog2/balances", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${realtoken}`,
        },   
        body: JSON.stringify({ethaddress: "0x", btcaddress:"bc1", soladdress:"paperdog"})
    }).then((res) =>
        res.json()
    )

    console.log('Balances Call')
    console.log(respPC)
    
    console.log('')

    return NextResponse.json(respPC) 
}