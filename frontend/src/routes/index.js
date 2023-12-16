// All components mapping with path for internal routes

import { lazy } from "react";
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const GetStarted = lazy(() => import("../pages/protected/GetStarted"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Leads = lazy(() => import("../pages/protected/Leads"));
const Team = lazy(() => import("../pages/protected/Team"));
const Bills = lazy(() => import("../pages/protected/Bills"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const AddResources = lazy(() => import("../pages/protected/AddResources"));
const Feedback = lazy(() => import("../pages/Feedback"));
const UserListChat = lazy(() => import("../pages/protected/UserListChat"));
const UserProfile = lazy(() => import("../pages/protected/UserProfile"));
const MentalHealthResource = lazy(() =>
  import("../pages/protected/MentalHealthResource")
);
const HealthDetailPage = lazy(() =>
  import("../pages/protected/HealthDetailPage")
);
const CounselingServices = lazy(() =>
  import("../pages/protected/CounselingServices")
);
const Charts = lazy(() => import("../pages/protected/Charts"));



const routes = [
  {
    path: "/home", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/userList",
    component: UserListChat,
  },

  {
    path: "/feedback",
    component: Feedback,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/userProfile",
    component: UserProfile,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/GetStarted",
    component: GetStarted,
  },

  {
    path: "/mentalHealthResource",
    component: MentalHealthResource,
  },
  {
    path: "/healthDetail",
    component: HealthDetailPage,
  },
  {
    path: "/counselingServices",
    component: CounselingServices,
  },
  {
    path: "/report",
    component: Charts,
  },

];

export default routes;
