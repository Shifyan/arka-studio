export default function Gallery() {
  return (
    <div className="mx-[130px]">
      <div>
        <h1 className="text-[50px] font-semibold">
          Journey Through Our Gallery
        </h1>
        <p className="text-[20px] mt-[20px]">
          Immerse yourself in the captivating world of photography.
        </p>
      </div>
      <div className="mt-[43px]">
        <div className="flex gap-[20px]">
          <div
            className="basis-2/3  rounded-[50px] h-[250px] bg-cover bg-center"
            style={{ backgroundImage: "url('/gallery-1.jpg')" }}
          ></div>
          <div
            className="basis-1/3  rounded-[50px] h-[250px] bg-cover bg-center "
            style={{ backgroundImage: "url('/gallery-2.jpg')" }}
          ></div>
        </div>
        <div className="flex gap-[20px] mt-[20px]">
          <div
            className="basis-1/3 rounded-[50px] bg-cover bg-center"
            style={{ backgroundImage: "url('/gallery-3.jpg')" }}
          ></div>
          <div className="basis-2/3 flex flex-col gap-[20px]">
            <div
              className=" rounded-[50px] h-[250px] bg-cover bg-center"
              style={{ backgroundImage: "url('/gallery-4.jpg')" }}
            ></div>
            <div
              className=" rounded-[50px] h-[250px] bg-cover bg-center"
              style={{ backgroundImage: "url('/gallery-5.jpg')" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
