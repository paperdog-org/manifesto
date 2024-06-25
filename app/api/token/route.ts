import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: NextRequest) {
    // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
    // const token = await getToken({ req })
    const token = await getToken({ req, secret })
    console.log("JSON Web Token", token)
    console.log('')
    //console.log(req.cookies.getAll())
    //console.log('')
    //console.log(req.nextUrl)
    //console.log('')
    //console.log(req.headers)

    return NextResponse.json(token) 
  }