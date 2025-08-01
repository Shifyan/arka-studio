"use client";
import UnderDevelopmentPage from "@/components/underDevelopmentPage";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
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
  let [packages, setPackages] = useState([]);
  // useEffect(() => {
  //   fetch("/api/packages")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let result = data.data;
  //       setPackages(result);
  //     })
  //     .catch((err) => {
  //       console.error("Fetch error:", err);
  //     });
  // }, []);
  // console.log(packages);
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
      <div className="flex flex-wrap justify-center gap-[20px] mt-[90px]">
        <Card className="p-0 overflow-hidden">
          <CardContent className="p-0">
            <div>
              <Image
                src="/package-1.jpg"
                alt="Package"
                width={305}
                height={305}
              ></Image>
            </div>
          </CardContent>
          <CardFooter className="p-0  max-w-[280px]">
            <div className="flex flex-col ms-[20px] mb-[20px]">
              <CardTitle className="text-[20px]">Paket ABC</CardTitle>
              <CardDescription className="mt-[5px]">
                Rp. 900.000
              </CardDescription>
              <CardDescription className="mt-[5px]">
                Paket Dengan Durasi 10 jam Dan wwkwkwkw
              </CardDescription>
            </div>
          </CardFooter>
        </Card>
        <Card className="p-0">
          <CardContent className="p-0">
            <div>
              <Image src="/" alt="Package" width={305} height={305}></Image>
            </div>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-0">
            <div>
              <Image src="/" alt="Package" width={305} height={305}></Image>
            </div>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-0">
            <div>
              <Image src="/" alt="Package" width={305} height={305}></Image>
            </div>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-0">
            <div>
              <Image src="/" alt="Package" width={305} height={305}></Image>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-[60px]">
        <Footer></Footer>
      </div>
    </div>
  );
}
