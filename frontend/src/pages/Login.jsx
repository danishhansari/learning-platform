import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../App";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const userLogin = (formData) => {
    axios
      .post(`${import.meta.env.VITE_SERVER}/user/signin`, formData)
      .then(({ data, data: { accessToken, options } }) => {
        console.log(accessToken);
        const time = new Date(options.expires).getTime();
        console.log(time);
        setUser(data);

        Cookie.set("accessToken", accessToken, {
          expires: new Date(time),
        });
        toast.success("logged in");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const form = new FormData(formElement);
    const formData = {};

    for (const [key, value] of form) {
      formData[key] = value;
    }

    const { email, password } = formData;

    if (!email.length) {
      return toast.error("Email cannot be empty");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 character password long with a numeric, 1 lowercase and 1 uppercase letter"
      );
    }

    userLogin(formData);
  };

  return (
    <>
      <Toaster />
      <div className="max-w-[350px] mx-auto w-full h-cover flex justify-center flex-col px-4">
        <h1 className="text-black text-md font-bold mb-4">
          Log in to you Udemy account
        </h1>
        <form id="formElement">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="placeholder:text-black text-md border py-4 pl-5 w-full border-black focus:outline-none mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="placeholder:text-black text-md border py-4 pl-5 w-full border-black focus:outline-none mb-2"
          />
          <button
            className="bg-purple-600 hover:bg-purple-700 text-center w-full py-4 font-semibold text-white"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
