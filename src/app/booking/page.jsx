"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Booking() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  return (
    <div className="flex justify-between items-start my-[20px] mx-[20px]">
      <div className="relative">
        <Link href="/" className="absolute top-5 left-5 z-10">
          <Button
            variant="secondary"
            className="size-12 rounded-full  cursor-pointer"
            size="icon"
          >
            <CircleArrowLeft className="size-10"></CircleArrowLeft>
          </Button>
        </Link>
        <Image
          src="/booking-pic.jpg"
          width={480}
          height={0}
          alt="Booking Pic"
        ></Image>
      </div>
      <div className="grow">
        <div className="flex justify-center mt-[20px]">
          <h1 className="font-bold text-[40px]">Book a Session</h1>
        </div>
        <div className="mt-[40px] mx-[80px]">
          <Tabs defaultValue="Data Diri">
            <TabsList className="flex justify-between mx-[120px]">
              <TabsTrigger value="Data Diri">Data Diri</TabsTrigger>
              <TabsTrigger value="Waktu">Waktu</TabsTrigger>
            </TabsList>
            <div className="mt-[30px] mx-[10px]">
              <TabsContent value="Data Diri">
                <div>
                  <div>
                    <Label hmtlFor="nama" className="text-[18px]">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="nama"
                      className="mt-[10px]"
                      defaultValue={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                  <div className="mt-[20px]">
                    <Label hmtlFor="email" className="text-[18px]">
                      Email
                    </Label>
                    <Input
                      id="email"
                      defaultValue={email}
                      className="mt-[10px]"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-[20px]">
                    <Label hmtlFor="handphone" className="text-[18px]">
                      No HP
                    </Label>
                    <Input
                      id="handphone"
                      defaultValue={noHp}
                      className="mt-[10px]"
                      onChange={(e) => setNoHp(e.target.value)}
                    />
                  </div>
                  <div className="mt-[20px]">
                    <Label hmtlFor="packages" className="text-[18px]">
                      Pilihan Paket
                    </Label>
                    <Input
                      id="packages"
                      defaultValue={noHp}
                      className="mt-[10px]"
                      onChange={(e) => setNoHp(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
