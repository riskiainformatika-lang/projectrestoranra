import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const contactSchema = z.object({
    name: z.string().min(2, "Nama harus minimal 2 karakter"),
    email: z.string().email("Format email tidak valid"),
    subject: z.string().min(3, "Subjek harus minimal 3 karakter"),
    message: z.string().min(10, "Pesan harus minimal 10 karakter"),
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        // Validasi input
        const validatedData = contactSchema.parse(req.body);

        // Log pesan ke console
        console.log("📧 Pesan Kontak Diterima:");
        console.log("Nama:", validatedData.name);
        console.log("Email:", validatedData.email);
        console.log("Subjek:", validatedData.subject);
        console.log("Pesan:", validatedData.message);
        console.log("---");

        // Simpan ke database
        await prisma.contact.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                subject: validatedData.subject,
                message: validatedData.message,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Pesan berhasil dikirim!",
        });
    } catch (error) {
        console.error("❌ Error di API contact:", error);

        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validasi gagal",
                errors: error.errors,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server",
        });
    } finally {
        await prisma.$disconnect();
    }
}