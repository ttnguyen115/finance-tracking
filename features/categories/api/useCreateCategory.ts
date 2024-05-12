import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.categories.$post>;

const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const mutation: any = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response: any = await client.api.categories.$post({ json });
            return await response.json();
        },
        onSuccess() {
            toast.success("Account created!");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: () => {
            toast.error("Failed to create account.");
        },
    });

    return mutation;
};

export default useCreateCategory;
