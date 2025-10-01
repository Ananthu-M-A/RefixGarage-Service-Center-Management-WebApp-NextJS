import { dbConnect } from "./mongoose";
import { seedDefaultAdmin } from "./seedAdmin";

export async function initializeDatabase() {
    try {
        console.log("🔄 Initializing database connection...");
        await dbConnect();
        console.log("✅ Database connected successfully");
        await seedDefaultAdmin();
        console.log("🎉 Database initialization completed");
    } catch (error) {
        console.error("❌ Database initialization failed:", error);
        throw error;
    }
}