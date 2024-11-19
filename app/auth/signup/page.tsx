import React from "react";
import { SignUpForm } from "../form";

const SignUp = () => {
  return (
    <>
      <div className="card text-center mb-4">
        <h2 className="text-4xl font-bold mb-2">
          Join & Start your Note-Taking Journey
        </h2>
        <p className="font-semibold">
          100% free in all dimensions for all eternity &#128516;
        </p>
      </div>
      <div className="card p-2 flex w-full flex-col lg:flex-row justify-center">
        <div className="card p-5 min-h-32 min-w-[18.75rem] bg-base-300 grid place-items-center">
          content
        </div>

        <div className="divider lg:divider-horizontal">OR</div>

        <div className="card p-5 min-h-32 min-w-[18.75rem] grid place-items-center">
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default SignUp;
