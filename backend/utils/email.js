const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envía un correo con el mensaje de la notificación
 */
async function enviarCorreoNotificacion({ para, asunto, mensajeHtml }) {
  await transporter.sendMail({
    from: `"Sistema MotoMan" <${process.env.EMAIL_USER}>`,
    to: para,
    subject: asunto,
    html: mensajeHtml,
  });
}

module.exports = { enviarCorreoNotificacion };
