import Navbar from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
export default function About() {
  return (
    <div>
      <div className="mt-[5px] md:mt-[20px]">
        <Navbar></Navbar>
      </div>
      <div className="md:min-h-[500px] md:mx-[115px] mx-[20px] mt-[40px] md:mt-[80px]">
        <div className="flex max-md:flex-col justify-between">
          <div>
            <h1 className="text-[25px] md:text-[40px] max-md:mb-[10px] font-bold max-md:text-center">
              About Us
            </h1>
            <p className="max-w-[462px] max-md:[15px] max-md:text-center">
              At Arka Studio, we believe that every moment deserves dedicated
              service, honest work, and stunning results.
            </p>
          </div>
          <div className="flex md:flex-col justify-center max-md:mt-[40px]">
            <Link
              href="https://github.com/Shifyan"
              className="shadow-lg px-[34px] py-[15px] bg-[#ececec] rounded-[5px] text-[15px] font-semibold hover:cursor-pointer duration-200 hover:bg-[#dddfdf]"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="flex max-md:flex-col mt-[60px] md:mt-[80px] gap-[30px]">
          <div className="grid grid-cols-2 gap-[15px] md:gap-[25px] ">
            <div className="max-w-[270px]">
              <h1 className="font-bold text-[30px] md:text-[40px]">1.</h1>
              <h1 className="font-semibold text-[17px] md:text-[20px]">
                Who We Are
              </h1>
              <p className="font-normal text-[14px] mt-[10px]">
                A passionate team of photographers dedicated to creating
                timeless, high-quality visuals.
              </p>
            </div>
            <div className="max-w-[270px]">
              <h1 className="font-bold text-[30px] md:text-[40px]">2.</h1>
              <h1 className="font-semibold text-[17px] md:text-[20px]">
                What Do We Do
              </h1>
              <p className="font-normal text-[14px] mt-[10px]">
                We capture moments through professional photography, offering
                both studio and on-location sessions.
              </p>
            </div>
            <div className="max-w-[270px]">
              <h1 className="font-bold text-[30px] md:text-[40px]">3.</h1>
              <h1 className="font-semibold text-[17px] md:text-[20px]">
                How Do We Help
              </h1>
              <p className="font-normal text-[14px] mt-[10px]">
                We make photography easy with seamless booking, expert
                direction, and stunning results.
              </p>
            </div>
            <div className="max-w-[270px]">
              <h1 className="font-bold text-[30px] md:text-[40px]">4.</h1>
              <h1 className="font-semibold text-[17px] md:text-[20px]">
                Create Your Story
              </h1>
              <p className="font-normal text-[14px] mt-[10px]">
                Your story deserves to be seen. We turn moments into powerful
                images that last a lifetime.
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end gap-[23px] max-md:pt-[20px] max-md:border-t-2 max-md:border-gray-200 ">
            <div className="mt-[40px]">
              <div className="relative md:w-[250px] md:h-[150px] w-[150] h-[90px] overflow-hidden ">
                <Image
                  src="/about-1.jpg"
                  fill
                  className="object-cover"
                  alt="About"
                />
              </div>
              <div className="relative md:w-[250px] md:h-[270px] w-[150px] h-[162px] overflow-hidden mt-[16px]">
                <Image
                  src="/about-2.jpg"
                  fill
                  className="object-cover"
                  alt="About"
                ></Image>
              </div>
            </div>
            <div className="mb-[40px]">
              <div className="relative md:w-[250px] md:h-[270px] w-[150px] h-[162px] overflow-hidden ">
                <Image
                  src="/about-3.jpg"
                  fill
                  className="object-cover"
                  alt="About"
                ></Image>
              </div>
              <div className="relative md:w-[250px] md:h-[150px] w-[150] h-[90px] overflow-hidden mt-[16px]">
                <Image
                  src="/about-4.jpg"
                  fill
                  className="object-cover"
                  alt="About"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[60px] ">
        <Footer></Footer>
      </div>
    </div>
  );
}
