"use client";

import { useSearchParams } from "next/navigation";

// utils
import { formatDateRange } from "@/utils";

// api
import { useGetSummary } from "@/features/summary/api";

// icons
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

// components
import DataCard, { DataCardLoading } from "@/components/DataCard";

const DataGrid = () => {
    const params = useSearchParams();
    const from = params.get("from") || undefined;
    const to = params.get("to") || undefined;

    const { data: summary, isLoading } = useGetSummary();

    const dateRangeLabel = formatDateRange({ from, to });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
                <DataCardLoading />
                <DataCardLoading />
                <DataCardLoading />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCard
                title="Remaining"
                value={summary?.remainingAmount}
                percentageChange={summary?.remainingChange}
                icon={FaPiggyBank}
                dateRange={dateRangeLabel}
            />
            <DataCard
                title="Income"
                value={summary?.incomeAmount}
                percentageChange={summary?.incomeChange}
                icon={FaArrowTrendUp}
                dateRange={dateRangeLabel}
            />
            <DataCard
                title="Expenses"
                value={summary?.expensesAmount}
                percentageChange={summary?.expensesChange}
                icon={FaArrowTrendDown}
                dateRange={dateRangeLabel}
            />
        </div>
    );
};

export default DataGrid;
