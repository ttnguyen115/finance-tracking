import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.transactions.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.transactions.$post>;

const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    const mutation: any = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response: any = await client.api.transactions.$post({ json });
            return await response.json();
        },
        onSuccess() {
            toast.success("Transaction created!");
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: () => {
            toast.error("Failed to create transaction.");
        },
    });

    return mutation;
};

export default useCreateTransaction;
