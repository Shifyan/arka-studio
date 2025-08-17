export default function Gallery() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:mx-[130px]">
      {/* Header Section */}
      <div className="text-center lg:text-left">
        <h1 className="text-[28px] sm:text-[36px] lg:text-[50px] font-semibold leading-tight">
          Journey Through Our Gallery
        </h1>
        <p className="text-[14px] sm:text-[16px] lg:text-[20px] mt-4 lg:mt-[20px] text-gray-600 max-w-[400px] lg:max-w-none mx-auto lg:mx-0">
          Immerse yourself in the captivating world of photography.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="mt-8 sm:mt-10 lg:mt-[43px]">
        {/* Mobile Layout - 2 Images per Row */}
        <div className="lg:hidden space-y-3 sm:space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div
              className="h-[150px] sm:h-[180px] rounded-[20px] sm:rounded-[25px] bg-cover bg-center shadow-lg"
              style={{ backgroundImage: "url('/gallery-1.jpg')" }}
            ></div>
            <div
              className="h-[150px] sm:h-[180px] rounded-[20px] sm:rounded-[25px] bg-cover bg-center shadow-lg"
              style={{ backgroundImage: "url('/gallery-2.jpg')" }}
            ></div>
          </div>
          
          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div
              className="h-[150px] sm:h-[180px] rounded-[20px] sm:rounded-[25px] bg-cover bg-center shadow-lg"
              style={{ backgroundImage: "url('/gallery-3.jpg')" }}
            ></div>
            <div
              className="h-[150px] sm:h-[180px] rounded-[20px] sm:rounded-[25px] bg-cover bg-center shadow-lg"
              style={{ backgroundImage: "url('/gallery-4.jpg')" }}
            ></div>
          </div>
          
          {/* Row 3 - Single image centered */}
          <div className="flex justify-center">
            <div
              className="w-1/2 h-[150px] sm:h-[180px] rounded-[20px] sm:rounded-[25px] bg-cover bg-center shadow-lg"
              style={{ backgroundImage: "url('/gallery-5.jpg')" }}
            ></div>
          </div>
        </div>

        {/* Desktop Layout - Complex Grid */}
        <div className="hidden lg:block">
          {/* First Row */}
          <div className="flex gap-[20px]">
            <div
              className="basis-2/3 rounded-[50px] h-[250px] bg-cover bg-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundImage: "url('/gallery-1.jpg')" }}
            ></div>
            <div
              className="basis-1/3 rounded-[50px] h-[250px] bg-cover bg-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundImage: "url('/gallery-2.jpg')" }}
            ></div>
          </div>
          
          {/* Second Row */}
          <div className="flex gap-[20px] mt-[20px]">
            <div
              className="basis-1/3 rounded-[50px] h-[520px] bg-cover bg-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundImage: "url('/gallery-3.jpg')" }}
            ></div>
            <div className="basis-2/3 flex flex-col gap-[20px]">
              <div
                className="rounded-[50px] h-[250px] bg-cover bg-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ backgroundImage: "url('/gallery-4.jpg')" }}
              ></div>
              <div
                className="rounded-[50px] h-[250px] bg-cover bg-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ backgroundImage: "url('/gallery-5.jpg')" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
