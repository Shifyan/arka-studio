"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStore from "@/lib/store";

export default function Booking() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const { packages, fetchPackages } = useStore();
  const [selectedPackages, setSelectedPackages] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(["Bayar Tunai"]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

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
        <div className="flex justify-center mt-[10px]">
          <h1 className=" font-bold text-[35px]">Book a Session</h1>
        </div>
        <div className="mt-[15px] mx-[80px]">
          <Tabs defaultValue="Data Diri">
            <TabsList className="flex justify-between mx-[120px]">
              <TabsTrigger value="Data Diri">Data Diri</TabsTrigger>
              <TabsTrigger value="Waktu">Waktu</TabsTrigger>
            </TabsList>
            <div className="mt-[10px] mx-[10px]">
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
                    <Label hmtlFor="packages" className="text-[18px] mb-[10px]">
                      Pilihan Paket
                    </Label>
                    <Select
                      defaultValue={selectedPackages}
                      onValueChange={setSelectedPackages}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Packages"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((e, i) => {
                          return (
                            <SelectItem value={e.name} key={i}>
                              {`${e.name}, ${e.price}`}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-[20px]">
                    <Label hmtlFor="packages" className="text-[18px] mb-[10px]">
                      Pilihan Pembayaran
                    </Label>
                    <Select
                      defaultValue={selectedPaymentMethod}
                      onValueChange={setSelectedPaymentMethod}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Packages"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethod.map((e, i) => {
                          return (
                            <SelectItem value={e} key={i}>
                              {e}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
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
