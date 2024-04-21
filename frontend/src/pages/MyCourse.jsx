import axios from "axios";
import { useEffect } from "react";
import Cookie from "js-cookie";

const MyCourse = () => {
  const accessToken = Cookie.get("accessToken");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/user/get-my-courses`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>MyCourse</div>;
};

export default MyCourse;
