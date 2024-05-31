"use client";

// hooks
import { useNewCategory } from "@/features/categories/hooks";

// components
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Plus } from "lucide-react";

// types
import { columns } from "@/app/(dashboard)/categories/column";
import { type Row } from "@tanstack/react-table";

// apis
import { useBulkDeleteCategories, useGetCategories } from "@/features/categories/api";

const CategoriesPage = () => {
    const { onOpen } = useNewCategory();
    const { data: categories = [], isLoading } = useGetCategories();
    const { isPending, mutate } = useBulkDeleteCategories();

    const isDisabled = isLoading || isPending;

    const onDeleteRow = (rows: Row<any>[]) => {
        const ids = rows.map((row: Row<any>) => row.original.id);
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
                    <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
                    <Button onClick={onOpen} size="sm">
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={categories}
                        filterKey="name"
                        onDelete={onDeleteRow}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default CategoriesPage;
