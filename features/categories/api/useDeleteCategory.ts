import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation: any = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response: any = await client.api.categories[":id"]["$delete"]({
                param: { id },
            });
            return await response.json();
        },
        onSuccess() {
            toast.success("Account deleted!");
            queryClient.invalidateQueries({ queryKey: ["categories", { id }] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            // TODO: Invalidate summary and transactions
        },
        onError: () => {
            toast.error("Failed to delete account.");
        },
    });

    return mutation;
};

export default useDeleteCategory;
