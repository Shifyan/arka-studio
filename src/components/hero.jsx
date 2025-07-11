export default function Hero() {
  return (
    <div className="px-[130px]">
      <div className="relative">
        <div className="w-[668px] absolute z-10">
          <h1 className="font-bold text-[96px] leading-tight space-y-2">
            <span className="inline-block bg-white rounded-b-[20px]  px-3 ">
              Unleash The
            </span>
            <br />
            <span className="inline-block bg-white rounded pe-3">Art Of</span>
            <br />
            <span className="inline-block bg-white w-[668px] rounded-t-[20px] pe-3">
              Photography
            </span>
          </h1>
          <h2 className="font-normal text-[18px] bg-white pt-4 rounded-b-[20px] pb-[20px]">
            At Arka Studio, we specialize in capturing life's most precious
            moments, transforming them into timeless works of art. Our team of
            passionate photographers is dedicated to telling stories through the
            lens, ensuring that every click captures the essence of your unique
            journey.
          </h2>
        </div>
        <div className="absolute w-[690px] flex flex-col  right-0">
          <div className="bg-red-500 w-[680px] h-[400px] rounded-[20px]">
            Div 1
          </div>
          <div className="flex flex-row mt-[20px]">
            <div className="bg-yellow-300 w-[279px] h-[250px] rounded-[20px]">
              Div 2
            </div>
            <div className="bg-blue-500 w-[380px] h-[250px] ms-[21px] rounded-[20px]">
              Div 3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
