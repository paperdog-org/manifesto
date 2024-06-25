'use client'
import { useState } from "react"
import {Box, Button, Code, HStack, Spinner, Text, VStack} from "@chakra-ui/react";
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import axios from "axios";


export default function Start2Route4() {
    const { data: session, status } = useSession()
    const [response, setResponse] = useState("{}");

    console.log(session)

    const handleSignOut = async () => { 
        signOut()
    }

    const getUserDetails0 = async (useToken: boolean) => {
      try {
        const token = useToken ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access_token}`,
          } : {
            "Content-Type": "application/json",
        }

        const res2 = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "api/auth/user", {
          method: "GET",
          headers: token,   
        }).then((res) =>
          res.json()
          //setResponse(JSON.stringify({a: 1, b:2}))
        );

        setResponse(JSON.stringify(res2));

      } catch (error) {
        setResponse((error as Error).message);
      }
    };

    const getUserDetails = async (useToken: boolean) => {
      try {
        const response = await axios({
          method: "get",
          url: process.env.NEXT_PUBLIC_BACKEND_URL + "api/auth/user",
          headers: useToken ? {Authorization: "Bearer " + session?.access_token} : {},
        });
        setResponse(JSON.stringify(response.data));
      } catch (error) {
        setResponse((error as Error).message);
      }
    };

    const getToken = async (useToken: boolean) => {
      try {
        const response = await axios({
          method: "post",
          url: process.env.NEXT_PUBLIC_BACKEND_URL + "paperdog2/balances",
          headers: useToken ? {Authorization: "Bearer " + session?.access_token} : {},
          data: JSON.stringify({ethaddress: "0xADc2F655FCEaa01053d02e96393a7D43E842346d", btcaddress:"19b9cUuqdUEjL9TjysXpW35kJZEjosxiWj", soladdress:"DbLwUEC4rAX1PMqsYdRgSq14Zwpf3ihgc79HQ7DxcuFU"})
        });
        setResponse(JSON.stringify(response.data));
      } catch (error) {
        setResponse((error as Error).message);
      }
    };

    if (status == "loading") {
        return <Spinner size="lg"/>;
      }

    if (session) {
      return (
          <>
              <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              {session?.user?.username} 
              <br /> 
              <button onClick={() => {handleSignOut()}}>
                  <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                            <a
                              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                              rel="noopener noreferrer"
                          >
                              <Image
                                  src="/pdognobgfocus.png"
                                  alt="PaperDog Logo"
                                  className="dark:invert"
                                  width={81}
                                  height={24}
                                  priority
                                  />
                              <code className="font-mono font-bold">WOOF</code>
                          </a>
                      
                  </div>
              </button>
              
              </div>

              <Box m={8}>
                <VStack>
                  <Text>PK: {session?.user?.pk}</Text>
                  <Text>Username: {session?.user?.username}</Text>
                  <Text>Email: {session?.user?.email || "Not provided"}</Text>
                  <Code>
                    {response}
                  </Code>
                </VStack>
                <HStack justifyContent="center" mt={4}>
                  <Button colorScheme="blue" onClick={() => getUserDetails(true)}>
                    User details (with token)
                  </Button>
                  <Button colorScheme="orange" onClick={() => getUserDetails(false)}>
                    User details (without token)
                  </Button>
                  <Button colorScheme="green" onClick={() => getToken(true)}>
                    Get Token
                  </Button>
                  <Button colorScheme="red" onClick={() => signOut({callbackUrl: "/"})}>
                    Sign out
                  </Button>
                </HStack>
              </Box>
          </>
      );
    }

    return (
        <Box m={8}>
          <VStack>
            <Text>You are not authenticated.</Text>
            <Button colorScheme="blue" onClick={() => signIn(undefined, {callbackUrl: "/profile"})}>
              Sign in
            </Button>
          </VStack>
        </Box>
      );
}