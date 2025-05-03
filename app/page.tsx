"use client";

import React, { useState } from "react";
import SubHeader from "@/components/SubHeader";
import CheckStatus from "@/components/CheckStatus";
import Contact from "@/components/Contact";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>("services");

  return (
    <div className="bg-black text-white">
      <Header user={"guest"} />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <SubHeader onSectionChange={setActiveSection} />
        <div className="p-4">
          {activeSection === "services" && <Services />}
          {activeSection === "about" && <About />}
          {activeSection === "contact" && <Contact />}
          {activeSection === "check-status" && <CheckStatus />}
        </div>
        <Footer />
      </main>
    </div>
  );
}
