import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { SidebarContext } from "../App";
import { useContext } from "react";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Sidebar() {
  const { isOpen, onClose } = useContext(SidebarContext);

  return (
    <>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <img className="w-24" src={logo} alt="loog" />
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <div className="flex flex-col items-start justify-start">
              <button className="text-purple-600 text-md font-semibold my-4">
                <Link to="/login">Login in</Link>
              </button>
              <button className="text-purple-600 text-md font-semibold">
                <Link to="/signup">Sign up</Link>
              </button>
              <button className="text-purple-600 text-md font-semibold my-4">
                <Link to="/my-course">My Course</Link>
              </button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Outlet />
    </>
  );
}

export default Sidebar;
