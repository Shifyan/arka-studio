import Navbar from "@/components/header";
import Hero from "@/components/hero";
export default function Home() {
  return (
    <div className="pt-[20px]">
      <Navbar />
      <div className="">
        <Hero />
      </div>
    </div>
  );
}
