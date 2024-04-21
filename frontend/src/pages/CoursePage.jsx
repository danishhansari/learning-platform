import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../components/Loader";
import Cookie from "js-cookie";
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
        setCourse(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        return toast.error(err.message);
      });
  };

  const initPayment = (order) => {
    const options = {
      key: import.meta.env.KEY_ID,
      amount: order.price,
      currency: order.currency,
      order_id: order.id,
      handler: async (response) => {
        axios
          .post(`${import.meta.env.VITE_SERVER}/user/verify-payment`, response)
          .then(({ data }) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      theme: {
        color: "3399cc"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleBuyCourse = (courseId) => {
    let loadingToast = toast.loading("purchasing...");
    console.log(courseId);
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/user/purchase-course`,
        { courseId },
        {
          headers: {
            Authorization: `${Cookie.get("accessToken")}`,
          },
        }
      )
      .then(({ data: { order } }) => {
        console.log(order);
        toast.dismiss(loadingToast);
        initPayment(order);
        return toast.success("course purchase");
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        console.log(err);
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
      <div className="h-cover mt-4 md:mt-8">
        <div className="flex p-4 flex-col md:flex-row justify-center max-w-[1200px] gap-4 mx-auto w-full">
          <img src={course.imgUrl} className="w-full" alt={course.title} />
          <div className="data">
            <p className="text-2xl font-semibold mb-4">{course.title}</p>

            <p className="text-xl mb-4">{course.description}</p>

            <p className="text-2xl text-blue-500 font-medium mb-8">
              Only &#8377;{course.price}
            </p>
            <button
              className="bg-blue-700 text-white block w-full rounded-md py-4 text-xl hover:bg-blue-800"
              onClick={() => handleBuyCourse(course._id)}
            >
              Buy the course
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
