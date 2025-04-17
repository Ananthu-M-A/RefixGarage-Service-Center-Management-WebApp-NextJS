import { dbConnect } from "@/lib/mongoose";
import Job from "@/models/Job";
import User from "@/models/User";

const jsonHeaders = { "Content-Type": "application/json" };

export async function GET() {
    try {
        await dbConnect();
        const okJobs = await Job.find({}).countDocuments({ status: "ok" });
        const notOkJobs = await Job.find({}).countDocuments({ status: "notok" });
        const pendingJobs = await Job.find({}).countDocuments({ status: "pending" });
        const successfullJobs = await Job.find({}).countDocuments({ status: "ok" });
        const failedJobs = await Job.find({}).countDocuments({ status: "notok" });
        const waitingResults = await Job.find({}).countDocuments({ status: "pending" });
        const receptionists = await User.find({ role: "receptionist" }).countDocuments();
        const engineers = await User.find({ role: "engineer" }).countDocuments();
        return new Response(JSON.stringify({ successfullJobs, failedJobs, waitingResults, okJobs, notOkJobs, pendingJobs, receptionists, engineers }), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error("Error fetching job data:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch job data." }),
            { status: 500, headers: jsonHeaders }
        );
    }
}
