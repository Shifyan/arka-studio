import generateInvoice from "../../../../lib/generateInvocie";
import prisma from "../../../../lib/prisma";
import { BookingStatus } from "@/generated/prisma";

export async function POST(request) {
  const body = await request.json();
  let invoiceNumber = generateInvoice();
  let {
    name,
    email,
    phone,
    packageId,
    date,
    sessionNumbers,
    notes,
    paymentMethod,
  } = body;

  // Cek Kelengkapan Data
  if (
    !name ||
    !email ||
    !phone ||
    !packageId ||
    !date ||
    !sessionNumbers?.length ||
    !paymentMethod
  ) {
    return Response.json({ msg: "Invalid Data" }, { status: 400 });

    // new Response(JSON.stringify({ message: "Data tidak lengkap" }), {
    //   status: 400,
    // });
  }

  // create booking date
  const bookingDate = new Date(date);
  bookingDate.setHours(0, 0, 0, 0);

  // Check if session is booked
  const existing = await prisma.booking.findMany({
    where: {
      date: bookingDate,
      sessionNumbers: { hasSome: sessionNumbers },
      status: {
        in: [
          BookingStatus.PENDING,
          BookingStatus.PAID,
          BookingStatus.COMPLETED,
        ],
      },
    },
  });

  if (existing.length > 0) {
    return Response.json({ msg: "session already booked" }, { status: 409 });

    // new Response(JSON.stringify({ message: "Sesi sudah dibooking" }), {
    //   status: 409,
    // });
  }

  // insert data to database
  const booking = await prisma.booking.create({
    data: {
      invoiceNumber,
      name,
      email,
      phone,
      packageId,
      date: bookingDate,
      sessionNumbers,
      notes,
      paymentMethod,
      status: "PENDING",
    },
  });
  return Response.json({
    msg: "order created successfully",
    data: { booking },
  });
}
