/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import IdentificationIcon from "@heroicons/react/24/outline/IdentificationIcon";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/outline/ChatBubbleLeftRightIcon";
import ChatBubbleBottomCenterTextIcon from "@heroicons/react/24/outline/ChatBubbleBottomCenterTextIcon";
import ArchiveBoxArrowDownIcon from "@heroicons/react/24/outline/ArchiveBoxArrowDownIcon";
import ShieldExclamationIcon from "@heroicons/react/24/outline/ShieldExclamationIcon";
import HandRaisedIcon from "@heroicons/react/24/outline/HandRaisedIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import ViewfinderCircleIcon from "@heroicons/react/24/outline/ViewfinderCircleIcon";
import UserPlusIcon from "@heroicons/react/24/outline/UserPlusIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";


const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

export const UserRoutes = [
  {
    path: "/app/report ", // url
    icon: <HomeIcon className={iconClasses} />,
    name: "Home",
    adminOnly: true, // Only accessible for admin
    userOnly: true, // Accessible for both admin and user
  },
  {
    path: "/app/settings-profile", //url
    icon: <UserIcon className={submenuIconClasses} />, // icon component
    name: "Profile", // name that appear in Sidebar
  },
  {
    path: "/app/userList", // url
    icon: <ChatBubbleLeftRightIcon className={iconClasses} />, // icon component
    name: "Start chatting", // name that appear in Sidebar
  },
  {
    path: "/app/ChatBox?listen=true&roomId=all", // url
    icon: <ChatBubbleBottomCenterTextIcon className={iconClasses} />, // icon component
    name: "Start listening", // name that appear in Sidebar
  },
  {
    path: "/app/mental-health-resource ", // url
    icon: <HandRaisedIcon className={iconClasses} />, // icon component
    name: "Mental Health Resource ", // name that appear in Sidebar
  },
];

export const AdminRoutes = [
  {
    path: "/app/report ", // url
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/app/leads", // url
    icon: <IdentificationIcon className={iconClasses} />, // icon component
    name: "Manage User", // name that appear in Sidebar
  },
  {
    path: "/app/viewResource", // url
    icon: <ArchiveBoxArrowDownIcon className={iconClasses} />, // icon component
    name: "View Resource", // name that appear in Sidebar
  },
  {
    path: "/app/add-resources", // url
    icon: <UserPlusIcon className={iconClasses} />, // icon component
    name: "Add Resources", // name that appear in Sidebar
  },
  {
    path: "/app/add-resources", // url
    icon: <UserPlusIcon className={iconClasses} />, // icon component
    name: "Manage Health Assessment", // name that appear in Sidebar
  },
];
