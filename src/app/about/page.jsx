import UnderDevelopmentPage from "@/components/underDevelopmentPage";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
export default function About() {
  return (
    <div>
      <div className="mt-[20px]">
        <Navbar></Navbar>
      </div>
      <div className="min-h-[500px] mx-[115px] mt-[80px]">
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
        <div className="flex mt-[80px] gap-[30px]">
          <div className="grid grid-cols-2 gap-[25px]">
            <div className="max-w-[270px]">
              <h1 className="font-bold text-[40px]">1.</h1>
              <h1 className="font-semibold text-[20px]">Who We Are</h1>
              <p className="font-normal text-[14px] mt-[10px]">
                A passionate team of photographers dedicated to creating
                timeless, high-quality visuals.
              </p>
            </div>
            <div className="max-w-[270px]">
              <h1 className="font-bold text-[40px]">2.</h1>
              <h1 className="font-semibold text-[20px]">What Do We Do</h1>
              <p className="font-normal text-[14px] mt-[10px]">
                We capture moments through professional photography, offering
                both studio and on-location sessions.
              </p>
            </div>
            <div className="max-w-[270px]">
              <h1 className="font-bold text-[40px]">3.</h1>
              <h1 className="font-semibold text-[20px]">How Do We Help</h1>
              <p className="font-normal text-[14px] mt-[10px]">
                We make photography easy with seamless booking, expert
                direction, and stunning results.
              </p>
            </div>
            <div className="max-w-[270px]">
              <h1 className="font-bold text-[40px]">4.</h1>
              <h1 className="font-semibold text-[20px]">Create Your Story</h1>
              <p className="font-normal text-[14px] mt-[10px]">
                Your story deserves to be seen. We turn moments into powerful
                images that last a lifetime.
              </p>
            </div>
          </div>
          <div className="flex gap-[23px]">
            <div className="mt-[40px]">
              <div className="w-[250px] h-[150px] overflow-hidden ">
                <Image
                  src="/about-1.jpg"
                  width={250}
                  height={150}
                  alt="About"
                />
              </div>
              <div className="w-[250px] h-[270px] overflow-hidden mt-[16px]">
                <Image
                  src="/about-2.jpg"
                  width={250}
                  height={270}
                  alt="About"
                ></Image>
              </div>
            </div>
            <div className="mb-[40px]">
              <div className="w-[250px] h-[270px] overflow-hidden ">
                <Image
                  src="/about-3.jpg"
                  width={250}
                  height={270}
                  alt="About"
                ></Image>
              </div>
              <div className="w-[250px] h-[150px] overflow-hidden mt-[16px]">
                <Image
                  src="/about-4.jpg"
                  width={250}
                  height={150}
                  alt="About"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[60px]">
        <Footer></Footer>
      </div>
    </div>
  );
}
