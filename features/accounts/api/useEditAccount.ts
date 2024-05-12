import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];
type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;

const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation: any = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response: any = await client.api.accounts[":id"]["$patch"]({
                json,
                param: { id },
            });
            return await response.json();
        },
        onSuccess() {
            toast.success("Account edited!");
            queryClient.invalidateQueries({ queryKey: ["accounts", { id }] });
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            // TODO: Invalidate summary and transactions
        },
        onError: () => {
            toast.error("Failed to edit account.");
        },
    });

    return mutation;
};

export default useEditAccount;
