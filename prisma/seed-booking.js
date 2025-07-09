import prisma from "../lib/prisma.js";

async function main() {
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
        invoiceNumber: "INV-001",
        name: "Raka Putra",
        email: "raka@example.com",
        phone: "081234567890",
        packageId: packages[0].id,
        startDateTime: new Date("2025-07-12T10:00:00"),
        notes: "Mau bawa kostum sendiri",
        status: "PENDING",
        paymentMethod: "Transfer",
        paymentStatus: null,
        paidAt: null,
        canceledAt: null,
      },
      {
        invoiceNumber: "INV-002",
        name: "Dewi Ayu",
        email: "dewi@example.com",
        phone: "089876543210",
        packageId: packages[1]?.id || packages[0].id,
        startDateTime: new Date("2025-07-13T13:30:00"),
        notes: null,
        status: "PENDING",
        paymentMethod: null,
        paymentStatus: null,
        paidAt: null,
        canceledAt: null,
      },
    ],
  });

  console.log("Seed Booking selesai 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
