import React from "react";
import Header from "../components/Header";
type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  return (
    <>
      <div className="">
        <Header />
        {children}
      </div>
    </>
  );
};
export default HomeLayout;
