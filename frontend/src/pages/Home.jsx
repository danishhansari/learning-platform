import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/user/all-courses`)
      .then(({ data: { response } }) => {
        setCourses(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
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
