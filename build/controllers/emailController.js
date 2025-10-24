"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailController = void 0;
const resend_1 = require("resend");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
class EmailController {
    SendEmailWeb(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const data = yield resend.emails.send({
                    from: "Formulario HLPeru <noreply@hliquitos.com>",
                    to: "construcciones.inmobiliaria.hl@gmail.com", // a quién se envía (tu correo de recepción)
                    subject: "Nuevo mensaje desde la página web",
                    replyTo: email,
                    html: `
                <h3>Nuevo mensaje desde el formulario</h3>
                <p><b>Nombre:</b> ${nombre}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Mensaje:</b> ${mensaje}</p>
            `
                });
                return res.json({ success: true, message: "Correo enviado con éxito ✅" });
            }
            catch (error) {
                console.error("❌ Error enviando correo:", error);
                return res.status(500).json({ success: false, message: "Error al enviar el correo" });
            }
        });
    }
}
;
exports.emailController = new EmailController();
