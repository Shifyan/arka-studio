export async function POST(request) {
  const dataReq = await request.json();
  console.log(dataReq);
  return Response.json([
    {
      status: "ok",
    },
  ]);
}
