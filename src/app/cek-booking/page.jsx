"use client";
import UnderDevelopmentPage from "@/components/underDevelopmentPage";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CekBooking() {
  const [name, setName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const handleSubmit = () => {
    console.log(name);
    console.log(invoiceNumber);
  };

  // useEffect(() => {
  //   console.log(`${name}, ${invoiceNumber}`);
  // }, [name, invoiceNumber]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-[20px]">
        <Navbar></Navbar>
      </div>
      <div className="w-full flex-1 flex justify-center items-center">
        <Card className="w-[500px] px-[30px] py-[35px]">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <h1 className="text-[23px] font-bold">CEK PESANAN ANDA</h1>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-[20px]">
            <div>
              <div className="mb-[20px]">
                <Label htmlFor="name">Nama :</Label>
                <Input
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="mt-[5px]"
                ></Input>
              </div>
              <div className="mb-[20px]">
                <Label htmlFor="invoiceNumber">Nomor Invoice :</Label>
                <Input
                  id="invoiceNumber"
                  type="text"
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="mt-[5px]"
                ></Input>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="hover:cursor-pointer w-full"
              onClick={handleSubmit}
            >
              Cari Pesanan
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="">
        <Footer></Footer>
      </div>
    </div>
  );
}
