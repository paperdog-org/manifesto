'use client'
import { useState, useEffect } from "react"

export default function APITestPage() {
    const [token, setToken] = useState<string>()

    useEffect(() => {
        fetch("/api/token")
            .then((res) => res.json())
            .then((data) => setToken(data.jti))
    }, [])

    return (
        <div>
            <div>
                API Route From <span className="font-bold underline">Client</span>
            </div>
            <div>Token: {token}</div>
        </div>
    )
}