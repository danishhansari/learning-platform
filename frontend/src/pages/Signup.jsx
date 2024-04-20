const Signup = () => {
  return (
    <>
      <div className="max-w-[350px] mx-auto w-full h-cover flex justify-center flex-col px-4">
        <h1 className="text-md font-bold mb-4">Sign up and start learning</h1>
        <form>
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
          <button className="bg-purple-600 hover:bg-purple-700 text-center w-full py-4 font-semibold text-white">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
