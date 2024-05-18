// utils
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";

// types
import { type SelectSingleEventHandler } from "react-day-picker";

const DatePicker = ({ value, onChange, disabled }: DatePickerProps) => {
    const buttonClassNames = cn(
        "w-full justify-start text-left font-normal",
        !value && "text-muted-foreground"
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button disabled={disabled} variant="outline" className={buttonClassNames}>
                    <CalendarIcon className="size-4 mr-2" />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={disabled}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

type DatePickerProps = {
    value?: Date;
    onChange?: SelectSingleEventHandler;
    disabled?: boolean;
};

export default DatePicker;
