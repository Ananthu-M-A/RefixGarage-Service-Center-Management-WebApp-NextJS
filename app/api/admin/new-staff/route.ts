import { dbConnect } from "@/lib/mongoose";
// import sendWelcomeEmail from "@/lib/sendWelcomeEmail";
import User from "@/models/User";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, email, role } = await req.json();
        const existingStaff = await User.findOne({ email, role });
        if (existingStaff) {
            return new Response(JSON.stringify({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} already exists` }), {
                status: 409,
                headers: { "Content-Type": "application/json" },
            });
        }
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = await hash(password, 10);
        const newStaff = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newStaff.save();
        // await sendWelcomeEmail(email, name, password, role);
        return new Response(JSON.stringify({ message: "Staff added successfully" }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error adding staff:", error);
        return new Response(
            JSON.stringify({ error: "Failed to add staff." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}