import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <main className="flex-grow pt-14 px-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Main;
