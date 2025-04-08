import dbConnect from "@/lib/mongoose";
import Receptionist from "@/models/Receptionist";
import { compare } from "bcrypt";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
    await dbConnect();
    const receptionist = await Receptionist.findOne({ email });
    if (!receptionist) {
        return new Response('Invalid email', { status: 401 });
    }
    const matchPassword = await compare(password, receptionist.password);
    if (!matchPassword) {
        return new Response('Invalid password ', { status: 401 });
    }
    return new Response('Login successful', { status: 200 });
}