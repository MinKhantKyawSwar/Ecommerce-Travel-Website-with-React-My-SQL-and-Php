import Registeration from "./Registeration";
import Index from "./Index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main2 from "./Main2";
import Login from "./Login";
import Register from "./Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main2 />,
      children: [
        {
          index: true,
          element: (
            <Index />
          )
          ,
        },
        {
          path: "/register",
          element: (
            // <Registeration />
            <Register/>
          )
          ,
        },
        {
          path: "/login",
          element: (
            <Login />
          )
          ,
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;