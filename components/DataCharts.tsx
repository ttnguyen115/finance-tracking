"use client";

// api
import { useGetSummary } from "@/features/summary/api";


// components
import Chart from "@/components/Chart";

const DataCharts = () => {
    const { data: summary, isLoading } = useGetSummary();

    if (isLoading) {
        return <div>loading...</div>;
    }

    return <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
            <Chart data={summary?.days} />
        </div>
    </div>;
};

export default DataCharts;
