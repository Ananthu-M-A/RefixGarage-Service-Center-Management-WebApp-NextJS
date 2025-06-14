import { z } from "zod";
import Dealer from "@/models/Dealer";
import { dbConnect } from "@/lib/mongoose";

const jsonHeaders = { "Content-Type": "application/json" };

const dealerSchema = z.object({
    type: z.string().min(1),
    name: z.string().min(2),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsedBody = dealerSchema.parse(body);
        const { type, name } = parsedBody;

        await dbConnect();
        const newDealer = new Dealer({
            type,
            name
        });

        const addedDealer = await newDealer.save();
        if (addedDealer) {
            return new Response(JSON.stringify({ addedDealer }), {
                status: 201,
                headers: jsonHeaders,
            });
        } else {
            return new Response(
                JSON.stringify({ error: "Failed to add dealer" }),
                { status: 500, headers: jsonHeaders }
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
