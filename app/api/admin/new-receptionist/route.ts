import { dbConnect } from "@/lib/mongoose";
// import sendWelcomeEmail from "@/lib/sendWelcomeEmail";
import User from "@/models/User";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, email } = await req.json();
        const receptionist = await User.findOne({ email, role: "receptionist" });
        if (receptionist) {
            return new Response(JSON.stringify({ message: "Receptionist already exists" }), {
                status: 409,
                headers: { "Content-Type": "application/json" },
            });
        }
        const password = Math.random().toString(36).slice(-8);
        console.log(password);
        
        const hashedPassword = await hash(password, 10);
        const newReceptionist = new User({
            name,
            email,
            password: hashedPassword,
            role: "receptionist"
        });
        await newReceptionist.save();
        // await sendWelcomeEmail(email, name, password);
        return new Response(JSON.stringify({ message: "Receptionist added successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error adding receptionist:", error);
        return new Response(
            JSON.stringify({ error: "Failed to add receptionist." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}