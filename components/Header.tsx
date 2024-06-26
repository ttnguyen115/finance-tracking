"use client";

import ClerkFetchingComponent from "@/components/ClerkFetchingComponent";
import Filters from "@/components/Filters";
import HeaderLogo from "@/components/HeaderLogo";
import Navigation from "@/components/Navigation";
import WelcomeMsg from "@/components/WelcomeMsg";

const Header = () => {
    return (
        <div className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
            <div className="component-container">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />
                        <Navigation />
                    </div>
                    <ClerkFetchingComponent loaderClassnames="size-8 text-slate-400" />
                </div>
                <WelcomeMsg />
                <Filters />
            </div>
        </div>
    );
};

export default Header;
