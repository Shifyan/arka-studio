import { create } from "zustand";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// Function untuk format tanggal menjadi format Indonesia
const formatDateIndonesia = (date) => {
  if (!date) return "";
  
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

const useStore = create((set, get) => ({
  packages: [],
  bookings: [],

  fetchPackages: async () => {
    try {
      const res = await fetch("/api/packages");
      const data = await res.json();
      const formattedData = data.data.map((item) => ({
        ...item,
        price: formatter.format(item.price),
      }));
      set({ packages: formattedData });
    } catch (err) {
      console.error("Fetch error:", err);
    }
  },

  fetchBookings: async () => {
    try {
      const res = await fetch("/api/booking/dataBooking");
      const data = await res.json();
      if (data.status === "success") {
        set({ bookings: data.data });
      }
    } catch (err) {
      console.error("Fetch bookings error:", err);
    }
  },

  // Function untuk mendapatkan sesi yang sudah dibooking pada tanggal tertentu
  getBookedSessionsForDate: (selectedDate) => {
    const { bookings } = get();
    if (!selectedDate || !bookings.length) return [];
    
    const targetDate = new Date(selectedDate);
    targetDate.setHours(0, 0, 0, 0);
    
    const bookedSessions = new Set();
    
    bookings.forEach(booking => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      
      // Jika tanggal sama dan booking tidak dibatalkan
      if (bookingDate.getTime() === targetDate.getTime() && booking.status !== "CANCELED") {
        booking.sessionNumbers.forEach(sessionNum => {
          bookedSessions.add(sessionNum);
        });
      }
    });
    
    return Array.from(bookedSessions).sort((a, b) => a - b);
  },

  // Function untuk format tanggal
  formatDate: formatDateIndonesia,

  setPackages: (newPackages) => set({ packages: newPackages }),
  setBookings: (newBookings) => set({ bookings: newBookings }),
}));

export default useStore;
