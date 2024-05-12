"use client";

// hooks
import { useMountedState } from "@/hooks";

// feature components
import NewAccountSheet from "@/features/accounts/components/NewAccountSheet";
import EditAccountSheet from "@/features/accounts/components/EditAccountSheet";

export const SheetProvider = () => {
    const isMounted = useMountedState();

    if (!isMounted) return null;

    return (
        <>
            <NewAccountSheet />
            <EditAccountSheet />
        </>
    );
};
