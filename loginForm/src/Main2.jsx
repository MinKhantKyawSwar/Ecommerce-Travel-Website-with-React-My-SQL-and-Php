
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav.jsx"

const Main2 = () => {
  return (
    <section className="max-w-[80%] mx-auto h-screen">
      <Nav/>
      <Outlet />
    </section>
  );
};

export default Main2;