import { lazy } from "react";
import authRoute from "./authRoute";
import type { Routes } from "@/@types/routes";

export const publicRoutes: Routes = [...authRoute];

export const protectedRoutes: Routes = [
  {
    key: "home",
    path: "/home",
    component: lazy(() => import("@/views/app/Dashboard")),
    authority: [],
  },
  {
    key: "employees",
    path: "/employees",
    component: lazy(() => import("@/views/app/Employees")),
    authority: [],
  },
  {
    key: "purchases",
    path: "/purchases",
    component: lazy(() => import("@/views/app/Purchases")),
    authority: [],
  },
  {
    key: "settings",
    path: "/settings",
    component: lazy(() => import("@/views/app/Settings")),
    authority: [],
  },
];
