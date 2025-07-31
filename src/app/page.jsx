import Navbar from "@/components/header";
import Hero from "@/components/hero";
import Feature from "@/components/feature";
import Counter from "@/components/counter";
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
      <div className="mt-[60px]">
        <Counter />
      </div>
      <div className="mt-[60px]"></div>
    </div>
  );
}
