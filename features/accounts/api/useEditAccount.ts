import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<(typeof client.api.accounts)[":id"]["$patch"]>["json"];
type ResponseType = InferResponseType<(typeof client.api.accounts)[":id"]["$patch"]>;

const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.accounts[":id"]["$patch"]({
                json,
                param: { id },
            });
            return await response.json();
        },
        onSuccess() {
            toast.success("Account edited!");
            queryClient.invalidateQueries({ queryKey: ["account", { id }] });
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            // Update account when editing in `transactions` page
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["summary"] });
        },
        onError: () => {
            toast.error("Failed to edit account.");
        },
    });

    return mutation;
};

export default useEditAccount;
