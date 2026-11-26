import bcrypt from "bcrypt";
import { dbConnect } from "./mongoose";
import User from "../models/User";

const MIN_PASSWORD_LENGTH = 12;

export async function seedDefaultAdmin() {
    const email = process.env.DEFAULT_ADMIN_EMAIL?.trim();
    const password = process.env.DEFAULT_ADMIN_PASSWORD;
    const name = process.env.DEFAULT_ADMIN_NAME?.trim() || "System Admin";

    if (!email || !password) {
        console.warn("⚠️  DEFAULT_ADMIN_EMAIL / DEFAULT_ADMIN_PASSWORD not set; skipping default admin seeding");
        return null;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
        console.warn(`⚠️  DEFAULT_ADMIN_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters; skipping default admin seeding`);
        return null;
    }

    try {
        await dbConnect();
        const existingAdmin = await User.findOne({ role: "admin", email });

        if (existingAdmin) {
            console.log("✅ Default admin user already exists");
            return existingAdmin;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const adminUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "admin",
            status: "active"
        });

        await adminUser.save();

        console.log(`✅ Default admin user created for ${email}`);
        return adminUser;
    } catch (error) {
        console.error("❌ Error creating default admin user:", error);
        throw error;
    }
}
