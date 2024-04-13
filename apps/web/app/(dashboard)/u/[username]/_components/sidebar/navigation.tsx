"use client";


import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { NavItem, NavItemsSkeleton } from "./nav-item";

export const Navigation = () => {
  const pathname = usePathname();
  const { data } = useSession();
 const user = data?.user;
  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemsSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          Icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
