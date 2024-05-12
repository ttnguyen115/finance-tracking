// hooks
import { useNewCategory } from "@/features/categories/hooks";

// components
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "@/features/categories/components";

// types
import { type FormValues } from "./CategoryForm";

// apis
import { useCreateCategory } from "@/features/categories/api";

const NewCategorySheet = () => {
    const { isOpen, onClose } = useNewCategory();

    const { mutate, isPending } = useCreateCategory();

    const defaultCategoryFormValues = {
        name: "",
    };

    const onSubmit = (values: FormValues) => {
        mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New category</SheetTitle>
                    <SheetDescription>
                        Create a new category to organize your transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm
                    onSubmit={onSubmit}
                    disabled={isPending}
                    defaultValues={defaultCategoryFormValues}
                />
            </SheetContent>
        </Sheet>
    );
};

export default NewCategorySheet;
