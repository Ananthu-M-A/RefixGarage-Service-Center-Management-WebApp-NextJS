import bcrypt from "bcrypt";
import { dbConnect } from "./mongoose";
import User from "../models/User";

export async function seedDefaultAdmin() {
    try {
        await dbConnect();
        const existingAdmin = await User.findOne({
            role: "admin",
            email: process.env.DEFAULT_ADMIN_EMAIL || "admin@refixgarage.com"
        });

        if (existingAdmin) {
            console.log("✅ Default admin user already exists");
            return existingAdmin;
        }

        const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@refixgarage.com";
        const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "Admin@123";
        const defaultAdminName = process.env.DEFAULT_ADMIN_NAME || "System Admin";

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(defaultAdminPassword, saltRounds);

        const adminUser = new User({
            name: defaultAdminName,
            email: defaultAdminEmail,
            password: hashedPassword,
            role: "admin",
            status: "active"
        });

        await adminUser.save();

        console.log("✅ Default admin user created successfully");
        console.log(`📧 Email: ${defaultAdminEmail}`);
        console.log(`🔑 Password: ${defaultAdminPassword}`);
        console.log("⚠️  Please change the default password after first login!");

        return adminUser;
    } catch (error) {
        console.error("❌ Error creating default admin user:", error);
        throw error;
    }
}