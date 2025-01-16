import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <section className="max-w-[100%] mx-auto py-2">
      <Nav />
      <div className="pt-24 px-10 ">
        <Outlet />
      </div>
      <div className="px-0 pt-5">
        <Footer />
      </div>
    </section>
  );
};

export default Main;
