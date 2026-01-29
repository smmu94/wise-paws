"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserMenuItems } from "@/lib/navigation";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { UserMenuProps } from "./types";

export const UserMenu = ({ user }: UserMenuProps) => {
  const t = useTranslations("header");
  const userItems = getUserMenuItems();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-10 w-10 border border-light-gray cursor-pointer hover:border-salmon transition-colors">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback className="bg-light-cream text-medium-gray text-small-bolder">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex flex-col gap-0.5 py-3">
          <span className="text-body-bolder text-dark-gray">{user.name}</span>
          <span className="text-small text-medium-gray font-normal">{user.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {userItems.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link href={item.href} className="w-full flex items-center gap-2 cursor-pointer">
              <item.icon className="size-4 text-medium-gray" />
              <span>{t(item.name)}</span>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="gap-2 cursor-pointer"
          onClick={() => console.log("Cerrando sesión...")}
        >
          <LogOut className="size-4" />
          <span>{t("userMenu.logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};