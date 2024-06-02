// utils
import { formatCurrency } from "@/utils";
import { format } from "date-fns";

// components
import { Separator } from "@/components/ui/separator";

const CategoryTooltip = ({ active, payload }: any) => {
    if (!active) return null;

    const [
        {
            value,
            payload: { name },
        },
    ] = payload;

    return (
        <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
            <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">{name}</div>
            <Separator />
            <div className="p-2 px-3 space-y-1">
                {/* TODO: refactor duplicated code */}
                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 bg-rose-500 rounded-full" />
                        <p className="text-sm text-muted-foreground">Expenses</p>
                    </div>
                    <p className="text-sm text-right font-medium">{formatCurrency(value * -1)}</p>
                </div>
                {/* TODO: end */}
            </div>
        </div>
    );
};

type CategoryTooltipProps = {
    active: boolean;
    payload: any;
};

export default CategoryTooltip;
