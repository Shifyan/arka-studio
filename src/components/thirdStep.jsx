export default function ThirdStep() {
  return (
    <div>
      {/* Alert jika belum memilih paket */}
      {!availableSessionsCount && (
        <div className="max-md:text-[14px] px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">
            ⚠️ Silakan pilih paket terlebih dahulu di tab "Data Diri"
          </p>
        </div>
      )}

      {/* Informasi jumlah sesi yang harus dipilih */}
      {availableSessionsCount && (
        <div className="max-md:text-[14px] py-2 px-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 font-medium">
            📋 Anda perlu memilih {availableSessionsCount} sesi berurutan (
            {selectedSession.length}/{availableSessionsCount} terpilih)
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-4 grid-cols-3 gap-2 mt-[15px] ">
        {session.map((sesi) => {
          const isSelected = selectedSession.includes(sesi.id);
          const isDisabled = !availableSessionsCount;
          const isBookedByOthers = bookedSessionsForSelectedDate.includes(
            sesi.id
          );

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
            const sortedSelected = [...selectedSession].sort((a, b) => a - b);

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
            const maxSelected = sortedSelected[sortedSelected.length - 1];

            // Session must be adjacent (one position before min or after max)
            return sesi.id === minSelected - 1 || sesi.id === maxSelected + 1;
          };

          const canSelect = canSelectConsecutive();

          const handleSessionClick = () => {
            // Jangan izinkan click jika sesi sudah dibooking orang lain
            if (isDisabled || (!canSelect && !isSelected) || isBookedByOthers)
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
                isDisabled || (!canSelect && !isSelected) || isBookedByOthers
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
              <div className="font-semibold text-sm mb-1">Sesi {sesi.id}</div>
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
                const sortedSessions = selectedSession.sort((a, b) => a - b);
                const firstSession = session.find(
                  (s) => s.id === sortedSessions[0]
                );
                const lastSession = session.find(
                  (s) => s.id === sortedSessions[sortedSessions.length - 1]
                );

                if (sortedSessions.length === 1) {
                  return `Sesi ${sortedSessions[0]}: ${firstSession?.time}`;
                } else {
                  const startTime = firstSession?.time.split(" - ")[0];
                  const endTime = lastSession?.time.split(" - ")[1];
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
            selectedSession.length !== availableSessionsCount || isSubmitting
          }
          onClick={handleSubmit}
        >
          {isSubmitting ? "Memproses..." : "Kirim Booking"}
        </Button>
      </div>
    </div>
  );
}
