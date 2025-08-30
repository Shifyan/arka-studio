import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";

export default function FirstStep({ packages, register, errors, onNext }) {
  return (
    <div>
      <div>
        <Label htmlFor="nama" className="text-[18px]">
          Nama Lengkap
        </Label>
        <Input
          id="nama"
          className="mt-[10px]"
          defaultValue={nama}
          {...register("name")}
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
          {...register("email")}
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
          {...register("noHp")}
        />
      </div>
      <div className="mt-[20px]">
        <Label htmlFor="packages" className="text-[18px] mb-[10px]">
          Pilihan Paket
        </Label>
        <Select
          defaultValue={selectedPackages}
          onValueChange={setSelectedPackages}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Packages"></SelectValue>
          </SelectTrigger>
          <SelectContent {...register("package")}>
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
        <Label htmlFor="packages" className="text-[18px] mb-[10px]">
          Pilihan Pembayaran
        </Label>
        <Select
          defaultValue={selectedPaymentMethod}
          onValueChange={setSelectedPaymentMethod}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Payment Method"></SelectValue>
          </SelectTrigger>
          <SelectContent {...register("paymentMethod")}>
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
          {...register("notes")}
        />
      </div>
    </div>
  );
}
