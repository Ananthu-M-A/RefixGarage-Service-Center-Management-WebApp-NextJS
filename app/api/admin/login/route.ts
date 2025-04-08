import dbConnect from "@/lib/mongoose";
import Admin from "@/models/Admin";
import { compare } from "bcrypt";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
    await dbConnect();
    const admin = await Admin.findOne({ email });
    if (!admin) {
        return new Response('Invalid email', { status: 401 });
    }
    const matchPassword = await compare(password, admin.password);
    if (!matchPassword) {
        return new Response('Invalid password ', { status: 401 });
    }
    return new Response('Login successful', { status: 200 });
}