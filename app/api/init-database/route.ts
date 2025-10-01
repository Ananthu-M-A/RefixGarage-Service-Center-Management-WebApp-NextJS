import { NextResponse } from "next/server";
import { initializeDatabase } from "@/lib/initDatabase";

export async function POST() {
    try {
        await initializeDatabase();

        return NextResponse.json(
            {
                message: "Database initialized successfully",
                timestamp: new Date().toISOString()
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database initialization error:", error);

        return NextResponse.json(
            {
                error: "Failed to initialize database",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}