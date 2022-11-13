import { motion, useCycle } from "framer-motion";
import categories from "../../utils/categories";
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuButton = ({ onClick, isOpen }) => {
  return (
    <motion.button
      className="menu-button bg-white"
      onClick={onClick}
      animate={isOpen ? "open" : "closed"}
      initial={false}
    >
      <svg
        width="23"
        height="23"
        style={{ margin: "4px 0 0 2px" }}
        viewBox="0 0 23 23"
      >
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </motion.button>
  );
};

const slideVerticalAnimation = {
  open: {
    rotateX: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      mass: 0.8,
      type: "spring",
    },
    display: "block",
  },
  close: {
    rotateX: -15,
    y: -320,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const slideHorizontalAnimation = {
  left: {
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  right: {
    x: -250,
    transition: {
      duration: 0.3,
    },
  },
};

export const Nav = () => {
  const [isOpen, toggleDropdown] = useCycle(false, true);
  const [isLeftMenu, toggleMenu] = useCycle(true, false);

  return (
    <div className="fixed top-0 left-0 z-50 block">
      <MenuButton onClick={toggleDropdown} isOpen={isOpen} />
      <motion.div
        className="dropdown-container "
        initial="close"
        animate={isOpen ? "open" : "close"}
        variants={slideVerticalAnimation}
      >
        <motion.div
          className="dropdown "
          initial="left"
          animate={isLeftMenu ? "left" : "right"}
          variants={slideHorizontalAnimation}
        >
          <motion.div className="h-[90vh] overflow-auto">
            <ul className="grid grid-cols-2 sm:grid-cols-3   gap-3 bg-blue-400 pb-3 w-full ">
              {categories.map((item, index) => (
                <li key={index} className={` flex flex-col `}>
                  <a href={`/${item.name}`}>
                    <div
                      className={`relative hover:scale-110  rounded-md w-36 h-24 transition m-auto `}
                    >
                      <img
                        src={item.image}
                        alt=""
                        className={` w-full h-full brightness-50 object-cover rounded-md transition`}
                      />
                      <p className="  absolute top-[50%] left-[50%] g text-sm text-white capitalize font-bold ">
                        {item.name}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
