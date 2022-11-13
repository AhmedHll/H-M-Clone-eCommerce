import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./arrows";
import { Nav } from "./Nav";
import categories from "../../utils/categories";
import usePreventBodyScroll from "./usePreventBodyScroll";
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function Header({ height }: { height: string }) {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <>
      <div className="hidden md:block">
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {categories.map((item, index) => (
              <li key={index} className={`p-4 flex flex-col `}>
                <a href={`/${item.name}`}>
                  <div
                    className={`s relative hover:scale-110  rounded-md  bg-center bg-cover w-36 ${height}   `}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className={`img w-full h-full brightness-50 object-cover rounded-md transition`}
                    />
                    <p className="  absolute top-[50%] left-[50%] g text-sm text-white capitalize font-bold ">
                      {item.name}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ScrollMenu>
        </div>
      </div>
      <div className="md:hidden">
        <Nav />
      </div>
    </>
  );
}
export default Header;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
