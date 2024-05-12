import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"];
type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;

const useBulkDeleteCategories = () => {
    const queryClient = useQueryClient();

    const mutation: any = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response: any = await client.api.categories["bulk-delete"]["$post"]({ json });
            return await response.json();
        },
        onSuccess() {
            toast.success("Account deleted!");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            // TODO: Also invalidate summary
        },
        onError: () => {
            toast.error("Failed to delete account.");
        },
    });

    return mutation;
};

export default useBulkDeleteCategories;
