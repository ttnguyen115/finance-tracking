import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<(typeof client.api.accounts)[":id"]["$delete"]>;

const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response: any = await client.api.accounts[":id"]["$delete"]({
                param: { id },
            });
            return await response.json();
        },
        onSuccess() {
            toast.success("Account deleted!");
            queryClient.invalidateQueries({ queryKey: ["account", { id }] });
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            // Revalidate when deleting in `transactions` page
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            // TODO: Invalidate summary and transactions
        },
        onError: () => {
            toast.error("Failed to delete account.");
        },
    });

    return mutation;
};

export default useDeleteAccount;
