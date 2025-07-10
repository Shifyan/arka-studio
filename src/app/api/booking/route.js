import uniqueNumb from "../../../../lib/nanoid";
import prisma from "../../../../lib/prisma";

export async function POST(request) {
  const order = await request.json();
  let invoiceNumber = `INV-${uniqueNumb()}`;
  let {
    name,
    email,
    phone,
    packageId,
    date,
    sessionNumbers,
    notes,
    paymentMethod,
  } = order;
  const booking = await prisma.booking.create({
    data: {
      invoiceNumber,
      name,
      email,
      phone,
      packageId,
      date: date,
      sessionNumbers,
      notes,
      paymentMethod,
      status: "PENDING",
    },
  });
  return Response.json([
    {
      status: "ok",
      data: {
        booking,
      },
    },
  ]);
}
