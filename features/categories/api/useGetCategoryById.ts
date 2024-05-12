import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

const useGetCategoryById = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["categories", { id }],
        queryFn: async () => {
            const response = await client.api.categories[":id"].$get({
                param: { id },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch account");
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
};

export default useGetCategoryById;
