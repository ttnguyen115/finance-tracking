"use client";

// libs

// hooks
import { useNewTransaction } from "@/features/transactions/hooks";

// components
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Plus } from "lucide-react";

// types
import { columns, type ResponseType as Transaction } from "@/app/(dashboard)/transactions/column";
import { type Row } from "@tanstack/react-table";

// apis
import { useBulkDeleteTransactions, useGetTransactions } from "@/features/transactions/api";

const TransactionsPage = () => {
    const { onOpen } = useNewTransaction();
    const { data: transactions = [], isLoading } = useGetTransactions();
    const { isPending, mutate } = useBulkDeleteTransactions();

    const isDisabled = isLoading || isPending;

    const onDeleteRow = (rows: Row<Transaction>[]) => {
        const ids = rows.map((row: Row<Transaction>) => row.original.id);
        mutate({ ids });
    };

    if (isLoading) {
        return (
            <div className="component-container w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="component-container w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
                    <Button onClick={onOpen} size="sm">
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={transactions}
                        filterKey="account"
                        onDelete={onDeleteRow}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default TransactionsPage;
