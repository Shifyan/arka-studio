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
  const [availableSessionsCount, setAvailableSessionsCount] = useState("");
  const [session, setSession] = useState([
    { id: 1, time: "09:00 - 09:30" },
    { id: 2, time: "09:30 - 10:00" },
    { id: 3, time: "10:00 - 10:30" },
    { id: 4, time: "10:30 - 11:00" },
    { id: 5, time: "11:00 - 11:30" },
    { id: 6, time: "11:30 - 12:00" },
    { id: 7, time: "12:00 - 12:30" },
    { id: 8, time: "12:30 - 13:00" },
    { id: 9, time: "13:00 - 13:30" },
    { id: 10, time: "13:30 - 14:00" },
    { id: 11, time: "14:00 - 14:30" },
    { id: 12, time: "14:30 - 15:00" },
    { id: 13, time: "15:00 - 15:30" },
    { id: 14, time: "15:30 - 16:00" },
    { id: 15, time: "16:00 - 16:30" },
    { id: 16, time: "16:30 - 17:00" },
  ]);
  const [selectedSession, setSelectedSession] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (selectedPackages) {
      const found = packages.find((pkg) => pkg.name === selectedPackages);
      if (found) {
        let sessionDuration = found.duration / 30;
        setAvailableSessionsCount(sessionDuration);
      }
    }
  }, [selectedPackages]);

  useEffect(() => {
    console.log(availableSessionsCount);
  }, [availableSessionsCount]);

  useEffect(() => {
    console.log("Selected Session:", selectedSession);
  }, [selectedSession]);

  // Reset selected sessions when package changes
  useEffect(() => {
    if (availableSessionsCount) {
      setSelectedSession([]);
    }
  }, [availableSessionsCount]);

  return (
    <div className=" flex justify-between items-start my-[20px] mx-[20px]">
      <div className="relative ">
        <Link href="/" className="absolute top-5 left-5 z-10 ">
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
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="w-[380px]"
                  ></Calendar>
                </div>
              </TabsContent>
              <TabsContent value="Sesi">
                <div>
                  {/* Alert jika belum memilih paket */}
                  {!availableSessionsCount && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 font-medium">
                        ⚠️ Silakan pilih paket terlebih dahulu di tab "Data
                        Diri" untuk menentukan jumlah sesi yang dapat dipilih.
                      </p>
                    </div>
                  )}

                  {/* Informasi jumlah sesi yang harus dipilih */}
                  {availableSessionsCount && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-700 font-medium">
                        📋 Anda perlu memilih {availableSessionsCount} sesi
                        berurutan ({selectedSession.length}/
                        {availableSessionsCount} terpilih)
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-4 gap-3 mt-[15px]">
                    {session.map((sesi) => {
                      const isSelected = selectedSession.includes(sesi.id);
                      const isDisabled = !availableSessionsCount;

                      // Function to check if session can be selected based on consecutive rule
                      const canSelectConsecutive = () => {
                        if (selectedSession.length === 0) {
                          // First selection - any session can be selected
                          return true;
                        }

                        if (isSelected) {
                          // Already selected - can always deselect
                          return true;
                        }

                        if (selectedSession.length >= availableSessionsCount) {
                          // Already reached max selection
                          return false;
                        }

                        // Check if this session is adjacent to the current consecutive block
                        const sortedSelected = [...selectedSession].sort(
                          (a, b) => a - b
                        );

                        // Verify current selection is consecutive
                        let isCurrentConsecutive = true;
                        for (let i = 1; i < sortedSelected.length; i++) {
                          if (sortedSelected[i] !== sortedSelected[i - 1] + 1) {
                            isCurrentConsecutive = false;
                            break;
                          }
                        }

                        if (!isCurrentConsecutive) {
                          // Current selection is not consecutive, should not happen but handle it
                          return false;
                        }

                        const minSelected = sortedSelected[0];
                        const maxSelected =
                          sortedSelected[sortedSelected.length - 1];

                        // Session must be adjacent (one position before min or after max)
                        return (
                          sesi.id === minSelected - 1 ||
                          sesi.id === maxSelected + 1
                        );
                      };

                      const canSelect = canSelectConsecutive();

                      const handleSessionClick = () => {
                        if (isDisabled || (!canSelect && !isSelected)) return;

                        if (isSelected) {
                          // Remove from selection
                          setSelectedSession(
                            selectedSession.filter((id) => id !== sesi.id)
                          );
                        } else {
                          // Add to selection (already checked canSelect above)
                          setSelectedSession([...selectedSession, sesi.id]);
                        }
                      };

                      return (
                        <button
                          key={sesi.id}
                          onClick={handleSessionClick}
                          disabled={isDisabled || (!canSelect && !isSelected)}
                          className={`
                            p-4 border-2 rounded-lg text-center transition-all duration-200
                            ${
                              isDisabled
                                ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                : !canSelect && !isSelected
                                ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                : isSelected
                                ? "border-blue-500 bg-blue-50 text-blue-700 hover:scale-105"
                                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:scale-105 cursor-pointer"
                            }
                          `}
                        >
                          <div className="font-semibold text-sm mb-1">
                            Sesi {sesi.id}
                          </div>
                          <div className="text-xs">{sesi.time}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Konfirmasi sesi terpilih */}
                  {selectedSession.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 font-medium mb-2">
                        ✅ Sesi terpilih ({selectedSession.length}/
                        {availableSessionsCount}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSession
                          .sort((a, b) => a - b)
                          .map((sessionId) => {
                            const sessionData = session.find(
                              (s) => s.id === sessionId
                            );
                            return (
                              <span
                                key={sessionId}
                                className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                              >
                                Sesi {sessionId} ({sessionData?.time})
                              </span>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* Tombol Kirim */}
                  <div className="mt-6 flex justify-center">
                    <Button
                      className="px-8 py-3 text-lg font-semibold"
                      size="lg"
                      disabled={
                        selectedSession.length !== availableSessionsCount
                      }
                    >
                      Kirim Booking
                    </Button>
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
