import {
  HelpIcon,
  BuildingStoreIcon,
  ShoppingCartIcon,
  TruckDeliveryIcon,
  PackageIcon,
  Map2Icon,
  SteeringWheelIcon,
  LayoutDashboardIcon,
  LogoutIcon,
  MoodHappyIcon,
  UserPlusIcon,
} from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  expanded?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/dashboard",
  },
];
export default sidebarItem;
