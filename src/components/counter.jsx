export default function Counter() {
  return (
    <div className="flex flex-row justify-between relative overflow-x-visible">
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
          <p className="text-[18px \]">
            With over 10 years of experience, we have captured countless moments
            and crafted stunning visuals. Our team's dedication and passion have
            led to numerous awards and recognition. Join the growing number of
            satisfied clients who have experienced the magic of Capture Studio.
          </p>
        </div>
        <div className="mt-[30px] flex gap-[20px]">
          <div>
            <h1 className="font-bold text-[48px] text-center">550+</h1>
            <p className="text-center text-[18px]">Clients</p>
          </div>
          <div>
            <h1 className="font-bold text-[48px] text-center">9000+</h1>
            <p className="text-center text-[18px]">Moment Captured</p>
          </div>
        </div>
      </div>
    </div>
  );
}
