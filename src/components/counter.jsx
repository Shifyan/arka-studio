export default function Counter() {
  return (
    <div className="px-4 sm:px-6 lg:px-0 overflow-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Content Section */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-[28px] sm:text-[36px] leading-tight mb-4">
            Unmatched<br />Creativity
          </h1>
          <p className="text-[14px] sm:text-[16px] leading-relaxed text-gray-600 px-4 max-w-[400px] mx-auto">
            With over 10 years of experience, we have captured countless moments
            and crafted stunning visuals. Our team's dedication and passion have
            led to numerous awards and recognition. Join the growing number of
            satisfied clients who have experienced the magic of Capture Studio.
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 sm:gap-12 mb-8">
          <div className="text-center">
            <h2 className="font-bold text-[32px] sm:text-[40px] text-red-600">550+</h2>
            <p className="text-[14px] sm:text-[16px] text-gray-600">Clients</p>
          </div>
          <div className="text-center">
            <h2 className="font-bold text-[32px] sm:text-[40px] text-red-600">9000+</h2>
            <p className="text-[14px] sm:text-[16px] text-gray-600">Moments Captured</p>
          </div>
        </div>

        {/* Image Gallery for Mobile */}
        <div className="bg-[#BF3A2B]/12 rounded-[15px] p-4 sm:p-6">
          {/* Main large image */}
          <div className="mb-4">
            <div
              className="w-full h-[200px] sm:h-[250px] rounded-[10px] bg-cover bg-center"
              style={{ backgroundImage: "url('/Image4.jpg')" }}
            ></div>
          </div>
          
          {/* Three smaller images in a row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div
              className="h-[100px] sm:h-[120px] rounded-[8px] bg-cover bg-center"
              style={{ backgroundImage: "url('/Image3.jpg')" }}
            ></div>
            <div
              className="h-[100px] sm:h-[120px] rounded-[8px] bg-cover bg-center"
              style={{ backgroundImage: "url('/Image1.jpg')" }}
            ></div>
            <div
              className="h-[100px] sm:h-[120px] rounded-[8px] bg-cover bg-center"
              style={{ backgroundImage: "url('/Image2.jpg')" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-row justify-between relative overflow-x-visible">
        <div
          id="left-side"
          className="flex flex-row w-[800px] bg-[#BF3A2B]/12 gap-[20px] p-[44px] rounded-[20px] -ml-[80px]"
        >
          <div
            className="w-[368px] h-[420px] relative rounded-[10px] overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/Image4.jpg')" }}
          ></div>

          <div
            className="w-[152px] h-[420px] relative rounded-[10px] overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/Image3.jpg')" }}
          ></div>

          <div className="w-[152px] flex flex-col gap-[20px]">
            <div
              className="h-[200px] rounded-[10px] bg-cover bg-center"
              style={{ backgroundImage: "url('/Image1.jpg')" }}
            ></div>
            <div
              className="h-[200px] rounded-[10px] bg-cover bg-center"
              style={{ backgroundImage: "url('/Image2.jpg')" }}
            ></div>
          </div>
        </div>
        
        <div id="right-side" className="mt-[35px] me-[135px]">
          <div className="w-[398px]">
            <h1 className="font-bold text-[48px] leading-[125%]">
              Unmatched <br /> Creativity
            </h1>
            <p className="text-[18px] mt-4">
              With over 10 years of experience, we have captured countless moments
              and crafted stunning visuals. Our team's dedication and passion have
              led to numerous awards and recognition. Join the growing number of
              satisfied clients who have experienced the magic of Capture Studio.
            </p>
          </div>
          <div className="mt-[30px] flex gap-[20px]">
            <div>
              <h2 className="font-bold text-[48px] text-center text-red-600">550+</h2>
              <p className="text-center text-[18px]">Clients</p>
            </div>
            <div>
              <h2 className="font-bold text-[48px] text-center text-red-600">9000+</h2>
              <p className="text-center text-[18px]">Moments Captured</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
