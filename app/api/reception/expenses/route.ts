import { dbConnect } from "@/lib/mongoose";
import Expense from "@/models/Expense";
import Finance from "@/models/Finance";
import { z } from "zod";

const jsonHeaders = { "Content-Type": "application/json" };

const expenseSchema = z.object({
    type: z.string().min(1),
    amount: z.number().min(0),
});

export async function GET() {
    try {
        await dbConnect();
        const expenses = await Expense.find();
        return new Response(JSON.stringify(expenses), {
            status: 200,
            headers: jsonHeaders,
        });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch expenses" }),
            { status: 500, headers: jsonHeaders }
        );
    }
}


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsedBody = expenseSchema.parse(body);
        const { type, amount } = parsedBody;

        await dbConnect();
        const newExpense = new Expense({
            type,
            amount
        });

        const addedExpense = await newExpense.save();
        if (addedExpense) {
            const financeUpdate = new Finance({
                description: addedExpense.type,
                type: "expenditure",
                amount: addedExpense.amount,
            });
            const updatedFinance = await financeUpdate.save();
            if (!updatedFinance) {
                return new Response(
                    JSON.stringify({ error: "Failed to update finance" }),
                    { status: 500, headers: jsonHeaders }
                );
            }
            console.log("Expense added successfully:", addedExpense);
            console.log("Finance updated successfully:", updatedFinance);
            return new Response(JSON.stringify({ addedExpense, updatedFinance }), {
                status: 201,
                headers: jsonHeaders,
            });
        } else {
            return new Response(
                JSON.stringify({ error: "Failed to add expense" }),
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
