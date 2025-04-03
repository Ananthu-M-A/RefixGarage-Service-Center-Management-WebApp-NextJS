import About from "@/components/About";
import CheckStatus from "@/components/CheckStatus";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import SubHeader from "@/components/SubHeader";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen h-16 bg-gradient-to-b from-black to-gray-900 text-white">
        <SubHeader />
        <div className="w-full h-full overflow-x-hidden">
          <div className="flex space-x-5">
            <CheckStatus />
            <Services />
            <About />
            <Contact />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
