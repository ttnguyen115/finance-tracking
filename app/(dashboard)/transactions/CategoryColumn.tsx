// hooks
import { useOpenCategory } from "@/features/categories/hooks";
import { useOpenTransaction } from "@/features/transactions/hooks";

// utils
import { cn } from "@/lib/utils";

// components
import { TriangleAlert } from "lucide-react";

const CategoryColumn = ({ id, category, categoryId }: CategoryColumnProps) => {
    const { onOpen: onOpenCategory } = useOpenCategory();
    const { onOpen: onOpenTransaction } = useOpenTransaction();

    const onClick = () => {
        categoryId ? onOpenCategory(categoryId) : onOpenTransaction(id);
    };

    const classNames = cn("flex items-center cursor-pointer hover:underline", !category && "text-rose-500");

    return (
        <div onClick={onClick} className={classNames}>
            {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
            {category || "Uncategorized"}
        </div>
    );
};

type CategoryColumnProps = {
    id: string;
    category: string | null;
    categoryId: string | null;
};

export default CategoryColumn;
