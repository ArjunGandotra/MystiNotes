import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <div className="container mx-auto flex items-center justify-center flex-col h-screen mt-64 md:mt-0 lg:mt-0">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
