"use client";

import AccountFilter from "@/components/AccountFilter";
import DateFilter from "@/components/DateFilter";

const Filters = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
            <AccountFilter />
            <DateFilter />
        </div>
    );
};

export default Filters;
