import Link from "next/link";

// utils
import { cn } from "@/lib/utils";

// components
import { Button } from "@/components/ui/button";

const NavButton = ({ href, label, isActive }: NavButtonProps) => {
    const buttonClassnames = cn(
        "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
        isActive ? "bg-white/10 text-white" : "bg-transparent"
    );

    return (
        <Button asChild size="sm" variant="outline" className={buttonClassnames}>
            <Link href={href}>{label}</Link>
        </Button>
    );
};

interface NavButtonProps {
    href: string;
    label: string;
    isActive?: boolean;
}

export default NavButton;
