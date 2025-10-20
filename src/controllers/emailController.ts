import { Request, Response } from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailController{
    public async SendEmailWeb(req: Request, res: Response){
        const { nombre, email, mensaje } = req.body;

        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ success: false, message: "Faltan datos en el formulario" });
        }

        try {
            // Configuración del transporte
            //const transporter = nodemailer.createTransport({
            //host: process.env.SMTP_HOST,       // Ej: smtp.gmail.com o mail.tudominio.com
            //port: Number(process.env.SMTP_PORT) || 465,
            //secure: true, // true para 465, false para otros puertos
            //auth: {
                //user: process.env.SMTP_USER,     // tu correo
                //pass: process.env.SMTP_PASS      // contraseña de aplicación o SMTP
            //}
            //});

            // Enviar correo
            const data = await resend.emails.send({
            from: `"${nombre}" <${email}>`,
            to: "info@hlperu.com", // a quién se envía (tu correo de recepción)
            subject: "Nuevo mensaje desde la página web",
            html: `
                <h3>Nuevo mensaje desde el formulario</h3> <br>
                <p><b>Nombre:</b> ${nombre}</p> <br><br>
                <p><b>Email:</b> ${email}</p> <br> <br>
                <p><b>Mensaje:</b> ${mensaje}</p>
            `
            });

            return res.json({ success: true, message: "Correo enviado con éxito ✅" });
        } catch (error) {
            console.error("❌ Error enviando correo:", error);
            return res.status(500).json({ success: false, message: "Error al enviar el correo" });
        }
    }
};

export const emailController = new EmailController();
