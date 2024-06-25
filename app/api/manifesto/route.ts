import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {

    const respID = await fetch(process.env.NEXT_BACKEND_URL+"paperdog2/manifesto", {
        method: "GET",
        headers: headers()
    }).then((res) =>
        res.json()
    )

    //register here
    //if signed in, add new wallets
    //use default username, if username used new one
    //use default password
    //encrypt manifesto keys on way here
    //find way to pass values to nextauth route
    //store addresses in token
    //store encrypted manifesto in token
    //remember that you only want to send the data once, so figure that out in a better way...

    console.log('Manifesto Call')
    console.log(respID['username'])
    console.log('')
    /**console.log(headers())*/

    //no current not logged in situation
    return NextResponse.json(respID) //resp.substring(0,7)+'...'+resp.substring(resp.length-7,resp.length) ?? "Not Logged In"})
}