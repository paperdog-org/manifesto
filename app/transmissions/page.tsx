import Typewriter from "../../components/Typewriter"


export default async function TransmissionsRoute() {


    return (
        <main className="flex min-h-screen flex-col items-left justify-between p-20 font-bold">
            <div>
                <h1 className="text-xl opacity-70">
                    <a href="/">PaperDog</a>
                    <br />
                    &gt;<Typewriter text="Transmissions" delay={111} />&lt;
                </h1>
                <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-l font-bold tracking-[-0.02em] text-transparent opacity-70 drop-shadow-sm [text-wrap:balance] md:text-l md:leading-[5rem]">
                COMING SOON
                </h1>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>

        </main>
    )
}