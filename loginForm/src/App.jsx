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
import PackageDetails from "./components/PackageDetails";
import SavedPackages from "./components/SavedPackages";
import Booking from "./components/Booking";
import Explore from "./components/Explore";
import Admin from "./pages/admin/Index";
import DestinationForm from "./pages/admin/DestinationForm";
import PackageForm from "./pages/admin/PackageForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main2 />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/destination/:id",
          element: <Details />,
        },
        {
          path: "/destination/:id/package/:id",
          element: <PackageDetails />,
        },
        {
          path: "/profile/manage-profile",
          element: <ManageProfile />,
        },
        {
          path: "/saved-packages",
          element: <SavedPackages />,
        },
        {
          path: "/booking/:id",
          element: <Booking />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/admin/manage-destination",
          element: <DestinationForm />,
        },
        {
          path: "/admin/manage-destination/:id",
          element: <DestinationForm />,
        },
        {
          path: "/admin/manage-destination/packages/",
          element: <PackageForm />,
        },
        {
          path: "/admin/manage-destination/packages/:id",
          element: <PackageForm />,
        },
      ],
    },
  ]);
  return (
    <UserContextProvider>
      <RouterProvider router={router} />;
    </UserContextProvider>
  );
}

export default App;
