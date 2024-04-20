import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../components/Loader";
import axios from "axios";
const CoursePage = () => {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({});
  const { courseId } = useParams();

  const getCourseById = (courseId) => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER}/user/get-course/${courseId}`)
      .then(({ data }) => {
        setCourse(data[0]);
        setLoading(false);
        console.log(data[0]);
        return toast.success("course fetched");
      })
      .catch((err) => {
        setLoading(false);
        return toast.error(err.message);
      });
  };

  useEffect(() => {
    getCourseById(courseId);
  }, []);

  return (
    <>
      <Toaster />
      {loading ? <Loader /> : ""}
      <div>{courseId}</div>
    </>
  );
};

export default CoursePage;
