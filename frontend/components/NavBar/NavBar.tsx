"use client";
import { logoutUser } from "@/app/api/api"
import { useUser } from "@/app/contexts/UserContext";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
  import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "@/node_modules/next/link"

export default function NavBar() {
    const userContext = useUser();
    return (
        <div className="w-full top-0 flex justify-center">
  <div className="p-4">
    <NavigationMenu>
        <NavigationMenuList>
            {
                userContext && userContext.user ?
                <NavigationMenuItem>
            <Link href="/tasks" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Tasks
                </NavigationMenuLink>
            </Link>
            <Link href="/board" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Board
                </NavigationMenuLink>
            </Link>
            <Link href="/login" legacyBehavior passHref>
            <NavigationMenuLink onClick={logoutUser} className={navigationMenuTriggerStyle()}>
                    Logout
            </NavigationMenuLink>
            </Link>
            </NavigationMenuItem>
                 :
                 <NavigationMenuItem>
                 <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Login
                </NavigationMenuLink>
            </Link>
            <Link href="/sign-up" legacyBehavior passHref>
            <NavigationMenuLink onClick={logoutUser} className={navigationMenuTriggerStyle()}>
                    Sign Up
            </NavigationMenuLink>
            </Link>
            </NavigationMenuItem>
            }
        </NavigationMenuList>
    </NavigationMenu>
  </div>
</div>
    )
}