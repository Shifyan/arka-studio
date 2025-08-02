"use client";
import UnderDevelopmentPage from "@/components/underDevelopmentPage";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  let [packages, setPackages] = useState([]);
  useEffect(() => {
    fetch("/api/packages")
      .then((res) => res.json())
      .then((data) => {
        let result = data.data;
        const formattedData = result.map((item) => ({
          ...item,
          price: formatter.format(item.price),
        }));
        setPackages(formattedData);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <div>
      <div className="mt-[20px]">
        <Navbar></Navbar>
      </div>
      <div className=" mt-[60px]">
        <div className="flex  justify-center">
          <h1 className="text-[45px] font-bold">Our Studio Packages</h1>
        </div>
        <div className="flex justify-center mt-[10px]">
          <p className="w-[700px] font-medium text-center">
            Each package is designed to give you a seamless photography
            experience with professional results and pricing that suits your
            needs.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-[20px] mt-[90px] min-h-[300px]">
        {packages.map((paket, index) => {
          return (
            <Card
              key={index}
              className="p-0 overflow-hidden cursor-pointer relative hover:z-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:outline-black hover:outline"
            >
              <CardContent className="p-0">
                <div>
                  <Image
                    src={`/${paket.image}`}
                    alt={paket.name}
                    width={305}
                    height={305}
                  ></Image>
                </div>
              </CardContent>
              <CardFooter className="p-0 max-w-[280px] flex flex-col justify-between h-full">
                <div className="flex flex-col ms-[20px] mb-[20px]">
                  <CardTitle className="text-[20px]">{paket.name}</CardTitle>
                  <CardDescription className="mt-[5px]">
                    {paket.price}
                  </CardDescription>
                  <CardDescription className="mt-[5px]">
                    {paket.description}
                  </CardDescription>
                </div>
                <div className="ms-[20px] mb-[20px]">
                  <CardDescription className="mt-[20px] text-black">
                    <Link href="#">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer outline-black"
                      >
                        <ShoppingCart />
                        Booking Sekarang
                      </Button>
                    </Link>
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
  );
}
