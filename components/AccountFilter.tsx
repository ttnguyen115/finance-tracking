"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

// api
import { useGetAccounts } from "@/features/accounts/api";
import { useGetSummary } from "@/features/summary/api";

// components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AccountFilter = () => {
    const router = useRouter();
    const pathname = usePathname();

    const params = useSearchParams();
    const accountId = params.get("accountId") || "all";
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const { data: accounts, isLoading: isFetchingAccounts } = useGetAccounts();
    const { data: summary, isLoading: isFetchingSummary } = useGetSummary();

    const onChange = (newValue: string) => {
        const query = { accountId: newValue, from, to };

        if (newValue === "all") query.accountId = "";

        const url = qs.stringifyUrl({ url: pathname, query }, { skipNull: true, skipEmptyString: true });
        router.push(url);
    };

    const isGetting = isFetchingAccounts || isFetchingSummary;

    const selectTriggerClassnames =
        "lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus-transparent outline-none text-white focus:bg-white/30 transition";

    return (
        <Select value={accountId} onValueChange={onChange} disabled={isGetting}>
            <SelectTrigger className={selectTriggerClassnames}>
                <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All accounts</SelectItem>
                {accounts?.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                        {account.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default AccountFilter;
