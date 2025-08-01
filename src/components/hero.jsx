import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="px-[130px] min-h-[790px] py-[60px] ">
      <div className="relative">
        <div className="w-[668px] max-h-[670px] absolute z-10">
          <h1 className="font-bold text-[96px] leading-tight space-y-2">
            <span className="inline-block bg-white rounded-b-[20px]  px-3 ">
              Unleash The
            </span>
            <br />
            <span className="inline-block bg-white rounded pe-3">Art Of</span>
            <br />
            <span className="inline-block bg-white w-[668px] rounded-t-[20px] pe-3">
              Photography
            </span>
          </h1>
          <h2 className="font-normal text-[18px] bg-white pt-4 rounded-b-[20px] max-w-[668px] pb-[20px]">
            Di Arka Studio, kami fokus menangkap momen-momen paling berharga
            dalam hidup Anda dan mengubahnya jadi karya visual yang penuh makna.
            Dengan tim fotografer yang berpengalaman dan penuh semangat, kami
            siap bercerita lewat lensa dan memastikan setiap jepretan
            mencerminkan perjalanan unik Anda.
          </h2>
          <div className="mt-[66px]">
            <Link href="/booking">
              <Button className=" cursor-pointer hover:bg-red-950 bg-red-900 text-white px-[48px] py-[28px] font-medium text-[20px] transform duration-200 ease-in">
                Book Your Session Now &gt;
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute w-[690px] flex flex-col  right-0">
          <div className=" w-[680px] h-[400px] rounded-[20px] overflow-hidden">
            <Image
              src="/hero-img1.jpg"
              width={680}
              height={400}
              alt="Gambar 1"
            ></Image>
          </div>
          <div className="flex flex-row mt-[20px]">
            <div className="overflow-hidden w-[279px] h-[250px] rounded-[20px]">
              <Image
                src="/hero-img2.jpg"
                width={279}
                height={250}
                alt="Gambar 2"
              ></Image>
            </div>
            <div className="overflow-hidden w-[380px] h-[250px] ms-[21px] rounded-[20px]">
              <Image
                src="/hero-img3.jpg"
                width={380}
                height={250}
                alt="Gambar 2"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
