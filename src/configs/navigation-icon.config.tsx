import { HiOutlineUsers, HiOutlineHome, HiOutlineCurrencyDollar } from "react-icons/hi";

export type NavigationIcons = Record<string, JSX.Element>;

const navigationIcon: NavigationIcons = {
  home: <HiOutlineHome />,
  users: <HiOutlineUsers />,
  purchases: <HiOutlineCurrencyDollar />,
};

export default navigationIcon;
