import CommonButton from "../commonComponents/CommonButton";
import NavList from "../commonComponents/NavList";

const Navbar = () => {
  const navItems = ["Home", "About", "Services", "Portfolio"];

  return (
    <section id="navbar">
      <div className="flex justify-between items-center my-8 mx-20">
        <div>
          <img
            src="https://pixor-react.wpolive.com/static/media/logo.238c5f83428fc0b5ecb53c0837f5e287.svg"
            alt=""
          />
        </div>
        <div>
          <NavList items={navItems} />
        </div>
        <div>
          <CommonButton btnText="Contact Us" variant="normal" isArrowIcon = {true} />
        </div>
      </div>

      <hr className="bg-[#FFFFFF0F] w-[90%] opacity-5 m-auto" />
    </section>
  );
};

export default Navbar;
