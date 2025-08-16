import prisma from "../../../../../lib/prisma";
import { BookingStatus } from "@/generated/prisma/client";
export async function GET(req) {
  try {
    const bookingData = await prisma.booking.findMany({
      where: {
        NOT: { status: BookingStatus.CANCELED },
      },
    });

    if (bookingData.length === 0) {
      return Response.json(
        {
          status: "error",
          message: "Data tidak ditemukan",
          data: [],
        },
        { status: 404 }
      );
    }

    return Response.json({
      status: "success",
      message: "Data ditemukan",
      data: bookingData,
    });
  } catch (error) {
    return Response.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
