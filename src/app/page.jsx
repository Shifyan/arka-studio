import Navbar from "@/components/header";
import Hero from "@/components/hero";
import Feature from "@/components/feature";
export default function Home() {
  return (
    <div className="pt-[20px]">
      <Navbar />
      <div className="">
        <Hero />
      </div>
      <div className="mt-[60px]">
        <Feature />
      </div>
    </div>
  );
}
