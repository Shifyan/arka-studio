"use client";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/store";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Services() {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  // let [packages, setPackages] = useState([]);
  const { packages, fetchPackages } = useStore();
  const router = useRouter();

  const handleClick = (name) => {
    router.push(`/booking?packageName=${name}`);
  };
  useEffect(() => {
    fetchPackages();
  }, []);
  // useEffect(() => {
  //   fetch("/api/packages")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let result = data.data;
  //       const formattedData = result.map((item) => ({
  //         ...item,
  //         price: formatter.format(item.price),
  //       }));
  //       setPackages(formattedData);
  //     })
  //     .catch((err) => {
  //       console.error("Fetch error:", err);
  //     });
  // }, []);

  return (
    <div>
      <div className="mt-[5px] md:mt-[20px]">
        <Navbar></Navbar>
      </div>
      <div className="mx-[15px]">
        <div className="mt-[30px] md:mt-[60px]">
          <div className="flex justify-center">
            <h1 className="md:text-[45px] text-[30px] font-bold text-center">
              Our Studio Packages
            </h1>
          </div>
          <div className="flex justify-center mt-[10px]">
            <p className="md:w-[700px] text-[14px] md:text-[16px] font-medium text-center">
              Each package is designed to give you a seamless photography
              experience with professional results and pricing that suits your
              needs.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-[10px] md:gap-[20px] md:mt-[90px] mt-[30px] md:min-h-[300px]">
          {packages.map((paket, index) => {
            return (
              <Card
                key={index}
                className="max-md:flex max-md:flex-col max-md:gap-[15] w-[160px] md:w-[305px] p-0 overflow-hidden cursor-pointer relative hover:z-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:outline-black hover:outline"
              >
                <CardContent className="p-0">
                  <div className="relative w-[160px] h-[160px] md:w-[305px] md:h-[305px]">
                    <Image
                      src={`/${paket.image}`}
                      alt={paket.name}
                      fill
                      className="object-cover"
                    ></Image>
                  </div>
                </CardContent>
                <CardFooter className="p-0 md:px-[20px] flex flex-col justify-between h-full w-full ">
                  <div className="flex flex-col md:my-[20px]  md:mb-[20px] mb-[5px] w-full">
                    <CardTitle className="md:text-[20px] text-[15px]  max-md:text-center">
                      {paket.name}
                    </CardTitle>
                    <CardDescription className="mt-[5px] max-md:text-center">
                      {paket.price}
                    </CardDescription>
                    <CardDescription className="hidden md:block mt-[5px]">
                      {paket.description}
                    </CardDescription>
                  </div>
                  <div className=" md:mb-[20px] mb-[10px]">
                    <CardDescription className="md:mt-[20px] mt-[5px] text-black">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer outline-black max-md:text-[10px]"
                        onClick={() => handleClick(paket.name)}
                      >
                        <ShoppingCart />
                        Booking Sekarang
                      </Button>
                    </CardDescription>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="mt-[60px]">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}
