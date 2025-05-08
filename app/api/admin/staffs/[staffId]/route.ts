import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";

const jsonHeaders = { "Content-Type": "application/json" };

export async function PUT(request: Request, context: { params: { staffId: string } }) {
    try {
        await dbConnect();
        const { staffId } = await context.params;
        const user = await User.findById(staffId);
        if (!user) {
            return new Response(
                JSON.stringify({ error: "User not found" }),
                { status: 404, headers: jsonHeaders }
            );
        }
        user.status = user.status === "active" ? "inactive" : "active";
        await user.save();
        return new Response(JSON.stringify(user), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error("Error updating staff status:", error);
        return new Response(
            JSON.stringify({ error: "Failed to update staff status" }),
            { status: 500, headers: jsonHeaders }
        );
    }
}

