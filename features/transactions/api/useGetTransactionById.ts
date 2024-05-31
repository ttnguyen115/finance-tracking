import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/utils";

const useGetTransactionById = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["transaction", { id }],
        queryFn: async () => {
            const response = await client.api.transactions[":id"].$get({
                param: { id },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch transaction");
            }

            const { data } = await response.json();
            data.amount = convertAmountFromMiliunits(data.amount);
            return data;
        },
    });

    return query;
};

export default useGetTransactionById;
