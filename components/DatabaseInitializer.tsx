"use client";

import { useEffect } from "react";

export default function DatabaseInitializer() {
  useEffect(() => {
    const initDb = async () => {
      try {
        const response = await fetch("/api/init-database", {
          method: "POST",
        });

        if (response.ok) {
          console.log("Database initialized successfully");
        } else {
          console.error("Failed to initialize database");
        }
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initDb();
  }, []);

  return null;
}
