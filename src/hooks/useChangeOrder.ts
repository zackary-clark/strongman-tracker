import { useCallback, useState } from "react";
import { useSnackbar } from "../context/snackbarContext";

type HandleChangeOrder = (items: Orderable[], id: string, order: "up" | "down") => Promise<void>;
/**
 * Function that will be called when changing the order of an item.
 *
 * @param {string} id       - ID of the Orderable to change
 * @param {number} order    - New order value
 * @return {boolean}        - Whether the mutation succeeded
 */
type ChangeOrderCallback = (id: string, order: number) => Promise<boolean>;
/**
 * Function that will be called after changing orders.
 * Typically, refetching queries.
 */
type RefetchCallback = () => void;
type Orderable = {
    id: string;
    order?: number | null;
};

export function useChangeOrder(
    changeOrderCallback: ChangeOrderCallback,
    refetchCallback: RefetchCallback
): HandleChangeOrder {
    const [changeOrderLock, setChangeOrderLock] = useState(false);
    const openSnackbar = useSnackbar();

    return useCallback(async (items: Orderable[], id: string, order: "up" | "down") => {
        const originalIndex = items?.findIndex(w => w?.id === id);

        if (
            items &&
            !changeOrderLock &&
            originalIndex !== undefined &&
            originalIndex >= 0 &&
            (order === "up" ? originalIndex > 0 : originalIndex < items.length - 1)
        ) {
            setChangeOrderLock(true);
            let shouldRefetch = false;
            let success = true;
            const offset = order === "up" ? 0 : 1;

            for (let i = 0; i <= originalIndex + offset; i++) {
                const item = items[i];
                if (item.order !== i || i >= originalIndex - 1 + offset) {
                    shouldRefetch = true;
                    if (i === originalIndex - 1 + offset) {
                        const next = items[i + 1];
                        success = success && await changeOrderCallback(next.id, i);
                    } else if (i === originalIndex + offset && i > 0) {
                        const prev = items[i - 1];
                        success = success && await changeOrderCallback(prev.id, i);
                    } else {
                        success = success && await changeOrderCallback(item.id, i);
                    }
                }
            }

            shouldRefetch && refetchCallback();

            success && openSnackbar("success", "Order Saved!");
            setChangeOrderLock(false);
        }
    }, [changeOrderCallback, refetchCallback, changeOrderLock, setChangeOrderLock, openSnackbar]);
}
