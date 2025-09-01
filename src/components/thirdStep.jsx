"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useWatch, Controller } from "react-hook-form";

export default function ThirdStep({
  onBack,
  methods,
  sessions,
  packages,
  handleSubmit,
}) {
  const [availableSessionsCount, setAvailableSessionsCount] = useState();
  const [bookedSessionsForSelectedDate, setBookedSessionsForSelectedDate] =
    useState([]); // nanti isi dari store/props kamu
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, setValue } = methods;

  // ambil paket yang dipilih
  const selectedPackage = useWatch({ control, name: "selectedPackage" });

  // hitung jumlah sesi dari paket
  useEffect(() => {
    if (selectedPackage) {
      const found = packages.find((pkg) => pkg.id === selectedPackage);
      if (found) {
        let sessionDuration = found.duration / 30;
        setAvailableSessionsCount(sessionDuration);
      }
    }
  }, [selectedPackage, packages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {/* Alert jika belum memilih paket */}
        <div>
          {!availableSessionsCount && (
            <div className="max-md:text-[14px] px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">
                ⚠️ Silakan pilih paket terlebih dahulu di tab "Data Diri"
              </p>
            </div>
          )}
        </div>
        {/* Informasi jumlah sesi */}
        <div>
          {availableSessionsCount && (
            <div className="max-md:text-[14px] py-2 px-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Controller
                control={control}
                name="sessionNumber"
                render={({ field }) => {
                  const selectedSession = field.value || [];

                  // klik sesi
                  const handleSessionClick = (sesi) => {
                    const isSelected = selectedSession.includes(sesi.id);

                    if (isSelected) {
                      field.onChange(
                        selectedSession.filter((id) => id !== sesi.id)
                      );
                    } else {
                      field.onChange([...selectedSession, sesi.id]);
                    }
                  };

                  return (
                    <>
                      <p className="text-blue-700 font-medium">
                        📋 Anda perlu memilih {availableSessionsCount} sesi
                        berurutan ({selectedSession.length}/
                        {availableSessionsCount} terpilih)
                      </p>

                      <div className="grid md:grid-cols-4 grid-cols-3 gap-4 mt-[40px] ">
                        {sessions.map((sesi) => {
                          const isSelected = selectedSession.includes(sesi.id);
                          const isDisabled = !availableSessionsCount;
                          const isBookedByOthers =
                            bookedSessionsForSelectedDate.includes(sesi.id);

                          // disable kalau:
                          // - belum pilih paket, atau
                          // - sudah dibooking orang lain, atau
                          // - sudah full selected tapi sesi ini belum dipilih
                          const isMaxedOut =
                            selectedSession.length >= availableSessionsCount &&
                            !isSelected;

                          const disabled =
                            isDisabled || isBookedByOthers || isMaxedOut;

                          return (
                            <button
                              type="button"
                              key={sesi.id}
                              onClick={() => handleSessionClick(sesi)}
                              disabled={disabled}
                              className={`
                                      py-2 md:px-4 px-2 border-2 rounded-lg text-center transition-all duration-200 relative
                                      ${
                                        isBookedByOthers
                                          ? "border-red-300 bg-red-50 text-red-500 cursor-not-allowed opacity-75"
                                          : isDisabled
                                          ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                          : isMaxedOut
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

                      {/* Konfirmasi sesi */}
                      <div className="mt-[40px] py-2 px-3 bg-green-50 border border-green-200 rounded-lg max-md:text-[14px]">
                        {selectedSession.length > 0 ? (
                          <>
                            <p className="text-green-700 font-medium mb-2 ">
                              ✅ Sesi terpilih ({selectedSession.length}/
                              {availableSessionsCount}):
                            </p>
                            <div className="text-green-800 font-medium">
                              {(() => {
                                const sorted = [...selectedSession].sort(
                                  (a, b) => a - b
                                );
                                const first = sessions.find(
                                  (s) => s.id === sorted[0]
                                );
                                const last = sessions.find(
                                  (s) => s.id === sorted[sorted.length - 1]
                                );

                                if (sorted.length === 1) {
                                  return `Sesi ${sorted[0]}: ${first?.time}`;
                                } else {
                                  const startTime = first?.time.split(" - ")[0];
                                  const endTime = last?.time.split(" - ")[1];
                                  return `Sesi ${sorted[0]}-${
                                    sorted[sorted.length - 1]
                                  }: ${startTime} - ${endTime}`;
                                }
                              })()}
                            </div>
                          </>
                        ) : (
                          <p className="text-gray-500 font-medium">
                            Pilih {availableSessionsCount} sesi berurutan
                          </p>
                        )}
                      </div>
                    </>
                  );
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* Tombol Kirim */}
      <div className=" flex justify-between">
        <Button
          className="bg-red-700 hover:bg-red-900 hover:cursor-pointer"
          onClick={onBack}
        >
          Kembali
        </Button>
        <Button
          className="bg-green-700 hover:bg-green-900 hover:cursor-pointer"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Memproses..." : "Kirim Booking"}
        </Button>
      </div>
    </div>
  );
}
