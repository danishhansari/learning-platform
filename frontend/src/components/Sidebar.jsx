import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { SidebarContext } from "../App";
import { useContext } from "react";

function Sidebar() {
  const { isOpen, onOpen, onClose } = useContext(SidebarContext);

  return (
    <>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>
              <i className="fi fi-rr-user"></i>
              Some contents...
            </p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
