import { BookingStatus } from "@/generated/prisma";
import prisma from "../../../../../lib/prisma";

export async function POST(request) {
  const body = await request.json();
  const invoiceNumber = body.invoiceNumber;

  // check if the request is empty
  if (!invoiceNumber) {
    return Response.json(
      { error: "Invoice number is required" },
      { status: 400 }
    );
  }

  // check if invoice not exist
  const existingBooking = await prisma.booking.findUnique({
    where: { invoiceNumber },
  });
  if (!existingBooking) {
    return Response.json({ error: "invoice not found" }, { status: 404 });
  }

  // Update status to CANCELED
  const updateStatus = await prisma.booking.update({
    where: { invoiceNumber },
    data: { status: BookingStatus.CANCELED },
  });

  return Response.json({ msg: "Order has been canceled" });
}
