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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default function CekBooking() {
  const [name, setName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
    data: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const handleCancelSubmit = async () => {
    setIsCancelLoading(true);

    // Tambahkan pengecekan untuk memastikan data ada
    if (!dialogContent.data || !dialogContent.data.invoiceNumber) {
      console.error("Invoice data tidak tersedia");
      setIsCancelLoading(false);
      return;
    }

    const invoiceNumber = dialogContent.data.invoiceNumber;
    try {
      const response = await fetch("api/booking/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceNumber }),
      });
      console.log(response);

      // Refresh data setelah pembatalan berhasil
      if (response.ok) {
        handleSubmit();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsCancelLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Reset state canceled di awal
    setIsCanceled(false);

    // Validasi form kosong
    if (!name.trim() || !invoiceNumber.trim()) {
      setDialogContent({
        title: "Form Tidak Lengkap",
        description:
          "Harap mengisi semua field yang diperlukan (Nama dan Nomor Invoice).",
        data: null,
      });
      setIsDialogOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/getInvoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, invoiceNumber }),
      });

      const result = await response.json();

      if (response.ok && result.data) {
        // Invoice ditemukan
        const invoiceData = result.data.invoiceData[0];
        setDialogContent({
          title: "Invoice Ditemukan",
          description: "Berikut adalah detail pesanan Anda:",
          data: invoiceData,
        });

        // Gunakan data langsung dari response, bukan dari state yang belum ter-update
        const status = invoiceData.status;
        if (status === "CANCELED" || status === "COMPLETED") {
          setIsCanceled(true);
        }
        console.log(dialogContent);
      } else {
        // Invoice tidak ditemukan atau error
        setDialogContent({
          title: "Invoice Tidak Ditemukan",
          description:
            "Maaf, invoice dengan nama dan nomor tersebut tidak ditemukan. Silakan periksa kembali data yang Anda masukkan.",
          data: null,
        });
        setIsCanceled(false); // Reset status canceled jika invoice tidak ditemukan
      }
      console.log(isCanceled);
    } catch (error) {
      console.error("Error:", error);
      setDialogContent({
        title: "Terjadi Kesalahan",
        description:
          "Maaf, terjadi kesalahan saat mencari invoice. Silakan coba lagi.",
        data: null,
      });
    } finally {
      setIsLoading(false);
      setIsDialogOpen(true);
    }
  };

  // useEffect(() => {
  //   console.log(`${name}, ${invoiceNumber}`);
  // }, [name, invoiceNumber]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-[5px] md:mt-[20px]">
        <Navbar></Navbar>
      </div>
      <div className="w-full flex-1 flex justify-center items-center">
        <Card className="w-[500px] px-[30px] md:py-[55px] max-md:border-0 shadow-none">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <h1 className="text-[23px] font-bold">CEK JADWAL ANDA</h1>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-[20px]">
            <div>
              <div className="mb-[20px]">
                <Label htmlFor="name">Nama :</Label>
                <Input
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value.trim())}
                  className="mt-[5px]"
                ></Input>
              </div>
              <div className="mb-[20px]">
                <Label htmlFor="invoiceNumber">Nomor Invoice :</Label>
                <Input
                  id="invoiceNumber"
                  type="text"
                  onChange={(e) => setInvoiceNumber(e.target.value.trim())}
                  className="mt-[5px]"
                ></Input>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="hover:cursor-pointer w-full"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Mencari..." : "Cari Pesanan"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="md:max-w-lg ">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[25px]">
              {dialogContent.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Tampilkan data invoice jika ada */}
          {dialogContent.data && (
            <div className="mt-4 space-y-2">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Nama:</span>
                  <span>{dialogContent.data.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{dialogContent.data.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">No HP:</span>
                  <span>{dialogContent.data.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">No. Invoice:</span>
                  <span className="font-bold">
                    {dialogContent.data.invoiceNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tanggal:</span>
                  <span>
                    {new Date(dialogContent.data.date).toLocaleDateString(
                      "id-ID"
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sesi:</span>
                  <span>{dialogContent.data.sessionNumbers?.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      dialogContent.data.status === "PAID"
                        ? "bg-green-100 text-green-800"
                        : dialogContent.data.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : dialogContent.data.status === "CANCELED"
                        ? "bg-red-100 text-red-800"
                        : dialogContent.data.status === "COMPLETED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {dialogContent.data.status}
                  </span>
                </div>
                {dialogContent.data.notes && (
                  <div className="flex justify-between">
                    <span className="font-medium">Catatan:</span>
                    <span>{dialogContent.data.notes}</span>
                  </div>
                )}

                {/* Status Messages */}
                {dialogContent.data.status === "COMPLETED" && (
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-800 font-medium">
                        Pesanan Selesai
                      </span>
                    </div>
                    <p className="text-blue-700 text-sm mt-1">
                      Pesanan Anda telah selesai. Terima kasih telah menggunakan
                      layanan kami!
                    </p>
                  </div>
                )}

                {dialogContent.data.status === "CANCELED" && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-800 font-medium">
                        Pesanan Dibatalkan
                      </span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">
                      Pesanan ini telah dibatalkan. Jika ada pertanyaan, silakan
                      hubungi customer service.
                    </p>
                  </div>
                )}

                {/* Tombol Batalkan hanya untuk status PAID dan PENDING */}
                {!isCanceled &&
                  (dialogContent.data.status === "PAID" ||
                    dialogContent.data.status === "PENDING") && (
                    <Button
                      variant="destructive"
                      className="hover:cursor-pointer"
                      onClick={handleCancelSubmit}
                      disabled={isCancelLoading}
                    >
                      <TriangleAlert />
                      {isCancelLoading
                        ? "Proses Pembatalan..."
                        : "Batalkan Pesanan"}
                    </Button>
                  )}
              </div>
            </div>
          )}

          <AlertDialogFooter className="mt-[20px]">
            <AlertDialogAction
              className="hover:cursor-pointer"
              onClick={() => setIsDialogOpen(false)}
            >
              Tutup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="">
        <Footer></Footer>
      </div>
    </div>
  );
}
