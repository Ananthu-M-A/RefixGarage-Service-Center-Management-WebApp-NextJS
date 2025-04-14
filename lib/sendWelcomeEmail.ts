import nodemailer from "nodemailer";

async function sendWelcomeEmail(email: string, name: string, password: string) {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: parseInt(process.env.SMTP_PORT as string, 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER as string,
            pass: process.env.SMTP_PASS as string,
        },
    } as nodemailer.TransportOptions);

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Welcome to Refix Garage Family",
        text: `Hello ${name},\n\nWelcome to Refix Garage Family! Your account has been created successfully. Use the following credentials to access your new receptionist account.\n\nUser Name: ${email}\n\nPassword: ${password}\n\nBest regards,\nTeam Refix Garage`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

export default sendWelcomeEmail;    