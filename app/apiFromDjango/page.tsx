import { HtmlContext } from "next/dist/shared/lib/html-context.shared-runtime"
import { headers } from "next/headers"

export default async function APIFromDjango() {
    const resp = await fetch("http://127.0.0.1:8000/paperdog2/", {
        method: "GET",
        headers: headers()
    }).then((res) =>
        res.text()
    )

    return (
        <div>
            <div>
                API Route From <span className="font-bold underline">Django</span>
            </div>
            <div>
                <div className="text-container" dangerouslySetInnerHTML={{ __html: resp }} />
            </div>
        </div>
    )
}