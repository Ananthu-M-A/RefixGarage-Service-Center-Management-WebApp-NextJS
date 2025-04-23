import { dbConnect } from "@/lib/mongoose";
import Inventory from "@/models/Inventory";
import { z } from "zod";

const jsonHeaders = { "Content-Type": "application/json" };

const itemSchema = z.object({
    name: z.string().min(2),
    category: z.string().min(2),
    cost: z.number().min(0),
    count: z.number().min(0),
});

export async function GET() {
    try {
        await dbConnect();
        const items = await Inventory.find();
        return new Response(JSON.stringify(items), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch inventory" }),
            { status: 500, headers: jsonHeaders }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsedBody = itemSchema.parse(body);

        const { name, category, cost, count } = parsedBody;

        await dbConnect();

        const existingItem = await Inventory.findOne({ name });
        if (!existingItem) {
            const item = new Inventory({
                name,
                category,
                cost,
                count
            });

            const addedItem = await item.save();
            if (addedItem) {
                return new Response(JSON.stringify(addedItem), {
                    status: 201,
                    headers: jsonHeaders,
                });
            }
        } else {
            return new Response(
                JSON.stringify({ message: `${name} is already in the stock!` }),
                { status: 409, headers: jsonHeaders }
            );
        }

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
