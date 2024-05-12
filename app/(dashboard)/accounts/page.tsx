"use client";

// hooks
import { useNewAccount } from "@/features/accounts/hooks";

// components
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

// types
import { columns, type Payment } from "@/app/(dashboard)/accounts/column";

async function getData(): Promise<Payment[]> {
    return [
        {
            id: "asd",
            amount: 100,
            status: "pending",
            email: "test@test.com",
        },
        {
            id: "asd",
            amount: 100,
            status: "pending",
            email: "a@test.com",
        },
    ];
}

const data: Payment[] = [
    {
        id: "asd",
        amount: 100,
        status: "pending",
        email: "test@test.com",
    },
    {
        id: "asd",
        amount: 100,
        status: "pending",
        email: "a@test.com",
    },
];

const AccountsPage = () => {
    const newAccount = useNewAccount();

    return (
        <div className="component-container w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">AccountsPage</CardTitle>
                    <Button onClick={newAccount.onOpen} size="sm">
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={data}
                        filterKey="email"
                        onDelete={() => {}}
                        disabled={false}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default AccountsPage;
