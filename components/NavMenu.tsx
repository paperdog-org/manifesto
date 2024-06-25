'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700"
const INACTIVE_ROUTE = "py-1 px-2 text-gray-500 hover: text-gray-300 hover:bg-gray-700"

export default function NavMenu() {
    const pathname = usePathname()
    return (
        <div>

            <hr className="my-4" />
            <ul>
                <Link href="/">
                    <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        Home
                    </li>
                </Link>
                <Link href="/start">
                    <li className={pathname === "/start" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        Start
                    </li>
                </Link>
                <Link href="/interface">
                    <li className={pathname === "/interface" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        App
                    </li>
                </Link>
                <Link href="/go">
                    <li className={pathname === "/go" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        GO
                    </li>
                </Link>
                <Link href="/serverAction">
                    <li className={pathname === "/serverAction" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        ServerAction
                    </li>
                </Link>
                <Link href="/apiFromDjango">
                    <li className={pathname === "/apiFromDjango" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        ApiFromDjango
                    </li>
                </Link>
                
            </ul>
        </div>
    )
}