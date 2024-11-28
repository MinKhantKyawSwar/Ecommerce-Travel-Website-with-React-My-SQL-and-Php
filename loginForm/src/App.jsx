import Index from "./Index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main2 from "./Main2";
import Login from "./Login";
import Register from "./Register";
import isLoginLoader from "./utils/isLogin";
import Profile from "./components/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main2 />,
      children: [
        {
          index: true,
          element: <Index />
        },
        {
          path: "/register",
          element:<Register/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/profile",
          element: <Profile/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;