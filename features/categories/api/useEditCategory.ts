import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<(typeof client.api.categories)[":id"]["$patch"]>["json"];
type ResponseType = InferResponseType<(typeof client.api.categories)[":id"]["$patch"]>;

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
            toast.success("Category edited!");
            queryClient.invalidateQueries({ queryKey: ["category", { id }] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            // Update category when editing in `transactions` page
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            // TODO: Invalidate summary and transactions
        },
        onError: () => {
            toast.error("Failed to edit category.");
        },
    });

    return mutation;
};

export default useEditCategory;
