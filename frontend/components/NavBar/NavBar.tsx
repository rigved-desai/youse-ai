import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
  import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "@/node_modules/next/link"

export default function NavBar() {
    return (
        <div className="w-full top-0 flex justify-center">
  <div className="p-4">
    <NavigationMenu>
        <NavigationMenuList>
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
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  </div>
</div>
    )
}