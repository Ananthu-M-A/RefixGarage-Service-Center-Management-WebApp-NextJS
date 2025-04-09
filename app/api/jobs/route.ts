import dbConnect from "@/lib/mongoose";
import Customer from "@/models/Customer";
import Job from "@/models/Job";
// import Job from "@/models/Job";

// export async function GET(request: Request) {
//     try {
//         const jobs = await Job.find().populate("customerId", "name mobile");
//         return new Response(JSON.stringify(jobs), {
//         const customers = await Customer.find();
//         return new Response(JSON.stringify(customers), {
//             status: 200,
//             headers: { "Content-Type": "application/json" },
//         });
//     } catch (error) {
//         console.error("Error fetching customers:", error);
//         return new Response(JSON.stringify({ error: "Failed to fetch customers" }), {
//             status: 500,
//             headers: { "Content-Type": "application/json" },
//         });
//     }
// }


export async function POST(request: Request) {
    const body = await request.json();
    const { name, mobile, device, issue, remarks, cost, reminder } = body;

    try {
        await dbConnect();
        let existingCustomer = await Customer.findOne({ mobile });
        if (!existingCustomer) {
            const count = await Customer.countDocuments({});
            const customer = new Customer({
                customerId: `CID${count + 1}`,
                name: name,
                mobile: mobile,
                jobs: [],
                createdAt: new Date(),
            });

            const newCustomer = await customer.save();
            if (!newCustomer) {
                return new Response(JSON.stringify({ error: "Failed to create customer" }), {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                });
            }
            existingCustomer = newCustomer;
        }
        const count = await Job.countDocuments({});
        const job = new Job({
            jobId: `JID${count + 1}`,
            customerId: existingCustomer._id,
            device,
            issue,
            remarks,
            cost,
            reminder,
        });
        const newJob = await job.save();
        if (!newJob) {
            return new Response(JSON.stringify({ error: "Failed to create job" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
        const updatedCustomer = await Customer.findByIdAndUpdate(
            existingCustomer._id,
            { $push: { jobs: job.jobId } },
            { new: true }
        );
        if (!updatedCustomer) {
            return new Response(JSON.stringify({ error: "Failed to update customer jobs" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify(newJob), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            console.error("Error message:", error.message);
        }
        return new Response(JSON.stringify({ error: "Failed to create job" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
