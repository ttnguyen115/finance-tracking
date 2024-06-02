import React, { useState } from "react";

// icons
import { AreaChart, BarChart3, FileSearch, LineChart, Loader2 } from "lucide-react";

// components
import AreaVariant from "@/components/AreaVariant";
import BarVariant from "@/components/BarVariant";
import LineVariant from "@/components/LineVariant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export const ChartLoading = () => (
    <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-full lg:w-[120px]" />
        </CardHeader>
        <CardContent>
            <div className="h-[350px] w-full flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
            </div>
        </CardContent>
    </Card>
);

const Chart = ({ data = [] }: ChartProps) => {
    const [chartType, setChartType] = useState("area");

    const onTypeChange = (type: string) => {
        // TODO: Add paywall
        setChartType(type);
    };

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
                {/* TODO: split out this select */}
                <Select defaultValue={chartType} onValueChange={onTypeChange}>
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="area">
                            <div className="flex items-center">
                                <AreaChart className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">Area chart</p>
                            </div>
                        </SelectItem>
                        <SelectItem value="line">
                            <div className="flex items-center">
                                <LineChart className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">Line chart</p>
                            </div>
                        </SelectItem>
                        <SelectItem value="bar">
                            <div className="flex items-center">
                                <BarChart3 className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">Bar chart</p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
                {/* TODO: end */}
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                        <FileSearch className="size-6 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">No data for this period</p>
                    </div>
                ) : (
                    // TODO: refactor this one into switch case
                    <>
                        {chartType === "area" && <AreaVariant data={data} />}
                        {chartType === "bar" && <BarVariant data={data} />}
                        {chartType === "line" && <LineVariant data={data} />}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

type ChartProps = {
    data?: {
        date: string;
        income: number;
        expenses: number;
    }[];
};

export default Chart;
