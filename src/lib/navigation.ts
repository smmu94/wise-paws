import { LayoutDashboard, User } from "lucide-react";
import { routes } from "./routes";

export const NAV_LINKS: Array<{
    name: string;
    href: string;
}> = [
    { name: "navLinks.home", href: routes.home },
    { name: "navLinks.adopt", href: routes.adopt.list },
    { name: "navLinks.about", href: routes.about },
    { name: "navLinks.contact", href: routes.contact },
    { name: "navLinks.blog", href: routes.blog.list },
];

export const getUserMenuItems = () => [
  { 
    name: "userMenu.dashboard", 
    href: "/dashboard", 
    icon: LayoutDashboard 
  },
  { 
    name: "userMenu.profile", 
    href: "/dashboard/profile", 
    icon: User 
  },
];
