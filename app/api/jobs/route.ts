import Customer from "@/models/Customer";

export async function POST(request: Request) {
    const body = await request.json();
    const { customerName, mobileNumber } = body;

    try {
        const newCustomer = new Customer({
            customerId: 1,
            name: customerName,
            mobile: mobileNumber,
        });

        const newJob = await newCustomer.save();
        if (!newJob) {
            return new Response(JSON.stringify({ error: "Failed to create job" }), {
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
