import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { createContext } from "react";

export const SidebarContext = createContext({});
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Router>
        <SidebarContext.Provider value={{ isOpen, onOpen, onClose }}>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Sidebar />} />
            </Route>
          </Routes>
        </SidebarContext.Provider>
      </Router>
    </>
  );
}

export default App;
