import { dbConnect } from "@/lib/mongoose";
import sendEmail from "@/lib/sendEmail";
import User from "@/models/User";
import { hash } from "bcrypt";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;
        await dbConnect();
        const existingUser = await User.findOne({ email, role: "receptionist" });

        if (!existingUser) {
            return new Response(
                JSON.stringify({ error: "User not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await hash(password, 10);

        existingUser.password = hashedPassword;
        await existingUser.save();

        await sendEmail(email, existingUser.name, password, existingUser.role, "forgot-password");

        return new Response(
            JSON.stringify({ message: "Password reset link sent" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error in forgot password route:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}