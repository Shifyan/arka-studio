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

// Multi Step Form
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import FirstStep from "@/components/firstStep";
import SecondStep from "@/components/secondStep";
import ThirdStep from "@/components/thirdStep";
// Form Schema
const formSchema = z.object({
  nama: z.string().min(1),
  email: z.string().email("Bukan Email").min(1),
  noHp: z.string().min(11, "Nomor HP tidak Valid"),
  selectedPackage: z.string().min(1),
  paymentMethod: z.string().min(1),
  notes: z.string(),
  date: z.date().min(new Date()),
  sessionNumber: z.array(z.number().min(1)),
});

// PAGE BOOKING
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
  const [paymentMethods, setPaymentMethods] = useState([
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState("");

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

  // Form
  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      nama: "",
      email: "",
      noHp: "",
      selectedPackage: "",
      paymentMethod: "",
      notes: "",
      date: new Date(),
      sessionNumber: [],
    },
  });

  // Handle Submit
  const handleSubmit = methods.handleSubmit;

  // Trigger
  const trigger = methods.trigger;

  const watch = methods.watch;

  const control = methods.control;

  // Definisikan Step
  const [step, setStep] = useState(1);

  // Fungsi nextStep & backStep
  const onNext = async () => {
    let valid = false;
    if (step === 1)
      valid = await trigger([
        "nama",
        "email",
        "noHp",
        "selectedPackage",
        "paymentMethod",
        "notes",
      ]);
    if (step === 2) valid = await trigger(["date"]);
    if (valid) setStep((s) => s + 1);
    console.log(
      watch([
        "nama",
        "email",
        "noHp",
        "notes",
        "selectedPackage",
        "paymentMethod",
        "date",
      ])
    );
  };

  const selectedPackage = useWatch({
    control: control,
    name: "selectedPackage",
  });

  useEffect(() => {
    console.log(selectedPackage);
  }, [selectedPackage]);

  useEffect(() => {
    console.log(step);
  }, [step]);

  const onBack = () => setStep((s) => s - 1);

  // useEffect(() => {
  //   console.log(date);
  // }, [date]);

  // Ambil Data ketika load halaman
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

  // Durasi Session
  useEffect(() => {
    if (selectedPackage) {
      const found = packages.find((pkg) => pkg.id === selectedPackage);
      if (found) {
        let sessionDuration = found.duration / 30;
        setAvailableSessionsCount(sessionDuration);
      }
    }
  }, [selectedPackage]);

  // useEffect(() => {
  //   console.log(availableSessionsCount);
  // }, [availableSessionsCount]);

  // useEffect(() => {
  //   console.log("Selected Session:", selectedSession);
  // }, [selectedSession]);

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

  // Close Alert
  const closeAlert = () => {
    setAlertDialog((prev) => ({ ...prev, open: false }));
  };

  // Submit Form
  // const handleSubmit = async () => {
  //   setIsSubmitting(true);

  //   // Validasi data
  //   if (
  //     !nama ||
  //     !email ||
  //     !noHp ||
  //     !selectedPackages ||
  //     !selectedPaymentMethod
  //   ) {
  //     showAlert(
  //       "warning",
  //       "Data Tidak Lengkap",
  //       "Harap lengkapi semua data diri, pilihan paket, dan metode pembayaran."
  //     );
  //     setIsSubmitting(false);
  //     return;
  //   }
  //   if (selectedSession.length !== availableSessionsCount) {
  //     showAlert(
  //       "warning",
  //       "Sesi Belum Dipilih",
  //       `Anda harus memilih tepat ${availableSessionsCount} sesi berurutan.`
  //     );
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   const bookingData = {
  //     name: nama,
  //     email,
  //     phone: noHp,
  //     packageId: selectedPackages, // Gunakan ID paket
  //     date: date.toISOString(), // Format tanggal ke ISO string
  //     sessionNumbers: selectedSession.sort((a, b) => a - b),
  //     notes,
  //     paymentMethod: paymentMethod,
  //   };

  //   try {
  //     const response = await fetch("/api/booking", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bookingData),
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       showAlert(
  //         "success",
  //         "Booking Berhasil!",
  //         `Booking Anda berhasil dibuat. Nomor Invoice: ${result.data.booking.invoiceNumber}`,
  //         () => {
  //           // Reset form atau redirect setelah user klik OK
  //           window.location.reload();
  //         },
  //         "OK"
  //       );
  //     } else {
  //       // Tangani error dari server (e.g., sesi sudah dibooking)
  //       showAlert(
  //         "error",
  //         "Booking Gagal",
  //         result.msg || "Terjadi kesalahan saat melakukan booking."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error submitting booking:", error);
  //     showAlert(
  //       "error",
  //       "Kesalahan Sistem",
  //       "Terjadi kesalahan koneksi. Silakan periksa koneksi internet Anda dan coba lagi."
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const onSubmit = async (dataSubmit) => {
    setIsSubmitting(true);
    try {
      const bookingData = {
        name: dataSubmit.nama,
        email: dataSubmit.email,
        phone: dataSubmit.noHp,
        packageId: dataSubmit.selectedPackage,
        paymentMethod: dataSubmit.paymentMethod,
        notes: dataSubmit.notes,
        date: dataSubmit.date.toISOString(),
        sessionNumbers: dataSubmit.sessionNumber,
      };
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (response.ok) {
        setIsSubmitting(false);
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
        setIsSubmitting(false);
        showAlert(
          "error",
          "Booking Gagal",
          result.msg || "Terjadi kesalahan saat melakukan booking."
        );
      }
    } catch (err) {
      console.error("Error submitting booking:", err);
      setIsSubmitting(false);
      showAlert(
        "error",
        "Kesalahan Sistem",
        "Terjadi kesalahan koneksi. Silakan periksa koneksi internet Anda dan coba lagi."
      );
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
          <div className="h-full flex flex-col">
            <div className="flex justify-center mt-[10px] mb-[20px]">
              <h1 className=" font-bold text-[25px] text-center md:text-[35px]">
                Book a Session
              </h1>
            </div>
            <div className="mt-[15px] md:mx-[80px] max-md:mb-[40px] flex-1">
              <form onSubmit={handleSubmit(onSubmit)} className="h-full">
                {step === 1 && (
                  <FirstStep
                    packages={packages}
                    methods={methods}
                    onNext={onNext}
                    paymentMethods={paymentMethods}
                  />
                )}
                {step === 2 && (
                  <SecondStep
                    onBack={onBack}
                    onNext={onNext}
                    methods={methods}
                  />
                )}
                {step === 3 && (
                  <ThirdStep
                    onBack={onBack}
                    methods={methods}
                    sessions={session}
                    packages={packages}
                    isSubmitting={isSubmitting}
                  />
                )}
              </form>
            </div>
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
