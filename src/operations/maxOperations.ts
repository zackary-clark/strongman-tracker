import {
    AllMaxesDocument,
    AllMaxesQuery,
    useAddMaxMutation__generated,
    useAllMaxesQuery__generated,
    useDeleteMaxMutation__generated
} from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";

export function useAllMaxesQuery() {
    const openSnackbar = useSnackbar();

    return useAllMaxesQuery__generated({
        onError() {
            console.error("Max Query Failed");
            openSnackbar("error", "Network Error!");
        }
    });
}

export function useAddMaxMutation() {
    const openSnackbar = useSnackbar();

    return useAddMaxMutation__generated({
        onError() {
            console.error("Mutation Failed! Check graphql response for details");
            openSnackbar("error", "Save Failed!");
        },
        update(cache, {data}) {
            const newMax = data?.addMax?.max;
            if (newMax) {
                const existingMaxesQuery: AllMaxesQuery | null = cache.readQuery({query: AllMaxesDocument});
                cache.writeQuery({
                    query: AllMaxesDocument,
                    data: {
                        maxes: existingMaxesQuery ? [...existingMaxesQuery.maxes, newMax] : [newMax]
                    }
                });
            }
        }
    });
}

export function useDeleteMaxMutation() {
    const openSnackbar = useSnackbar();

    return useDeleteMaxMutation__generated({
        onCompleted(data) {
            if (data.deleteMax?.success) {
                openSnackbar("success", "Max Deleted!");
            }
        },
        onError() {
            console.error("Delete Failed! Check graphql response for details");
            openSnackbar("error", "Delete Failed!");
        },
        update(cache, {data}) {
            const success = data?.deleteMax?.success;
            const deletedMaxId = data?.deleteMax?.id;
            if (success && deletedMaxId) {
                const existingMaxesQuery: AllMaxesQuery | null = cache.readQuery({query: AllMaxesDocument});
                if (existingMaxesQuery) {
                    let deletedMax;
                    cache.writeQuery({
                        query: AllMaxesDocument,
                        data: {
                            maxes: existingMaxesQuery.maxes.filter(cachedMax => {
                                const isDeleted = cachedMax.id === deletedMaxId;
                                if (isDeleted) deletedMax = cachedMax;
                                return !isDeleted;
                            })
                        }
                    });
                    if (deletedMax) cache.evict({ id: cache.identify(deletedMax) });
                }
            }
        }
    });
}
