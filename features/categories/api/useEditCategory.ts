import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"];
type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>;

const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation: any = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response: any = await client.api.categories[":id"]["$patch"]({
                json,
                param: { id },
            });
            return await response.json();
        },
        onSuccess() {
            toast.success("Account edited!");
            queryClient.invalidateQueries({ queryKey: ["categories", { id }] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            // TODO: Invalidate summary and transactions
        },
        onError: () => {
            toast.error("Failed to edit account.");
        },
    });

    return mutation;
};

export default useEditCategory;
