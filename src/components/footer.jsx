import Link from "next/link";
import { Button } from "./ui/button";
export default function Footer() {
  return (
    <div className="flex flex-row items-center justify-between mx-[130px] my-[25px]">
      <div>
        <h1 className="font-semibold text-[20px]">
          Arka Studio.{" "}
          <Link
            href="https://www.instagram.com/a.shif_yan/"
            className="text-[#BF3A2B]"
          >
            SHIFYAN ALMUSTAFID
          </Link>
        </h1>
      </div>
      <div className="flex flex-row gap-[40px] justify-center ">
        <Link href="/">
          <Button
            variant="link"
            className="cursor-pointer text-[20px] font-semibold p-0"
          >
            Home
          </Button>
        </Link>
        <Link href="/services">
          <Button
            variant="link"
            className="cursor-pointer text-[20px] font-semibold  p-0"
          >
            Services
          </Button>
        </Link>
        <Link href="/about">
          <Button
            variant="link"
            className="cursor-pointer text-[20px] font-semibold p-0"
          >
            About Us
          </Button>
        </Link>
        <Link href="/cek-booking">
          <Button
            variant="link"
            className="cursor-pointer text-[20px] font-semibold p-0"
          >
            Cek Pesanan
          </Button>
        </Link>
      </div>
    </div>
  );
}
