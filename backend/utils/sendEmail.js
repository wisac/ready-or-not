import nodemailer from "nodemailer";

export default (emailOptions) => {
   const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD,
      },
   });

   transport.sendMail(emailOptions);
};
