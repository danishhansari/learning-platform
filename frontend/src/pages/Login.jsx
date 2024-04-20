const Login = () => {
  return (
    <>
      <div className="max-w-[350px] mx-auto w-full h-cover flex justify-center flex-col px-4">
        <h1 className="text-black text-md font-bold mb-4">
          Log in to you Udemy account
        </h1>
        <form>
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
          <button className="bg-purple-600 hover:bg-purple-700 text-center w-full py-4 font-semibold text-white">
            Log in
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
