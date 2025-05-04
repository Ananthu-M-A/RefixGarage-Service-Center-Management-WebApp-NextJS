import { dbConnect } from "@/lib/mongoose";
import sendWhatsApp from "@/lib/sendWhatsApp";
import Customer from "@/models/Customer";
import Job from "@/models/Job";
import { z } from "zod";

const jsonHeaders = { "Content-Type": "application/json" };
const jobSchema = z.object({
    remarks: z.string().min(2).optional(),
    cost: z.number().min(0).optional(),
    reminder: z.number().min(0).optional(),
    engineer: z.string().min(2).optional(),
    status: z.string().min(2).optional(),
    customerId: z.string().optional(),
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

        const customer = await Customer.findById(updatedJob.customerId);
        if (!customer) {
            return new Response(
                JSON.stringify({ error: "Customer not found" }),
                { status: 404, headers: jsonHeaders }
            );
        }

        if (status === "ok" || status === "notok") {
            await sendWhatsApp({
                name: customer.name,
                jobId: updatedJob._id.toString(),
                createdAt: updatedJob.get('updatedAt').toLocaleDateString(),
                device: `${updatedJob.brand} ${updatedJob.modelName}`,
                issue: updatedJob.issue || "",
                cost: updatedJob.cost,
                remarks: updatedJob.remarks || "",
                mobile: customer.mobile ?? "",
            }, "delivery");
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