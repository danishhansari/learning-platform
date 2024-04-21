import axios from "axios";
import Cookie from "js-cookie";
import { useContext } from "react";
import { UserContext } from "../App";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const userSignup = (formData) => {
    axios
      .post(`${import.meta.env.VITE_SERVER}/user/signup`, formData)
      .then(({ data, data: { accessToken, options } }) => {
        toast.success("User added ");
        const time = new Date(options.expires).getTime();
        console.log(time);
        setUser(data);

        Cookie.set("accessToken", accessToken, {
          expires: new Date(time),
        });

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

    for (const [key, value] of form.entries()) {
      formData[key] = value;
    }

    const { name, email, password } = formData;

    if (name && name.length < 3) {
      return toast.error("User should more than 3 letters");
    }

    if (!email.length) {
      return toast.error("email cannot be empty");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 character password long with a numeric, 1 lowercase and 1 uppercase letter"
      );
    }

    userSignup(formData);
  };

  return (
    <>
      <div className="max-w-[350px] mx-auto w-full h-cover flex justify-center flex-col px-4">
        <Toaster />
        <h1 className="text-md font-bold mb-4">Sign up and start learning</h1>
        <form id="formElement">
          <input
            type="name"
            name="name"
            placeholder="Full name"
            className="text-md border py-4 pl-5 w-full border-black focus:outline-none mb-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="text-md border py-4 pl-5 w-full border-black focus:outline-none mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="text-md border py-4 pl-5 w-full border-black focus:outline-none mb-2"
          />
          <div className="flex gap-1 my-4">
            <input type="checkbox" defaultChecked={true} />

            <p className="leading-none tracking-tighter">
              Send me special offers, personalized recommandation, and learning
              tips
            </p>
          </div>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-center w-full py-4 font-semibold text-white"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
