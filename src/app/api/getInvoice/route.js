import prisma from "../../../../lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, invoiceNumber } = body;
    // check if data invalid
    if (!invoiceNumber || !name) {
      return Response.json({ error: "Invalid Data" }, { status: 400 });
    }

    const invoiceData = await prisma.booking.findMany({
      where: {
        AND: [
          { name: { equals: name, mode: "insensitive" } },
          { invoiceNumber: { equals: invoiceNumber } },
        ],
      },
    });

    // if the invoice is not found in the database
    if (invoiceData.length === 0) {
      return Response.json({ error: "Invoice not found" }, { status: 404 });
    }

    return Response.json({
      msg: "Invoice Found",
      data: {
        invoiceData,
      },
    });
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
