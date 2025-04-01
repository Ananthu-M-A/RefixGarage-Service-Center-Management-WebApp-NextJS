import SubHeader from "@/components/SubHeader";

export default function Home() {
  return (
    <>
      <SubHeader />
      <div className="flex flex-col items-center justify-center min-h-screen h-14 bg-gradient-to-b from-black to-gray-900 text-white">
        <h1 className="text-3xl font-bold underline">REFIX GARAGE</h1>
        <p className="text-lg">A Garage For Expert Fixes</p>
        <p className="text-lg">
          Refix Garage is a smartphone service center. We provide the best
          services for your smartphones.
        </p>
      </div>
    </>
  );
}