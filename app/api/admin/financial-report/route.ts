import { dbConnect } from "@/lib/mongoose";
import Finance from "@/models/Finance";

export async function GET() {
    try {
        await dbConnect();
        const revenue = await Finance.aggregate([
            { $match: { type: "revenue" } },
            { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
        ]);
        const expenditure = await Finance.aggregate([
            { $match: { type: "expenditure" } },
            { $group: { _id: null, totalExpenditure: { $sum: "$amount" } } }
        ]);
        const date = new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        const transactions = await Finance.find({}).sort({ createdAt: -1 }).exec();

        return new Response(
            JSON.stringify({
                revenue: revenue[0]?.totalRevenue || 0,
                expenditure: expenditure[0]?.totalExpenditure || 0,
                date,
                transactions
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error fetching financial report data:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch financial report data." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}