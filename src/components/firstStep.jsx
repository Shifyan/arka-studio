import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

export default function FirstStep({
  packages,
  methods,
  onNext,
  paymentMethods,
}) {
  const register = methods.register;
  const control = methods.control;
  const watch = methods.watch;
  return (
    <div className="md:h-full flex flex-col md:justify-between">
      <div>
        <div>
          <Label htmlFor="nama" className="text-[18px]">
            Nama Lengkap
          </Label>
          <Input
            id="nama"
            className="mt-[10px]"
            defaultValue={watch("nama")}
            {...register("nama")}
          />
        </div>
        <div className="mt-[20px]">
          <Label htmlFor="email" className="text-[18px]">
            Email
          </Label>
          <Input
            id="email"
            defaultValue={watch("email")}
            className="mt-[10px]"
            {...register("email")}
          />
        </div>
        <div className="mt-[20px] ">
          <Label htmlFor="handphone" className="text-[18px] ">
            No HP
          </Label>
          <Input
            id="handphone"
            defaultValue={watch("noHp")}
            className="mt-[10px]"
            {...register("noHp")}
          />
        </div>
        <div className="mt-[20px]">
          <Label htmlFor="packages" className="text-[18px] mb-[10px]">
            Pilihan Paket
          </Label>
          <Controller
            name="selectedPackage"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Packages" />
                </SelectTrigger>
                <SelectContent>
                  {packages.map((e, i) => (
                    <SelectItem value={e.id} key={i}>
                      <span className="block md:hidden">
                        {e.name}, {e.price}, {e.duration} Menit
                      </span>
                      <span className="hidden md:block">
                        {`Paket ${e.name}, Harga ${e.price}, Durasi ${e.duration} Menit`}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="mt-[20px] ">
          <Label htmlFor="packages" className="text-[18px] mb-[10px]">
            Pilihan Pembayaran
          </Label>
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((e, i) => (
                    <SelectItem value={e} key={i}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="mt-[20px]">
          <Label htmlFor="notes" className="text-[18px] mb-[10px]">
            Catatan (Opsional)
          </Label>
          <Input
            id="notes"
            placeholder="Masukkan catatan tambahan..."
            value={watch("notes")}
            className="mt-[10px]"
            {...register("notes")}
          />
        </div>
      </div>
      <div className="w-full flex justify-end mt-[50px]">
        <Button
          className="bg-blue-700 hover:bg-blue-800 hover:cursor-pointer"
          onClick={onNext}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
