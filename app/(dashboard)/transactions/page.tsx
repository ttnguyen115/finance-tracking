"use client";

import { useState } from "react";
import { toast } from "sonner";

// hooks
import { useSelectAccount } from "@/features/accounts/hooks";
import { useNewTransaction } from "@/features/transactions/hooks";

// components
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Plus } from "lucide-react";
import ImportCard from "./ImportCard";
import UploadButton from "./UploadButton";

// types
import { columns, type ResponseType as Transaction } from "@/app/(dashboard)/transactions/column";
import { type Row } from "@tanstack/react-table";

// apis
import { useBulkCreateTransactions, useBulkDeleteTransactions, useGetTransactions } from "@/features/transactions/api";

// schema
import { transactions as transactionSchema } from "@/db/schema";

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {},
};

const TransactionsPage = () => {
    const [AccountDialog, confirm] = useSelectAccount();

    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const { onOpen } = useNewTransaction();

    const { data: transactions = [], isLoading: isFetchingTransactions } = useGetTransactions();
    const { mutate: bulkCreateTransactions, isPending: isCreatingTransactions } = useBulkCreateTransactions();
    const { mutate: bulkDeleteTransactions, isPending: isDeletingTransactions } = useBulkDeleteTransactions();

    const isDisabled = isFetchingTransactions || isCreatingTransactions || isDeletingTransactions;

    const onDeleteRow = (rows: Row<Transaction>[]) => {
        const ids = rows.map((row: Row<Transaction>) => row.original.id);
        bulkDeleteTransactions({ ids });
    };

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    };

    const onSubmitImport = async (values: (typeof transactionSchema.$inferInsert)[]) => {
        const accountId = await confirm();
        if (!accountId) return toast.error("Please select an account to continue.");
        const data = values.map((value) => ({
            ...value,
            accountId: accountId as string,
        }));
        console.log(data);
        bulkCreateTransactions(data, {
            onSuccess: onCancelImport,
        });
    };

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST);
    };

    if (isFetchingTransactions) {
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

    if (variant === VARIANTS.IMPORT) {
        return (
            <>
                <AccountDialog />
                <ImportCard data={importResults.data} onCancel={onCancelImport} onSubmit={onSubmitImport} />
            </>
        );
    }

    return (
        <div className="component-container w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
                    <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                        <Button onClick={onOpen} size="sm" className="w-full lg:w-auto">
                            <Plus className="size-4 mr-2" />
                            Add new
                        </Button>
                        <UploadButton onUpload={onUpload} />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={transactions}
                        filterKey="payee"
                        onDelete={onDeleteRow}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default TransactionsPage;
