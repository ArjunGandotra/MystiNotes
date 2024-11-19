import React from "react";
import { LogInForm } from "../form";

const LogIn = () => {
  return (
    <>
      <div className="card text-center mb-4">
        <h2 className="text-4xl font-bold mb-2">
          Welcome Back, MystiNoter! &#128075;
        </h2>
        <p className="font-semibold">
          Log In to your account to continue Noting!
        </p>
      </div>
      <div className="card p-2 flex w-full flex-col lg:flex-row justify-center">
        <div className="card p-5 min-h-32 min-w-[18.75rem] bg-base-300 grid place-items-center">
          content
        </div>

        <div className="divider lg:divider-horizontal">OR</div>

        <div className="card p-5 min-h-32 min-w-[18.75rem] grid place-items-center">
          <LogInForm />
        </div>
      </div>
    </>
  );
};

export default LogIn;
