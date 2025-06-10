import { dbConnect } from "@/lib/mongoose";
import Job from "@/models/Job";
import User from "@/models/User";

const jsonHeaders = { "Content-Type": "application/json" };

export async function GET() {
    try {
        await dbConnect();
        const okJobs = await Job.find({}).countDocuments({ status: "ok", isDelivered: "No" });
        const notOkJobs = await Job.find({}).countDocuments({ status: "notok", isDelivered: "No" });
        const pendingJobs = await Job.find({}).countDocuments({ status: "pending", isDelivered: "No" });
        const totalJobs = await Job.find({}).countDocuments();
        const deliveredJobs = await Job.find({}).countDocuments({ isDelivered: "Yes" });
        const successfullJobs = await Job.find({}).countDocuments({ status: "ok", isDelivered: "Yes" });
        const failedJobs = await Job.find({}).countDocuments({ status: "notok", isDelivered: "Yes" });
        const receptionists = await User.find({ role: "receptionist" }).countDocuments();
        const engineers = await User.find({ role: "engineer" }).countDocuments();
        const revenue = 500;
        const expense = 250;
        return new Response(JSON.stringify({ totalJobs, successfullJobs, deliveredJobs, failedJobs, okJobs, notOkJobs, pendingJobs, receptionists, engineers, revenue, expense }), {
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
