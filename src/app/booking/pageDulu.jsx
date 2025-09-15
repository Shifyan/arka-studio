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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Booking() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const {
    packages,
    bookings,
    fetchPackages,
    fetchBookings,
    getBookedSessionsForDate,
    formatDate,
  } = useStore();
  const [selectedPackages, setSelectedPackages] = useState("");
  const [paymentMethod, setPaymentMethod] = useState([
    "Bayar Tunai",
    "Transfer",
  ]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [bookedSessionsForSelectedDate, setBookedSessionsForSelectedDate] =
    useState([]);
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
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AlertDialog states
  const [alertDialog, setAlertDialog] = useState({
    open: false,
    type: "error", // "error", "success", "warning"
    title: "",
    description: "",
    onConfirm: () => {},
    confirmText: "OK",
    showCancel: false,
  });

  useEffect(() => {
    fetchPackages();
    fetchBookings();
  }, []);

  // Update formatted date ketika date berubah
  useEffect(() => {
    if (date) {
      setFormattedDate(formatDate(date));
      // Update booked sessions untuk tanggal yang dipilih
      const bookedSessions = getBookedSessionsForDate(date);
      setBookedSessionsForSelectedDate(bookedSessions);
      // Reset selected sessions ketika tanggal berubah
      setSelectedSession([]);
    }
  }, [date, bookings]);

  useEffect(() => {
    if (selectedPackages) {
      const found = packages.find((pkg) => pkg.name === selectedPackages);
      if (found) {
        let sessionDuration = found.duration / 30;
        setAvailableSessionsCount(sessionDuration);
      }
    }
  }, [selectedPackages]);

  // Helper function untuk menampilkan alert dialog
  const showAlert = (
    type,
    title,
    description,
    onConfirm = () => {},
    confirmText = "OK",
    showCancel = false
  ) => {
    setAlertDialog({
      open: true,
      type,
      title,
      description,
      onConfirm,
      confirmText,
      showCancel,
    });
  };

  const closeAlert = () => {
    setAlertDialog((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validasi data
    if (
      !nama ||
      !email ||
      !noHp ||
      !selectedPackages ||
      !selectedPaymentMethod
    ) {
      showAlert(
        "warning",
        "Data Tidak Lengkap",
        "Harap lengkapi semua data diri, pilihan paket, dan metode pembayaran."
      );
      setIsSubmitting(false);
      return;
    }
    if (selectedSession.length !== availableSessionsCount) {
      showAlert(
        "warning",
        "Sesi Belum Dipilih",
        `Anda harus memilih tepat ${availableSessionsCount} sesi berurutan.`
      );
      setIsSubmitting(false);
      return;
    }

    const selectedPackage = packages.find((p) => p.name === selectedPackages);

    const bookingData = {
      name: nama,
      email,
      phone: noHp,
      packageId: selectedPackage?.id, // Gunakan ID paket
      date: date.toISOString(), // Format tanggal ke ISO string
      sessionNumbers: selectedSession.sort((a, b) => a - b),
      notes,
      paymentMethod: selectedPaymentMethod,
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        showAlert(
          "success",
          "Booking Berhasil!",
          `Booking Anda berhasil dibuat. Nomor Invoice: ${result.data.booking.invoiceNumber}`,
          () => {
            // Reset form atau redirect setelah user klik OK
            window.location.reload();
          },
          "OK"
        );
      } else {
        // Tangani error dari server (e.g., sesi sudah dibooking)
        showAlert(
          "error",
          "Booking Gagal",
          result.msg || "Terjadi kesalahan saat melakukan booking."
        );
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      showAlert(
        "error",
        "Kesalahan Sistem",
        "Terjadi kesalahan koneksi. Silakan periksa koneksi internet Anda dan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex gap-6 md:my-[20px] max-md:justify-center md:mx-[20px] min-h-screen">
        <div className="relative md:w-[480px] flex-shrink-0 max-md:hidden">
          <Link href="/" className="absolute top-5 left-5 z-10">
            <Button
              variant="secondary"
              className="size-12 rounded-full cursor-pointer shadow-lg"
              size="icon"
            >
              <CircleArrowLeft className="size-10"></CircleArrowLeft>
            </Button>
          </Link>
          <Image
            src="/booking-pic.jpg"
            width={480}
            height={725}
            alt="Booking Pic"
            className="object-cover h-[725px] w-full rounded-lg shadow-lg max-md:hidden"
          />
        </div>
        <div className="md:grow max-md:max-w-[375px] max-md:w-full max-md:px-[20px]">
          <div className="md:hidden max-md:mt-[20px]">
            <Link href="/" className="">
              <Button
                variant="outline"
                className="py-[15px] border-0 shadow-none hover:cursor-pointer"
              >
                <CircleArrowLeft className="size-6"></CircleArrowLeft>Kembali
              </Button>
            </Link>
          </div>
          <div className="flex justify-center mt-[10px]">
            <h1 className=" font-bold text-[25px] text-center md:text-[35px]">
              Book a Session
            </h1>
          </div>
          <div className="mt-[15px] md:mx-[80px] max-md:mb-[40px]">
            <Tabs defaultValue="Data Diri">
              <TabsList className="flex justify-between md:mx-[140px]">
                <TabsTrigger value="Data Diri">Data Diri</TabsTrigger>
                <TabsTrigger value="Waktu">Tanggal</TabsTrigger>
                <TabsTrigger value="Sesi">Sesi</TabsTrigger>
              </TabsList>
              <div className="mt-[10px] md:mx-[50px] ">
                <TabsContent value="Data Diri">
                  <div>
                    <div>
                      <Label htmlFor="nama" className="text-[18px]">
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
                      <Label htmlFor="email" className="text-[18px]">
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
                      <Label htmlFor="handphone" className="text-[18px] s">
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
                      <Label
                        htmlFor="packages"
                        className="text-[18px] mb-[10px]"
                      >
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
                                {/* Tampilan mobile */}
                                <span className="block md:hidden">
                                  {e.name}, {e.price}, {e.duration} Menit
                                </span>

                                {/* Tampilan desktop */}
                                <span className="hidden md:block">
                                  {`Paket ${e.name}, Harga ${e.price}, Durasi ${e.duration} Menit`}
                                </span>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mt-[20px]">
                      <Label
                        htmlFor="packages"
                        className="text-[18px] mb-[10px]"
                      >
                        Pilihan Pembayaran
                      </Label>
                      <Select
                        defaultValue={selectedPaymentMethod}
                        onValueChange={setSelectedPaymentMethod}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Payment Method"></SelectValue>
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
                    <div className="mt-[20px]">
                      <Label htmlFor="notes" className="text-[18px] mb-[10px]">
                        Catatan (Opsional)
                      </Label>
                      <Input
                        id="notes"
                        placeholder="Masukkan catatan tambahan..."
                        value={notes}
                        className="mt-[10px]"
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="Waktu">
                  <div className="flex flex-col items-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="w-[280px] md:w-[380px]"
                      captionLayout="dropdown"
                      modifiersStyles={{ weekend: { color: "red" } }}
                    ></Calendar>

                    {/* Display formatted date */}
                    {formattedDate && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-700 font-medium text-center">
                          📅 Tanggal terpilih:{" "}
                          <span className="font-bold">{formattedDate}</span>
                        </p>
                        {bookedSessionsForSelectedDate.length > 0 && (
                          <p className="text-orange-600 text-sm mt-1 text-center">
                            ⚠️ Sesi yang sudah terbooking:{" "}
                            {bookedSessionsForSelectedDate.join(", ")}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="Sesi">
                  <div>
                    {/* Alert jika belum memilih paket */}
                    {!availableSessionsCount && (
                      <div className="max-md:text-[14px] px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 font-medium">
                          ⚠️ Silakan pilih paket terlebih dahulu di tab "Data
                          Diri"
                        </p>
                      </div>
                    )}

                    {/* Informasi jumlah sesi yang harus dipilih */}
                    {availableSessionsCount && (
                      <div className="max-md:text-[14px] py-2 px-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-700 font-medium">
                          📋 Anda perlu memilih {availableSessionsCount} sesi
                          berurutan ({selectedSession.length}/
                          {availableSessionsCount} terpilih)
                        </p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-4 grid-cols-3 gap-2 mt-[15px] ">
                      {session.map((sesi) => {
                        const isSelected = selectedSession.includes(sesi.id);
                        const isDisabled = !availableSessionsCount;
                        const isBookedByOthers =
                          bookedSessionsForSelectedDate.includes(sesi.id);

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

                          if (
                            selectedSession.length >= availableSessionsCount
                          ) {
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
                            if (
                              sortedSelected[i] !==
                              sortedSelected[i - 1] + 1
                            ) {
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
                          // Jangan izinkan click jika sesi sudah dibooking orang lain
                          if (
                            isDisabled ||
                            (!canSelect && !isSelected) ||
                            isBookedByOthers
                          )
                            return;

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
                            disabled={
                              isDisabled ||
                              (!canSelect && !isSelected) ||
                              isBookedByOthers
                            }
                            className={`
                            py-2 md:px-4 px-2 border-2 rounded-lg text-center transition-all duration-200 relative 
                            ${
                              isBookedByOthers
                                ? "border-red-300 bg-red-50 text-red-500 cursor-not-allowed opacity-75"
                                : isDisabled
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
                            <div className="text-xs ">{sesi.time}</div>
                            {isBookedByOthers && (
                              <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1">
                                <span className="text-xs bg-red-500 text-white px-1 py-0.5 rounded-full font-bold">
                                  ✕
                                </span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Konfirmasi sesi - selalu tampil untuk menjaga height */}
                    <div className="mt-2 py-2 px-3 bg-green-50 border border-green-200 rounded-lg max-md:text-[14px]">
                      {selectedSession.length > 0 ? (
                        <>
                          <p className="text-green-700 font-medium mb-2 ">
                            ✅ Sesi terpilih ({selectedSession.length}/
                            {availableSessionsCount}):
                          </p>
                          <div className="text-green-800 font-medium">
                            {(() => {
                              const sortedSessions = selectedSession.sort(
                                (a, b) => a - b
                              );
                              const firstSession = session.find(
                                (s) => s.id === sortedSessions[0]
                              );
                              const lastSession = session.find(
                                (s) =>
                                  s.id ===
                                  sortedSessions[sortedSessions.length - 1]
                              );

                              if (sortedSessions.length === 1) {
                                return `Sesi ${sortedSessions[0]}: ${firstSession?.time}`;
                              } else {
                                const startTime =
                                  firstSession?.time.split(" - ")[0];
                                const endTime =
                                  lastSession?.time.split(" - ")[1];
                                return `Sesi ${sortedSessions[0]}-${
                                  sortedSessions[sortedSessions.length - 1]
                                }: ${startTime} - ${endTime}`;
                              }
                            })()}
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-500 font-medium">
                          {availableSessionsCount
                            ? `Pilih ${availableSessionsCount} sesi berurutan`
                            : "Belum ada sesi yang dipilih"}
                        </p>
                      )}
                    </div>

                    {/* Tombol Kirim */}
                    <div className="mt-4 flex justify-center">
                      <Button
                        className="px-8 py-3 text-lg font-semibold hover:cursor-pointer"
                        size="lg"
                        disabled={
                          selectedSession.length !== availableSessionsCount ||
                          isSubmitting
                        }
                        onClick={handleSubmit}
                      >
                        {isSubmitting ? "Memproses..." : "Kirim Booking"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* AlertDialog component */}
      <AlertDialog open={alertDialog.open} onOpenChange={closeAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {alertDialog.type === "success" && "✅ "}
              {alertDialog.type === "error" && "❌ "}
              {alertDialog.type === "warning" && "⚠️ "}
              {alertDialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-[10px]">
              {alertDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {alertDialog.showCancel && (
              <AlertDialogCancel
                className="px-6 hover:cursor-pointer"
                onClick={closeAlert}
              >
                Batal
              </AlertDialogCancel>
            )}
            <AlertDialogAction
              onClick={() => {
                alertDialog.onConfirm();
                closeAlert();
              }}
              className={
                alertDialog.type === "success"
                  ? "px-[20px] bg-green-600 hover:bg-green-700 hover:cursor-pointer"
                  : alertDialog.type === "error"
                  ? "px-[20px] bg-red-600 hover:bg-red-700 hover:cursor-pointer"
                  : alertDialog.type === "warning"
                  ? "px-[20px] bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer"
                  : "px-[20px]"
              }
            >
              {alertDialog.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
