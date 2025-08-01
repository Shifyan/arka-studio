import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
Image;
export default function UnderDevelopmentPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-4">
      <Image
        src="/maintenance.png"
        alt="Desktop"
        width={60}
        height={60}
        className="mb-[10px]"
      />
      <h1 className="text-lg font-bold">
        This page is currently under development. <br />
        Please check back again soon hehe.
      </h1>
      <Link href="/" className="mt-[20px] ">
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer text-black"
        >
          <Image src="/back-button.png" alt="Arrow" height={21} width={21} />
          Home
        </Button>
      </Link>
    </div>
  );
}
