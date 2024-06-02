"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

// api
import { useGetAccounts } from "@/features/accounts/api";
import { useGetSummary } from "@/features/summary/api";

// utils
import { formatDateRange } from "@/utils";
import { format, subDays } from "date-fns";

// components
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";

// types
import { ChevronDown } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "./ui/calendar";

const DateFilter = () => {
    const router = useRouter();
    const pathname = usePathname();

    const params = useSearchParams();
    const accountId = params.get("accountId");
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const paramState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo,
    };

    const [date, setDate] = useState<DateRange | undefined>(undefined);

    const { data: accounts, isLoading: isFetchingAccounts } = useGetAccounts();
    const { data: summary, isLoading: isFetchingSummary } = useGetSummary();

    const buttonTriggerClassnames =
        "lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus-transparent outline-none text-white focus:bg-white/30 transition";

    useEffect(() => {
        setDate(paramState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const pushToUrl = (dateRange: DateRange | undefined) => {
        const fullYearMonthDayFormatStr = "yyyy-MM-dd";
        const query = {
            from: format(dateRange?.from || defaultFrom, fullYearMonthDayFormatStr),
            to: format(dateRange?.to || defaultTo, fullYearMonthDayFormatStr),
            accountId,
        };
        const url = qs.stringifyUrl({ url: pathname, query }, { skipNull: true, skipEmptyString: true });
        router.push(url);
    };

    const onReset = () => {
        setDate(undefined);
        pushToUrl(undefined);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button disabled={false} size="sm" variant="outline" className={buttonTriggerClassnames}>
                    <span>{formatDateRange(paramState)}</span>
                    <ChevronDown className="ml-2 size-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-auto w-full p-0" align="start">
                <Calendar
                    disabled={false}
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
                <div className="p-4 w-full flex items-center gap-x-2">
                    <PopoverClose asChild>
                        <Button
                            onClick={onReset}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                            variant="outline"
                        >
                            Reset
                        </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                        <Button
                            onClick={() => pushToUrl(date)}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                        >
                            Apply
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default DateFilter;
