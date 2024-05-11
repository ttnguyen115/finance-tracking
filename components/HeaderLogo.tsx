import Link from "next/link";

// constants
import { NavigatorPath } from "@/constants";
import Image from "next/image";

const HeaderLogo = () => {
    return (
        <Link href={NavigatorPath.DASHBOARD}>
            <div className="items-center hidden lg:flex">
                <Image src="/logo.svg" alt="logo" height={28} width={28} />
                <p className="font-semibold text-white text-2xl ml-2.5">Finance</p>
            </div>
        </Link>
    );
};

export default HeaderLogo;
