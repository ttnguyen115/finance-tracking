import { format, subDays } from "date-fns";

type Period = {
    from: string | Date | undefined;
    to: string | Date | undefined;
}

function formatDateRange(period?: Period) { 
    const shortMonthWithDay = "LLL dd";
    const shortMonthWithDayAndYear = "LLL dd, y";

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    if (!period?.from) {
        return `${format(defaultFrom, shortMonthWithDay)} - ${format(defaultTo, shortMonthWithDayAndYear)}`;
    }
    if (period.to) {
        return `${format(period.from, shortMonthWithDay)} - ${format(period.to, shortMonthWithDayAndYear)}`;
    }

    return format(period.from, shortMonthWithDayAndYear);
};

export default formatDateRange;