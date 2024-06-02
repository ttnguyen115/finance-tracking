import { memo } from "react";

// utils
import { format } from "date-fns";

// components
import CustomTooltip from "@/components/CustomTooltip";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const BarVariant = ({ data }: BarVariantProps) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                    dataKey="income"
                    fill="#3d82f6"
                    className="drop-shadow-sm"
                />
                <Bar
                    dataKey="expenses"
                    fill="#f43f5e"
                    className="drop-shadow-sm"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

type BarVariantProps = {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[];
};

export default memo(BarVariant);
