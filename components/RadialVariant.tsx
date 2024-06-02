import { memo } from "react";

// utils
import { formatCurrency } from "@/utils";

// components
import CategoryTooltip from "@/components/CategoryTooltip";
import { Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

const RadialVariant = ({ data }: RadialVariantProps) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadialBarChart
                cx="50%"
                cy="30%"
                barSize={10}
                innerRadius="90%"
                outerRadius="40%"
                data={data.map((item, index) => ({
                    ...item,
                    fill: COLORS[index % COLORS.length],
                }))}
            >
                <RadialBar
                    label={{
                        position: "insideStart",
                        fill: "#fff",
                        fontSize: "12px",
                    }}
                    background
                    dataKey="value"
                />
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    content={({ payload }: any) => {
                        return (
                            <ul className="flex flex-col space-y-2">
                                {/* TODO: fix these `any` */}
                                {payload.map((entry: any, index: any) => (
                                    <li key={`item-${index}`} className="flex items-center space-x-2">
                                        <span
                                            className="size-2 rounded-full"
                                            style={{ backgroundColor: entry.color }}
                                        />
                                        <div className="space-x-1">
                                            <span className="text-sm text-muted-foreground">{entry.value}</span>
                                            <span className="text-sm">{formatCurrency(entry.payload.value)}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        );
                    }}
                />
                <Tooltip content={<CategoryTooltip />} />
            </RadialBarChart>
        </ResponsiveContainer>
    );
};

type RadialVariantProps = {
    data: {
        name: string;
        value: number;
    }[];
};

export default memo(RadialVariant);
