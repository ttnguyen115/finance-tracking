"use client";

// hooks
import { useNewAccount } from "@/features/accounts/hooks";

// components
import { Button } from "@/components/ui/button";

const Dashboard = () => {
    const { onOpen } = useNewAccount();

    return (
        <div>
            <Button onClick={onOpen}>Add an account</Button>
        </div>
    );
};

export default Dashboard;
