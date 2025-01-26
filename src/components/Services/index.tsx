import MoreServices from "../../assets/svgs/MoreServices";
import { servicesPerformance } from "../../constants";
import ServicesCard from "../commonComponents/ServicesCard";

const Services = () => {
  return (
    <section id="services">
      <div className="bg-bgImage">
        <div className="content w-[90%] mx-auto py-24">
          <p className="text-orangetext text-[18px] font-bold my-3">
            Recent Projects
          </p>

          <hr className="bg-[#cccccc24] opacity-5 m-auto" />

          <h3 className="text-[65px] font-semibold text-white">
            OUR <span className="font-normal italic">SERVICES</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicesPerformance.map((service, index) => (
              <ServicesCard
                key={index}
                title={service.title}
                description={service.description}
                // image={service.image}
              />
            ))}
          </div>

          <div className="flex justify-center items-center py-12">
            <div className="relative text-center w-[200px] h-[200px]">
              <p className="absolute top-16 left-12 font-bold text-[24px] z-10">
                More <br /> Services
              </p>
              <MoreServices />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
