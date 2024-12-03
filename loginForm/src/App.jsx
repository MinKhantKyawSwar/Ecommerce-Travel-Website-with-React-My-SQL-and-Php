import Index from "./Index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main2 from "./Main2";
import Login from "./Login";
import Register from "./Register";
import isLoginLoader from "./utils/isLogin";
import Profile from "./components/Profile";
import ManageProfile from "./components/ManageProfile";
import { UserContextProvider } from "./utils/UserContext";
import Details from "./components/Details";

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
        },
        {
          path : "/destination/:id",
          element: <Details/>
        },
        {
          path: "/profile/manage-profile",
          element: <ManageProfile/>
        }
      ],
    },
  ]);
  return (
  <UserContextProvider>
    <RouterProvider router={router} />;
  </UserContextProvider>
  )
};

export default App;