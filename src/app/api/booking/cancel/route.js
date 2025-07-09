export async function POST(request) {
  const json = await request.json();
  return Response.json({ msg: "ok", data: json });
}
