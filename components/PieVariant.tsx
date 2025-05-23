import { memo } from "react";

// utils
import { formatPercentage } from "@/utils";

// components
import CategoryTooltip from "@/components/CategoryTooltip";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

const PieVariant = ({ data }: PieVariantProps) => {
    const renderLegendContent = ({ payload }: any) => {
        return (
            <ul className="flex flex-col space-y-2">
                {/* TODO: fix these `any` */}
                {payload.map((entry: any, index: number) => (
                    <li key={`item-${index}`} className="flex items-center space-x-2">
                        <span className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <div className="space-x-1">
                            <span className="text-sm text-muted-foreground">{entry.value}</span>
                            <span className="text-sm">{formatPercentage(entry.payload.percent * 100)}</span>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    content={renderLegendContent}
                />
                <Tooltip content={<CategoryTooltip />} />
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={60}
                    paddingAngle={2}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

type PieVariantProps = {
    data: {
        name: string;
        value: number;
    }[];
};

export default memo(PieVariant);
