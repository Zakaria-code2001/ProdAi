/* eslint-disable prefer-const */
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? '/notes' : '/new-user';

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen bg-white flex justify-center items-center">
        <div className="w-full max-w-[700px] mx-auto">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            ProdAi: Your Ai Productivity App
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Welcome to ProdAi, your ultimate AI-powered productivity app.
          </p>
          <div className="mt-4">
            <Link href={href}>
              <Button variant="outline" className="text-white bg-black">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
