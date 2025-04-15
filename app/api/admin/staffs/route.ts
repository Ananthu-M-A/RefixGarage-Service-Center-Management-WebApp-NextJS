import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";

const jsonHeaders = { "Content-Type": "application/json" };

export async function GET() {
    try {
        await dbConnect();
        const staffs = await User.find({});
        return new Response(JSON.stringify(staffs), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error("Error fetching staffs:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch staffs" }),
            { status: 500, headers: jsonHeaders }
        );
    }
}
