import { dbConnect } from "@/lib/mongoose";
import Job from "@/models/Job";
import { z } from "zod";

const jsonHeaders = { "Content-Type": "application/json" };
const jobSchema = z.object({
    name: z.string().min(2),
    mobile: z.string().regex(/^\d{10}$/),
    device: z.string().min(2),
    issue: z.string().min(5),
    remarks: z.string().min(5),
    cost: z.number().min(0),
    reminder: z.number().min(0),
    engineer: z.string().min(2),
    status: z.string().min(2),
});

export async function PUT(request: Request) {
    try {
        const url = new URL(request.url);
        const jobId = url.pathname.split("/").pop();
        const body = await request.json();
        const parsedBody = jobSchema.parse(body);

        const { remarks, cost, reminder, engineer, status } = parsedBody;

        await dbConnect();

        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { remarks, cost, reminder, engineer, status },
            { new: true }
        );

        if (!updatedJob) {
            return new Response(
                JSON.stringify({ error: "Failed to update job" }),
                { status: 500, headers: jsonHeaders }
            );
        }

        return new Response(JSON.stringify(updatedJob), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(
                JSON.stringify({ error: "Invalid input", details: error.errors }),
                { status: 400, headers: jsonHeaders }
            );
        }

        console.error("Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500, headers: jsonHeaders }
        );
    }
}