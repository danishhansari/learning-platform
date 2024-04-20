import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { createContext } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

export const SidebarContext = createContext({});
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Router>
        <SidebarContext.Provider value={{ isOpen, onOpen, onClose }}>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </SidebarContext.Provider>
      </Router>
    </>
  );
}

export default App;
