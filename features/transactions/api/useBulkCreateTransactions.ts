import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"];
type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>;

const useBulkCreateTransactions = () => {
    const queryClient = useQueryClient();

    const mutation: any = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response: any = await client.api.transactions["bulk-create"]["$post"]({ json });
            return await response.json();
        },
        onSuccess() {
            toast.success("Transactions created!");
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            // TODO: Invalidate summary
        },
        onError: () => {
            toast.error("Failed to create transactions.");
        },
    });

    return mutation;
};

export default useBulkCreateTransactions;
