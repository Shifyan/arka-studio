"use client";
import { useState, useEffect } from "react";
import useStore from "@/lib/store";
import { Calendar } from "./ui/calendar";
import { Controller, useWatch } from "react-hook-form";
import { Button } from "./ui/button";

export default function SecondStep({ onNext, onBack, methods }) {
  const { formatDate, getBookedSessionsForDate, bookings } = useStore();
  const [formattedDate, setFormattedDate] = useState("");
  //  formattedDate,
  //   setFormattedDate,

  const [bookedSessionsForSelectedDate, setBookedSessionsForSelectedDate] =
    useState([]);
  const setValue = methods.setValue;
  const watch = methods.watch;
  const control = methods.control;

  const date = useWatch({ control: control, name: "date" });

  // Update formatted date ketika date berubah
  useEffect(() => {
    // Ubah Format Tanggal
    setFormattedDate(formatDate(date));

    // Cari Booking dalam hari terpilih
    const bookedSession = getBookedSessionsForDate(date);
    setBookedSessionsForSelectedDate(bookedSession);

    console.log(date);

    // Reset Pilihan Sesi
    setValue("sessionNumber", []);
  }, [date]);

  // useEffect(() => {
  //   setValue("tanggal", formattedDate);
  //   console.log(date);
  // }, [formattedDate]);

  const selectCalendatHandle = (day, onChange) => {
    if (day) {
      onChange(day);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full items-center">
      <div className="flex flex-col justify-center">
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(day) => selectCalendatHandle(day, field.onChange)}
              className="w-full md:w-[380px]"
              captionLayout="dropdown"
              modifiersStyles={{ weekend: { color: "red" } }}
            />
          )}
        />

        {/* Display formatted date */}
        {formattedDate && (
          <div className="mt-[25px] p-3 bg-blue-50 border border-blue-200 rounded-lg">
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
      <div className="flex justify-between w-full mt-[50px]">
        <Button
          className="bg-red-700 hover:bg-red-800 hover:cursor-pointer"
          onClick={onBack}
        >
          Kembali
        </Button>
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
