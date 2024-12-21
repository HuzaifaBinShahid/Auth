import ArrowIcon from "./ArrowIcon";

const NavList = ({ items }:any) => {
  return (
    <ul className="flex gap-6 text-white text-[20px] font-semibold">
      {items.map((item :any, index:any) => (
        <li key={index} className="flex gap-2 items-center">
          {item} <ArrowIcon />
        </li>
      ))}
    </ul>
  );
};

export default NavList;
