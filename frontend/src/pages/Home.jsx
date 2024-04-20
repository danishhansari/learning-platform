import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Card from "../components/Card";

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
