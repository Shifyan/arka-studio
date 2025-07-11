import prisma from "../lib/prisma.js";

async function main() {
  await prisma.package.createMany({
    data: [
      {
        name: "Solo 30",
        description:
          "Foto pribadi di studio selama 30 menit (1 orang). Termasuk 5 foto edit dan semua file mentah.",
        price: 50000,
        duration: 30,
        image: "/images/packages/solo30.jpg",
      },
      {
        name: "Couple 30",
        description:
          "Sesi pasangan 30 menit di studio (2 orang). Termasuk 8 foto edit dan semua file mentah.",
        price: 100000,
        duration: 30,
        image: "/images/packages/couple30.jpg",
      },
      {
        name: "Family 30",
        description:
          "Paket keluarga 30 menit di studio (hingga 6 orang). Termasuk 10 foto edit dan semua file mentah.",
        price: 125000,
        duration: 30,
        image: "/images/packages/family30.jpg",
      },
      {
        name: "Family 60",
        description:
          "Paket keluarga 1 jam di studio (hingga 6 orang). Termasuk 20 foto edit dan semua file mentah.",
        price: 200000,
        duration: 60,
        image: "/images/packages/family60.jpg",
      },
      {
        name: "Group 60",
        description:
          "Paket kelompok atau kelas 1 jam (lebih dari 6 orang). Termasuk 25 foto edit dan semua file mentah.",
        price: 250000,
        duration: 60,
        image: "/images/packages/group60.jpg",
      },
      {
        name: "Outdoor Solo",
        description:
          "Pemotretan outdoor pribadi 30 menit (1 orang). Termasuk 5 foto edit dan semua file mentah.",
        price: 75000,
        duration: 30,
        image: "/images/packages/outdoor-solo.jpg",
      },
      {
        name: "Outdoor Couple",
        description:
          "Sesi outdoor 30 menit untuk pasangan (2 orang). Termasuk 8 foto edit dan semua file mentah.",
        price: 125000,
        duration: 30,
        image: "/images/packages/outdoor-couple.jpg",
      },
      {
        name: "Outdoor Family 30",
        description:
          "Sesi keluarga outdoor 30 menit (hingga 6 orang). Termasuk 10 foto edit dan semua file mentah.",
        price: 150000,
        duration: 30,
        image: "/images/packages/outdoor-family30.jpg",
      },
      {
        name: "Outdoor Family 60",
        description:
          "Sesi keluarga outdoor 1 jam (hingga 6 orang). Termasuk 20 foto edit dan semua file mentah.",
        price: 225000,
        duration: 60,
        image: "/images/packages/outdoor-family60.jpg",
      },
      {
        name: "Event 60",
        description:
          "Sesi event, komunitas, atau kelas di luar ruangan selama 1 jam (lebih dari 6 orang). Termasuk 25 foto edit dan semua file mentah.",
        price: 300000,
        duration: 60,
        image: "/images/packages/event60.jpg",
      },
    ],
  });

  const packages = await prisma.package.findMany();

  if (packages.length === 0) {
    console.error(
      "❌ Tidak ada data paket ditemukan. Jalankan seed untuk Package dulu."
    );
    process.exit(1);
  }
  await prisma.booking.createMany({
    data: [
      {
        invoiceNumber: "INV-003",
        name: "Andi Wijaya",
        email: "andi@example.com",
        phone: "081234567899",
        packageId: packages[0].id,
        date: new Date("2025-07-14T00:00:00"),
        sessionNumbers: [5, 6, 7, 8], // ← 2 jam
        notes: "Bawa properti sendiri",
        status: "PENDING",
        paymentMethod: "Transfer",
      },
    ],
  });
  console.log("Seed selesai 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
