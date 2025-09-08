import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@workspace/ui/components/navigation-menu";
import { Button } from "@workspace/ui/components/button";

const navigationLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/delta-neutral", label: "Delta Neutral" },
  { href: "/bridge", label: "Bridge" },
];

export default function Header() {
  return (
    <header className=" sticky top-0 z-50 flex justify-between items-center">
      {/* Logo */}
      <div className="flex  gap-2 justify-start px-2 py-2 items-center">
        <Link
          href="/"
          className="flex items-center gap-2 font-medium px-4 py-1 bg-muted/40 hover:bg-muted border border-dashed -m-2"
        >
          <div className="text-primary-foreground flex size-8 items-center justify-center rounded-md">
            🦔
          </div>
          <div className="flex flex-col -gap-1">
            <p className="text-sm font-bold">Hedgehog</p>
          </div>
        </Link>
        <div className="flex justify-between items-center">
          <NavigationMenu className="max-md:hidden pl-2">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.href}
                    className="text-muted-foreground hover:text-primary p-2 hover:bg-muted py-1.5 font-medium"
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="flex items-center gap-4">
        <Button variant="default" size="lg">
          Connect Wallet
        </Button>
      </div>
    </header>
  );
}
