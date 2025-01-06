import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/footer";

const Main = () => {
  return (
    <section className="max-w-[100%] mx-auto py-2 h-screen">
      <Nav />
      <div className="pt-20 px-10 ">
        <Outlet />
      </div>
      <div className="px-0">
        <Footer />
      </div>
    </section>
  );
};

export default Main;
