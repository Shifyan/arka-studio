import uniqueNumb from "../../../../lib/nanoid";

export async function POST(request) {
  const order = await request.json();
  const numb = uniqueNumb();
  console.log(numb);
  return Response.json([
    {
      status: "ok",
    },
  ]);
}
