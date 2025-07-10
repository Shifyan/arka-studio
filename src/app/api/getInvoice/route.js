export async function POST(request) {
  const body = await request.json();
  const { invoiceNumber, name } = body;

  //check if data invalid
  if ((!invoiceNumber, !name)) {
    return Response.json({ error: "Invalid Data" }, { status: 400 });
  }

  const invoiceData = await prisma.booking.findUnique({
    where: {
      invoiceNumber: invoiceNumber,
      name: name,
    },
  });

  // if the invoice is not found in the database
  if (!invoiceData) {
    return Response.json({ error: "Invoice not found" }, { status: 404 });
  }

  return Response.json({
    msg: "Invoice Found",
    data: {
      invoiceData,
    },
  });
}
