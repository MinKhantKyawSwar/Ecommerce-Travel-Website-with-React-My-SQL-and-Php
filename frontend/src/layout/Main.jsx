import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/footer";

const Main = () => {
  return (
    <section className="max-w-[100%] mx-autopy-2 h-screen">
      <Nav />
      <div className="pt-12 px-10 ">
        <Outlet />
      </div>
      <div className="px-0">
        <Footer />
      </div>
    </section>
  );
};

export default Main;
