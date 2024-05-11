// libs
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

// constants
import { NavigatorPath } from "@/constants";
import { cn } from "@/lib/utils";

const ClerkFetchingComponent = ({
    component = 'UserButton',
    children,
    loaderClassnames = "",
}: ClerkFetchingComponentProps) => {
    const InnerComponent =
        component === "UserButton" ? (
            <UserButton afterSignOutUrl={NavigatorPath.DASHBOARD} />
        ) : (
            children
        );

    const classNames = cn('animate-spin', loaderClassnames);

    return (
        <>
            <ClerkLoaded>{InnerComponent}</ClerkLoaded>
            <ClerkLoading>
                <Loader2 className={classNames} />
            </ClerkLoading>
        </>
    );
};

interface ClerkFetchingComponentProps {
    component?: string;
    children?: React.ReactNode;
    loaderClassnames?: string;
}

export default ClerkFetchingComponent;
