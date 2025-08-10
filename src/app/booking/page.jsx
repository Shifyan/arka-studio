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
import { Calendar } from "@/components/ui/calendar";

export default function Booking() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const { packages, fetchPackages } = useStore();
  const [selectedPackages, setSelectedPackages] = useState("");
  const [paymentMethod, setPaymentMethod] = useState([
    "Bayar Tunai",
    "Transfer",
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [date, setDate] = useState(new Date());
  const [session, setSession] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);
  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <div className=" flex justify-between items-start my-[20px] mx-[20px]">
      <div className="relative ">
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
            <TabsList className="flex justify-between mx-[140px]">
              <TabsTrigger value="Data Diri">Data Diri</TabsTrigger>
              <TabsTrigger value="Waktu">Tanggal</TabsTrigger>
              <TabsTrigger value="Sesi">Sesi</TabsTrigger>
            </TabsList>
            <div className="mt-[10px] mx-[50px] ">
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
                    <Label hmtlFor="handphone" className="text-[18px] s">
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
                              {`Paket ${e.name}, Harga ${e.price}, Durasi ${e.duration} Menit`}
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
              <TabsContent value="Waktu">
                <div className="flex">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                  ></Calendar>
                  <div>
                    <Label hmtlFor="packages" className="text-[18px] mb-[10px]">
                      Pilihan Sesi
                    </Label>
                    <Select
                      defaultValue={selectedSession}
                      onValueChange={setSelectedSession}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Session"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {session.map((e, i) => {
                          return (
                            <SelectItem value={e} key={i}>
                              {`Sesi Nomor ${e}`}
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
