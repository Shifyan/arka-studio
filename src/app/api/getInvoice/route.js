export async function POST(request) {
  const json = await request.json();
  const { invoiceNumber, name } = json;
  return Response.json({ msg: "ok", invoiceNumber, name });
}
