import { compareDesc, parseISO } from "date-fns";
import {
    AllMaxesDocument,
    AllMaxesQuery,
    MaxType,
    useAddMaxMutation__generated,
    useAllMaxesQuery__generated,
    useDeleteMaxMutation__generated
} from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onMutationError, onQueryError } from "./defaultOnErrors";

export function useAllMaxesQuery() {
    const openSnackbar = useSnackbar();

    return useAllMaxesQuery__generated({
        onError: onQueryError(openSnackbar)
    });
}

export function useAddMaxMutation() {
    const openSnackbar = useSnackbar();

    return useAddMaxMutation__generated({
        onError: onMutationError(openSnackbar),
        update(cache, {data}) {
            const newMax = data?.addMax?.max;
            if (newMax) {
                const type = newMax.type;
                const existingMaxesQuery: AllMaxesQuery | null = cache.readQuery({query: AllMaxesDocument});
                const field = getFieldName(type);
                cache.writeQuery({
                    query: AllMaxesDocument,
                    data: {
                        [field]: existingMaxesQuery
                            ? [...existingMaxesQuery[field], newMax].sort(
                                (a, b) => compareDesc(parseISO(a.date), parseISO(b.date)))
                            : [newMax]
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
        onError: onMutationError(openSnackbar),
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
                            benchMaxes: existingMaxesQuery.benchMaxes.filter(cachedMax => {
                                const isDeleted = cachedMax.id === deletedMaxId;
                                if (isDeleted) deletedMax = cachedMax;
                                return !isDeleted;
                            }),
                            pressMaxes: existingMaxesQuery.pressMaxes.filter(cachedMax => {
                                const isDeleted = cachedMax.id === deletedMaxId;
                                if (isDeleted) deletedMax = cachedMax;
                                return !isDeleted;
                            }),
                            deadliftMaxes: existingMaxesQuery.deadliftMaxes.filter(cachedMax => {
                                const isDeleted = cachedMax.id === deletedMaxId;
                                if (isDeleted) deletedMax = cachedMax;
                                return !isDeleted;
                            }),
                            squatMaxes: existingMaxesQuery.squatMaxes.filter(cachedMax => {
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

type FieldName = "deadliftMaxes" | "squatMaxes" | "pressMaxes" | "benchMaxes";

const getFieldName = (type: MaxType): FieldName => {
    return `${type}Maxes`;
};
