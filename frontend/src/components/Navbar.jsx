import { useContext } from "react";
import logo from "../imgs/logo.png";
import { Link, Outlet } from "react-router-dom";
import { SidebarContext } from "../App";
import { useColorMode } from "@chakra-ui/react";

const Navbar = () => {
  const { onOpen } = useContext(SidebarContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <div className="flex px-[3vw] h-[80px] py-4 shadow-md gap-4 items-center w-full justify-between">
        <button className="md:hidden p-2" onClick={onOpen}>
          <i className="fi fi-rr-menu-burger"></i>
        </button>

        <img src={logo} alt="logo" className="w-24 h-[80%]" />
        <p className="hidden md:block">Categories</p>
        <div className="relative flex-1 h-full w-full  hidden md:flex items-center">
          <i className="fi fi-rr-search text-sm absolute left-4 top-1/2 -translate-y-1/2"></i>
          <input
            type="text"
            placeholder="Search for anything"
            className="border border-black pl-12 rounded-full placeholder:text-black/40 placeholder:text-sm focus:outline-none h-full flex-1"
          />
        </div>
        <p className="hidden md:block">Udemy Business</p>
        <p className="hidden md:block text-xs md:text-sm">Teach on Udemy</p>
        <div className="flex gap-4 items-center">
          <button onClick={toggleColorMode}>
            <i
              className={`text-xl fi fi-rr-${
                colorMode === "light" ? "moon" : "brightness"
              }`}
            ></i>
          </button>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <button className="font-semibold border-2 border-black bg-white py-1 px-4 hover:bg-black hover:text-white text-sm">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="font-semibold border-2 border-black bg-black text-white py-1 px-4 hover:bg-white hover:text-black text-sm">
                Sign up
              </button>
            </Link>
          </div>
          <button>
            <i className="text-xl fi fi-rr-globe"></i>
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
