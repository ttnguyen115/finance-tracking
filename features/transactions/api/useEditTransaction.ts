import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<(typeof client.api.transactions)[":id"]["$patch"]>["json"];
type ResponseType = InferResponseType<(typeof client.api.transactions)[":id"]["$patch"]>;

const useEditTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation: any = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response: any = await client.api.transactions[":id"]["$patch"]({
                json,
                param: { id },
            });
            return await response.json();
        },
        onSuccess() {
            toast.success("Transaction edited!");
            queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            // TODO: Invalidate summary
        },
        onError: () => {
            toast.error("Failed to edit transaction.");
        },
    });

    return mutation;
};

export default useEditTransaction;
