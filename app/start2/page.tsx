import Image from 'next/image'
import OneTooltip from '../../components/Tooltip'
import TheScene from '../../components/Paper'

export default async function Start2Route() {

    return (
        <div>
          
          <main className="flex min-h-screen flex-col items-center justify-between p-20">
            
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/paperdog3.png"
                alt="PaperDog Header"
                width={545}
                height={337}
                priority
              />
            </div>
    
    
            <div className="z-10 w-full max-w-xl px-5 xl:px-0">
              <div
                className="mx-auto mt-6 flex items-center justify-center space-x-5 opacity-90"
              >
                <a
                  className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-7 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black"
                  href = "/login"
                  rel="noopener noreferrer"
                >
                  <b>LOGIN</b>
                </a>
              </div>
            </div>

            <div className="z-10 w-full max-w-xl px-5 xl:px-0">
              <div className="mx-auto mt-3 flex items-center justify-center space-x-5 opacity-90">
                <a
                  className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black"
                  href = "/start"
                  rel="noopener noreferrer"
                >
                  <b>NEW USER</b>
                </a>
              </div>
            </div>
    
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              <TheScene />
            <br></br>
            <br></br>
          </main>
        </div>
      )
}