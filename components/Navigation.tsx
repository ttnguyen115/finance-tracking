"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

// libs
import { useMedia } from "@/hooks";

// constants
import { NavigationRoutes } from "@/constants";

// components
import NavButton from "@/components/NavButton";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/ui/menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMedia("(max-width: 1024px)", false);

    const [isOpen, setIsOpen] = useState(false);

    const isActiveRoute = (href: string) => pathname === href;

    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    };

    if (isMobile) {
        const buttonClassnames =
            "font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent text-white outline-none focus:bg-white/30 transition";

        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button variant="outline" size="sm" className={buttonClassnames}>
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {NavigationRoutes.map((route) => (
                            <Button
                                key={route.href}
                                variant={isActiveRoute(route.href) ? "secondary" : "ghost"}
                                onClick={() => onClick(route.href)}
                                className="w-full justify-start"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        );
    }

    const renderNavItems = () =>
        NavigationRoutes.map((route) => (
            <NavButton
                key={route.href}
                href={route.href}
                label={route.label}
                isActive={isActiveRoute(route.href)}
            />
        ));
    return (
        <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {renderNavItems()}
        </div>
    );
};

export default Navigation;
