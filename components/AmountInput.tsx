// utils
import { cn } from "@/lib/utils";

// components
import { CurrencyInput } from "@/components/ui/currency-input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, MinusCircle, PlusCircle } from "lucide-react";

const AmountInput = ({ value, onChange, placeholder, disabled }: AmountInputProps) => {
    const parsedValue = parseFloat(value);
    const isIncome = parsedValue > 0;
    const isExpense = parsedValue < 0;

    const onReverseValue = () => {
        if (!value) return;
        const newValue = parseFloat(value) * -1;
        onChange(newValue.toString());
    };

    const buttonClassNames = cn(
        "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition",
        isIncome && "bg-emerald-500 hover:bg-emerald-600",
        isExpense && "bg-rose-500 hover:bg-rose-600"
    );

    const currencyInputClassNames =
        " pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <button type="button" onClick={onReverseValue} className={buttonClassNames}>
                            {!parsedValue && <Info className="size-3 text-white" />}
                            {isIncome && <PlusCircle className="size-3 text-white" />}
                            {isExpense && <MinusCircle className="size-3 text-white" />}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>Use [+] for income and [-] for expenses</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CurrencyInput
                prefix="$"
                className={currencyInputClassNames}
                placeholder={placeholder}
                value={value}
                decimalScale={2}
                decimalsLimit={2}
                onValueChange={onChange}
                disabled={disabled}
            />
            <p className="text-xs text-muted-foreground mt-2">
                {isIncome && "This will count as income"}
                {isExpense && "This will count as an expense"}
            </p>
        </div>
    );
};

type AmountInputProps = {
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
};

export default AmountInput;
