import dbConnect from "@/lib/mongoose";
import Job from "@/models/Job";

const jsonHeaders = { "Content-Type": "application/json" };

export async function GET() {
    try {
        await dbConnect();
        const okJobs = await Job.find().countDocuments();
        const notOkJobs = await Job.find().countDocuments();
        return new Response(JSON.stringify({okJobs, notOkJobs}), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch jobs" }),
            { status: 500, headers: jsonHeaders }
        );
    }
}
