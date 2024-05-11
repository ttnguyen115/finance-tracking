"use client";

// hooks
import { useMountedState } from "@/hooks";

// feature components
import NewAccountSheet from "@/features/accounts/components/NewAccountSheet";

export const SheetProvider = () => {
    const isMounted = useMountedState();

    if (!isMounted) return null;

    return (
        <>
            <NewAccountSheet />
        </>
    );
};
