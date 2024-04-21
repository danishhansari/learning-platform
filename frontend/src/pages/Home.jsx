import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Cookie from "js-cookie";
import { UserContext } from "../App";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const {
    user: { accessToken },
    setUser,
  } = useContext(UserContext);

  const fetchCourses = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/user/all-courses`)
      .then(({ data: { response } }) => {
        setCourses(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getCurrentUser = () => {
    const token = Cookie.get("accessToken");
    console.log("this is token", token);
    if (token) {
      axios
        .post(`${import.meta.env.VITE_SERVER}/user/get-user`, {
          accessToken: token,
        })
        .then(({ data }) => {
          setUser(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCourses();
    getCurrentUser();
  }, []);
  return (
    <>
      {console.log(courses)}
      <div className="h-cover px-[3vw] py-4 pt-8">
        <h1 className="text-4xl font-bold">Courses</h1>
        {loading === true ? <Loader /> : ""}

        <div className="flex flex-wrap gap-x-2 gap-y-4 mt-4">
          {courses.map((course, item) => {
            return <Card {...course} key={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
