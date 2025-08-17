import Image from "next/image";
export default function Feature() {
  return (
    <div className="mt-4 sm:mt-[18px] mx-4 sm:mx-8 lg:mx-[130px] mb-8 sm:mb-[57.04px] flex flex-col">
      {/* Title */}
      <div className="flex justify-center">
        <h1 className="font-bold text-[28px] sm:text-[36px] lg:text-[48px] text-center px-4">
          Explore Our Expertise
        </h1>
      </div>

      {/* Features Grid */}
      <div className="mt-8 sm:mt-12 lg:mt-[90px] mx-0 sm:mx-4 lg:mx-[86.5px]">
        {/* Mobile & Tablet: Single Column */}
        <div className="lg:hidden space-y-8 sm:space-y-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center px-4">
            <div className="mb-4">
              <Image
                src="/Photo Gallery.png"
                width={48}
                height={48}
                alt="Photo Gallery"
                className="sm:w-[56px] sm:h-[56px]"
              />
            </div>
            <div>
              <h2 className="font-bold text-[18px] sm:text-[20px] mb-3">
                Professional Editing
              </h2>
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-normal text-gray-600 leading-relaxed max-w-[280px] mx-auto">
                Every detail perfected with care. Your photos, your story,
                enhanced.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center px-4">
            <div className="mb-4">
              <Image
                src="/My Location.png"
                width={48}
                height={48}
                alt="My Location"
                className="sm:w-[56px] sm:h-[56px]"
              />
            </div>
            <div>
              <h2 className="font-bold text-[18px] sm:text-[20px] mb-3">
                Long Hour Shot
              </h2>
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-normal text-gray-600 leading-relaxed max-w-[280px] mx-auto">
                Unlimited time for your moments. We stay until your story ends.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center px-4">
            <div className="mb-4">
              <Image
                src="/Camera.png"
                width={48}
                height={48}
                alt="Camera"
                className="sm:w-[56px] sm:h-[56px]"
              />
            </div>
            <div>
              <h2 className="font-bold text-[18px] sm:text-[20px] mb-3">
                Extensive Equipment
              </h2>
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-normal text-gray-600 leading-relaxed max-w-[280px] mx-auto">
                Gears to match your vision. Whatever you need, we're ready.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: Three Columns */}
        <div className="hidden lg:flex justify-between">
          <div className="w-[267px] h-[230px] flex flex-col justify-between">
            <div className="flex justify-center">
              <Image
                src="/Photo Gallery.png"
                width={72}
                height={72}
                alt="Photo Gallery"
              />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-[20px]">Professional Editing</h2>
              <p className="text-[18px] font-normal text-center mt-[10px]">
                Every detail perfected with care. Your photos, your story,
                enhanced.
              </p>
            </div>
          </div>
          <div className="w-[267px] h-[230px] flex flex-col justify-between">
            <div className="flex justify-center">
              <Image
                src="/My Location.png"
                width={72}
                height={72}
                alt="My Location"
              />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-[20px]">Long Hour Shot</h2>
              <p className="text-[18px] font-normal text-center mt-[10px]">
                Unlimited time for your moments. We stay until your story ends.
              </p>
            </div>
          </div>
          <div className="w-[267px] h-[230px] flex flex-col justify-between">
            <div className="flex justify-center">
              <Image src="/Camera.png" width={72} height={72} alt="Camera" />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-[20px]">Extensive Equipment</h2>
              <p className="text-[18px] font-normal text-center mt-[10px]">
                Gears to match your vision. Whatever you need, we're ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
