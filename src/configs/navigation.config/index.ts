import { NAV_ITEM_TYPE_ITEM } from "@/constants/navigation.constant";
import type { NavigationTree } from "@/@types/navigation";

const navigationConfig: NavigationTree[] = [
  {
    key: "home",
    path: "/home",
    title: "Home",
    translateKey: "home",
    icon: "home",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "employees",
    path: "/employees",
    title: "Employees",
    translateKey: "employees",
    icon: "users",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: "purchases",
    path: "/purchases",
    title: "Purchases",
    translateKey: "purchases",
    icon: "purchases",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
];

export default navigationConfig;
