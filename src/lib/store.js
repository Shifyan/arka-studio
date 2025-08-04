import { create } from "zustand";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const useStore = create((set) => ({
  packages: [],

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

  setPackages: (newPackages) => set({ packages: newPackages }),
}));

export default useStore;
