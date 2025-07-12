import Image from "next/image";
export default function Feature() {
  return (
    <div className="mt-[18px] mx-[130px] mb-[57.04px] flex flex-col">
      <div className="flex justify-center  font-bold text-[48px]">
        <h1>Explore Our Expertise</h1>
      </div>
      <div className="mt-[90px] mx-[86.5px] flex justify-between">
        <div className="w-[267px] h-[230px] flex flex-col justify-between">
          <div className="flex justify-center">
            <Image
              src="/Photo Gallery.png"
              width={72}
              height={72}
              alt="Photo Gallery"
            ></Image>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-[20px]">Professional Editing</h1>
            <h2 className="text-[18px] font-normal text-center mt-[10]">
              Every detail perfected with care. Your photos, your story,
              enhanced.
            </h2>
          </div>
        </div>
        <div className="w-[267px] h-[230px] flex flex-col justify-between">
          <div className="flex justify-center">
            <Image
              src="/My Location.png"
              width={72}
              height={72}
              alt="My Location"
            ></Image>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-[20px]">Long Hour Shot</h1>
            <h2 className="text-[18px] font-normal text-center mt-[10]">
              Unlimited time for your moments. We stay until your story ends.
            </h2>
          </div>
        </div>
        <div className="w-[267px] h-[230px] flex flex-col justify-between">
          <div className="flex justify-center">
            <Image
              src="/Camera.png"
              width={72}
              height={72}
              alt="Camera"
            ></Image>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-[20px]">Extensive Equipment</h1>
            <h2 className="text-[18px] font-normal text-center mt-[10]">
              Gears to match your vision. Whatever you need, we’re ready.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
