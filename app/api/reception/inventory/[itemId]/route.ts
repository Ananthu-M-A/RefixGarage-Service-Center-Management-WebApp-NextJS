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

export async function PUT(request: Request) {
    try {
        const url = new URL(request.url);
        const itemId = url.pathname.split("/").pop();
        const body = await request.json();
        const parsedBody = itemSchema.parse(body);

        const { cost, count } = parsedBody;

        await dbConnect();

        const updatedInventory = await Inventory.findByIdAndUpdate(
            itemId,
            { cost, count },
            { new: true }
        );

        if (!updatedInventory) {
            return new Response(
                JSON.stringify({ error: "Failed to update inventory" }),
                { status: 500, headers: jsonHeaders }
            );
        }

        return new Response(JSON.stringify(updatedInventory), {
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