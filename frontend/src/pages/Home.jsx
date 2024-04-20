import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

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

  useEffect(() => {
    setLoading(true);
    fetchCourses();
  }, []);
  return (
    <>
      {loading === true ? <Loader /> : ""}
      <Sidebar />
      <div className="h-cover px-[3vw] py-4 pt-8">
        <h1 className="text-4xl font-bold">Courses</h1>

        {courses.map((course, item) => {
          return (
            <div key={item} className="course-card">
              <p>{course.title}</p>
              <p>{course.description}</p>
              <p>{course.price}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
