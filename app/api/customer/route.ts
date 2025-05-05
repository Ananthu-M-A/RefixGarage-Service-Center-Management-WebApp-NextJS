import { dbConnect } from "@/lib/mongoose";
import Customer from "@/models/Customer";
import Job from "@/models/Job";

const jsonHeaders = { "Content-Type": "application/json" };

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const name = url.searchParams.get("name");
        await dbConnect();
        const mobile = url.searchParams.get("mobile");
        if (!name || !mobile) {
            return new Response(
                JSON.stringify({ error: "Name and mobile number are required." }),
                { status: 400, headers: jsonHeaders }
            );
        }
        const customer = await Customer.findOne({ mobile });
        if (!customer) {
            return new Response(
                JSON.stringify({ error: "No customer found" }),
                { status: 404, headers: jsonHeaders }
            );
        }
        const job = await Job.findOne({ _id: customer.jobs[customer.jobs.length - 1] });
        if (!job) {
            return new Response(
                JSON.stringify({ error: "No job found" }),
                { status: 404, headers: jsonHeaders }
            );
        }
        return new Response(JSON.stringify({ status: job.status, customer: customer.name }), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error("Error fetching job data:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch job data" }),
            { status: 500, headers: jsonHeaders }
        );
    }
}
