"use client";

import { useGetAccounts } from "@/features/accounts";

const Dashboard = () => {
    const { data: accounts, isLoading } = useGetAccounts();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {accounts?.map((account) => (
                <div className="" key={account.id}>
                    {account.name}
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
