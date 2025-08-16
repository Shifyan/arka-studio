import generateInvoice from "../../../../lib/generateInvocie";
import prisma from "../../../../lib/prisma";
import { BookingStatus } from "@/generated/prisma";
import nodemailer from "nodemailer";
export async function POST(request) {
  const body = await request.json();
  let invoiceNumber = generateInvoice();
  let {
    name,
    email,
    phone,
    packageId,
    date,
    sessionNumbers,
    notes,
    paymentMethod,
  } = body;

  // Cek Kelengkapan Data
  if (
    !name ||
    !email ||
    !phone ||
    !packageId ||
    !date ||
    !sessionNumbers?.length ||
    !paymentMethod
  ) {
    return Response.json({ msg: "Invalid Data" }, { status: 400 });

    // new Response(JSON.stringify({ message: "Data tidak lengkap" }), {
    //   status: 400,
    // });
  }

  // create booking date
  const bookingDate = new Date(date);
  bookingDate.setHours(0, 0, 0, 0);

  // Check if session is booked
  const existing = await prisma.booking.findMany({
    where: {
      date: bookingDate,
      sessionNumbers: { hasSome: sessionNumbers },
      status: {
        in: [
          BookingStatus.PENDING,
          BookingStatus.PAID,
          BookingStatus.COMPLETED,
        ],
      },
    },
  });

  if (existing.length > 0) {
    return Response.json({ msg: "session already booked" }, { status: 409 });

    // new Response(JSON.stringify({ message: "Sesi sudah dibooking" }), {
    //   status: 409,
    // });
  }

  // insert data to database
  try {
    const booking = await prisma.booking.create({
      data: {
        invoiceNumber,
        name,
        email,
        phone,
        packageId,
        date: bookingDate,
        sessionNumbers,
        notes,
        paymentMethod,
        status: "PENDING",
      },
    });

    // hanya jalan kalau create berhasil
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Arka Studio-Booking Berhasil!",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
      <h2 style="color: #4CAF50;">Booking Berhasil 🎉</h2>
      <p>Halo <b>${name}</b>,</p>
      <p>Terima kasih sudah melakukan booking. Berikut detailnya:</p>
      
      <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Nama</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Email</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Nomor HP</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${phone}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><b>Nomor Invoice</b></td>
          <td style="border: 1px solid #ddd; padding: 8px;"><b>${invoiceNumber}</b></td>
        </tr>
      </table>
      
      <p style="margin-top: 20px;">
        <a href="https://arka-studio.vercel.app"
           style="background: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
          Lihat Detail Booking
        </a>
      </p>
      <div style="margin-top: 12px; margin-bottom: 12px;">
        <p style="font-size: 12px; margin: 0; color: gray;">Email ini dikirim otomatis, mohon jangan dibalas.</p>
        <p style="font-size: 12px; margin: 0; color: gray;">Harap jangan membagian Kode Invoice ke orang yang tidak dipercaya.</p>
      </div>
    </div>
  `,
    });

    return Response.json({ msg: "Booking Sukses", data: { booking } });
  } catch (error) {
    console.error("Error saat booking atau kirim email:", error);
    return Response.json(
      { success: false, msg: "Gagal melakukan booking" },
      { status: 500 }
    );
  }
}
