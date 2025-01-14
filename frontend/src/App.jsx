import Index from "./pages/homepage/Index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import isLoginLoader from "./utils/isLogin";
import Profile from "./pages/profile/Profile";
import ManageProfile from "./pages/profile/ManageProfile";

import Details from "./pages/homepage/Details";
import PackageDetails from "./pages/package/PackageDetails";
import SavedPackages from "./pages/package/SavedPackages";
import Booking from "./pages/booking/Booking";
import Explore from "./pages/explore/Explore";
import Admin from "./pages/admin/Index";
import PackageForm from "./components/Forms/PackageForm";
import GuideForm from "./components/Forms/GuideForm";
import Recipts from "./pages/admin/Recipts";
import Main from "./layout/Main";
import { UserContextProvider } from "./providers/UserContext";
import DestinationForm from "./components/Forms/DestinationForm";
import PackageDetailsForm from "./components/Forms/PackageDetailsForm";
import EditPackageDetailsForm from "./components/Forms/EditPackageDetailsForm";
import ScrollToTopOnNavigation from "./providers/ScrollToTopOnNavigation";
import ResetPassword from "./components/Auth/ResetPassword";
import CustomerDetailsPage from "./pages/admin/CustomerDetailsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTopOnNavigation />
          <Main />
        </>
      ),
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
          path: "/reset-password",
          element: <ResetPassword />,
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
          path: "/admin/manage-destination/packages",
          element: <PackageForm />,
        },
        {
          path: "/admin/manage-destination/packages/:id",
          element: <PackageForm />,
        },
        {
          path: "/admin/manage-destination/packages/package-details/:id",
          element: <PackageDetailsForm />,
        },
        {
          path: "/admin/manage-destination/packages/manage-package-details/:id",
          element: <EditPackageDetailsForm />,
        },
        {
          path: "/admin/manage-guide/",
          element: <GuideForm />,
        },
        {
          path: "/admin/manage-guide/:id",
          element: <GuideForm />,
        },
        {
          path: "/recipts/:id",
          element: <Recipts />,
        },
        {
          path: "/customerDetails/:userId",
          element: <CustomerDetailsPage/>,
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
