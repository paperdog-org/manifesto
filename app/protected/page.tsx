import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

export default async function ProtectedRoute() {

    const session = await getServerSession();
    console.log("Protected : " + session)
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <div>
            welcome.
            <br />

            <br />
            this is a protected route.
            <br />
            you will only see this if you are authenticated.
            <br />
            
            <br />
            if you found this, you are ready.
            <br />
            just come back when the time is right.
        </div>
    )
}