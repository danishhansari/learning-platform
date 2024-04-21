import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import Sidebar from "./components/Sidebar";
import MyCourse from "./pages/MyCourse";
import Cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";

export const SidebarContext = createContext({});
export const UserContext = createContext({});
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = Cookie.get("accessToken");
    if (token) {
      axios
        .post(`${import.meta.env.VITE_SERVER}/user/get-user`, {
          accessToken: token,
        })
        .then(({ data }) => {
          setUser({ ...data, accessToken: token });
        })
        .catch((err) => {
          console.log(err);
          return toast.error(err.message);
        });
    } else {
      setUser({ accessToken: null });
    }
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <SidebarContext.Provider value={{ isOpen, onOpen, onClose }}>
            <Routes>
              <Route path="/" element={<Navbar />}>
                <Route path="/" element={<Sidebar />}>
                  <Route index element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/course/:courseId" element={<CoursePage />} />
                  <Route path="/my-course" element={<MyCourse />} />
                </Route>
              </Route>
            </Routes>
          </SidebarContext.Provider>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
