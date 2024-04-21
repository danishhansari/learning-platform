import axios from "axios";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import Card from "../components/Card";

const MyCourse = () => {
  const accessToken = Cookie.get("accessToken");
  const [course, setCourse] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/user/get-my-courses`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setCourse(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-x-2 gap-y-4 mt-4 px-8">
        {course.map((course, item) => {
          return <Card {...course} key={item} />;
        })}
      </div>
    </>
  );
};

export default MyCourse;
