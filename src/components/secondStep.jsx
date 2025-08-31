"use client";
import Calendar from "./calendar";
import { useState, useEffect } from "react";
import useStore from "@/lib/store";

export default function SecondStep({ onNext, onBack, methods }) {
  const [date, setDate] = useState(new Date());
  const [formatDate, getBookedSessionsForDate, bookings] = useStore();
  const [formattedDate, setFormattedDate] = useStore("");
  const [bookedSessionsForSelectedDate, setBookedSessionsForSelectedDate] =
    useState([]);
  const [setValue] = methods;

  // Update formatted date ketika date berubah
  useEffect(() => {
    // Ubah Format Tanggal
    setFormattedDate(formatDate(date));

    // Cari Booking dalam hari terpilih
    const bookedSession = getBookedSessionsForDate(date);
    setBookedSessionsForSelectedDate(bookedSession);

    // Reset Pilihan Sesi
    setValue("selectedSession", []);
  }, [date, bookings]);

  useEffect(() => {
    setValue("tanggal", formattedDate);
  }, [formattedDate]);

  return (
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
  );
}
