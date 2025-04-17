import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";

const jsonHeaders = { "Content-Type": "application/json" };


export async function GET() {
  try {
    await dbConnect();
    const engineers = await User.find({role: "engineer"});
    if (!engineers || engineers.length === 0) {
      return new Response(
        JSON.stringify({ error: "No engineers found" }),
        { status: 404, headers: jsonHeaders }
      );
    }
    return new Response(JSON.stringify(engineers), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error("Error fetching engineers:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch engineers" }),
      { status: 500, headers: jsonHeaders }
    );
  }
}