import nodemailer from "nodemailer";

async function sendEmail(email: string, name: string, password: string, role: string, purpose: string) {

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
        text: `Hello ${name},\n\nWelcome to Refix Garage! Your ${purpose === "new-staff" ? "account" : "password"} has been ${purpose === "new-staff" ? "created" : "reset"} successfully.\n\nHere are your login details:\n\nEmail: ${email}\n${(role === "receptionist") && `Password: ${password}`}\nRole: ${role}\n\nPlease remember the importance of keeping your password secure.\n\nBest regards,\nRefix Garage Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

export default sendEmail;    