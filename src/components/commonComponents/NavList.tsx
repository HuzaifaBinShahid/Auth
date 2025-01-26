import { useRef, useState } from "react";
import { navbarSubMenu } from "../../constants";
import ArrowIcon from "./ArrowIcon";

const NavList = ({ items }: any) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<number>(0);
  const listRef = useRef<HTMLUListElement>(null);

  const handleMouseEnter = (
    index: number,
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    setHoveredIndex(index);

    const listItem = event.currentTarget;
    const listRect = listRef.current?.getBoundingClientRect();
    const itemRect = listItem.getBoundingClientRect();

    if (listRect) {
      const leftPosition = itemRect.left - listRect.left;
      setMenuPosition(leftPosition);
    }
  };

  return (
    <div className="relative" onMouseLeave={() => setHoveredIndex(null)}>
      <ul
        ref={listRef}
        className="flex gap-4 text-white text-[18px] font-semibold"
      >
        {items.map((item: any, index: any) => (
          <li
            key={index}
            className="flex gap-2 items-center cursor-pointer"
            onMouseEnter={(e) => handleMouseEnter(index, e)}
          >
            {item}{" "}
            <ArrowIcon color={hoveredIndex === index ? "#B1DE00" : undefined} />
          </li>
        ))}
      </ul>

      {hoveredIndex !== null && (
        <div className="absolute left-0 w-full">
          {/* Invisible hover bridge to maintain menu visibility */}
          <div className="h-[42px] w-full absolute  bg-transparent" />

          <ul
            className="bg-white w-[225px] p-4 z-10 mt-10"
            style={{ marginLeft: `${menuPosition}px` }}
          >
            {navbarSubMenu[hoveredIndex].titles.map(
              (title: any, index: any) => (
                <li
                  key={index}
                  className="text-black font-[500] py-2 hover:text-[#B1DE00] transition-colors duration-300 cursor-pointer"
                >
                  {title}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavList;
