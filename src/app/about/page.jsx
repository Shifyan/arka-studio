import UnderDevelopmentPage from "@/components/underDevelopmentPage";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

export default function About() {
  return (
    <div>
      <div className="mt-[20px]">
        <Navbar></Navbar>
      </div>
      <div className="min-h-[500px] mx-[135px] mt-[80px]">
        <div className="flex justify-between">
          <div>
            <h1 className="text-[40px] font-bold">About Us</h1>
            <p className="max-w-[462px]">
              At Arka Studio, we believe that every moment deserves dedicated
              service, honest work, and stunning results.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <Link
              href="https://github.com/Shifyan"
              className="px-[34px] py-[15px] bg-[#F4F6F6] rounded-[5px] text-[15px] font-semibold hover:cursor-pointer duration-200 hover:bg-[#dddfdf]"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <Footer className="mt-[60px]"></Footer>
      </div>
    </div>
  );
}
