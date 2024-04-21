import axios from "axios";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

const MyCourse = () => {
  const accessToken = Cookie.get("accessToken");
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER}/user/get-my-courses`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      });
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-x-2 gap-y-4 mt-4 px-2">
        {loading ? <Loader /> : ""}
        {course.map((course, item) => {
          return <Card {...course} key={item} />;
        })}
      </div>
    </>
  );
};

export default MyCourse;
