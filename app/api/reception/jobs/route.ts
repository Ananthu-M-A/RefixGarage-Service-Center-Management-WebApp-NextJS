import { dbConnect } from "@/lib/mongoose";
import sendWhatsApp from "@/lib/sendWhatsApp";
import Customer from "@/models/Customer";
import Job from "@/models/Job";
import { z } from "zod";

const jsonHeaders = { "Content-Type": "application/json" };

const jobSchema = z.object({
    name: z.string().min(2),
    mobile: z.string().regex(/^\d{10}$/),
    brand: z.string().min(2),
    modelName: z.string().min(2),
    issue: z.string().min(2),
    remarks: z.string().min(2),
    cost: z.number().min(0),
    reminder: z.number().min(0),
    engineer: z.string().min(2)
});

export async function GET() {
    try {
        await dbConnect();
        const jobs = await Job.find().populate("customerId", "name mobile").sort({ createdAt: -1 });
        if (!jobs || jobs.length === 0) {
            return new Response(
                JSON.stringify({ error: "No jobs found" }),
                { status: 404, headers: jsonHeaders }
            );
        }
        return new Response(JSON.stringify(jobs), {
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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsedBody = jobSchema.parse(body);

        const { name, mobile, brand, modelName, issue, remarks, cost, reminder, engineer } = parsedBody;

        await dbConnect();

        let existingCustomer = await Customer.findOne({ mobile });
        if (!existingCustomer) {
            const customer = new Customer({
                name: name.toUpperCase(),
                mobile,
                jobs: [],
            });

            existingCustomer = await customer.save();
            if (!existingCustomer) {
                return new Response(
                    JSON.stringify({ error: "Failed to create customer" }),
                    { status: 500, headers: jsonHeaders }
                );
            }
        }

        const job = new Job({
            customerId: existingCustomer._id,
            brand,
            modelName: modelName.toUpperCase(),
            issue,
            remarks,
            cost,
            reminder,
            engineer: engineer.toUpperCase(),
            status: "pending"
        });

        const newJob = await job.save();
        if (!newJob) {
            return new Response(
                JSON.stringify({ error: "Failed to create job" }),
                { status: 500, headers: jsonHeaders }
            );
        }

        const updatedCustomer = await Customer.findOneAndUpdate(
            { _id: existingCustomer._id },
            { $push: { jobs: newJob._id } },
            { new: true }
        );

        if (!updatedCustomer) {
            return new Response(
                JSON.stringify({ error: "Failed to update customer jobs" }),
                { status: 500, headers: jsonHeaders }
            );
        }

        await sendWhatsApp({
            name: existingCustomer.name,
            jobId: newJob._id.toString(),
            createdAt: newJob.get('createdAt').toLocaleDateString(),
            device: `${brand} ${modelName}`,
            issue: issue,
            remarks: remarks,
            cost: cost,
            mobile: existingCustomer.mobile ?? "",
        }, "welcome");

        return new Response(JSON.stringify(newJob), {
            status: 201,
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
