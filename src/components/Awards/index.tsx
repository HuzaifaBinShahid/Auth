import ArrowIcon from "../commonComponents/ArrowIcon";

const Awards = () => {
  return (
    <section id="awards" className="w-[90%] mx-auto">
      <div className="relative">
        <h3 className="text-[#121725] text-[59px] font-bold">
          Award Winning{" "}
          <span className="text-[#bcc0cb] underline font-semibold">
            Branding Agency
          </span>{" "}
          providing a wide range of digital services Design &{" "}
          <span className="text-orangetext">Development</span> Expertise. Our
          team of experts is dedicated to crafting{" "}
          <span className="text-[#bcc0cb]">solutions....</span>
        </h3>

        <div className="absolute top-0 right-52 -rotate-12 opacity-0 hover:opacity-100 transition-opacity duration-500 transform -translate-x-[50%] ">
        <img 
          src="https://pixor-react.wpolive.com/static/media/about-1.1b4acf050c09f84397e2.jpg"
          alt="awards section image"
        />
        </div>

       
      </div>

      <div className="flex justify-between my-12">
        <p className="text-orangetext text-[22px] my-8">
          More About Us <ArrowIcon />
        </p>

        <div className="w-[45%] text-[#565656] text-[14px] font-semibold">
          <p>
            It has stood the test of time and proceeds Elevate your brand with
            the Agencyo Agency – everything from strategy to advertising &
            scale.
          </p>
          <div className="flex text-orangetext mt-8">
            <div className="mr-12">
              <p className="text-black font-bold text-[60px]">150 +</p>
              <p className="underline">
                Clients Served <ArrowIcon />
              </p>
            </div>
            <div>
              <p className="text-black font-bold text-[60px]">50 +</p>
              <p className="underline">
                World Branch <ArrowIcon />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
