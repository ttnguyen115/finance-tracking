import { memo } from "react";

// utils
import { format } from "date-fns";

// components
import CustomTooltip from "@/components/CustomTooltip";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const LineVariant = ({ data }: LineVariantProps) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
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
                <Line
                    dot={false}
                    dataKey="income"
                    stroke="#3d82f6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
                <Line
                    dot={false}
                    dataKey="expenses"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

type LineVariantProps = {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[];
};

export default memo(LineVariant);
