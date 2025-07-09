import prisma from "../../../../lib/prisma"; // pastikan alias benar

export async function GET(request) {
  const packages = await prisma.package.findMany();
  if (packages.length === 0) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Tidak ada paket ditemukan",
        data: [],
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return Response.json({
    status: "success",
    message: "Paket ditemukan",
    data: packages,
  });
}
