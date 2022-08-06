import { MutationHookOptions } from "@apollo/client";
import {
    AddExerciseInput,
    AddMyExerciseMutation,
    Exact,
    MyExercisesDocument,
    useAddMyExerciseMutation__generated,
    useMyExercisesQuery__generated
} from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onMutationError, onQueryError } from "./defaultOnErrors";

export function useMyExercisesQuery() {
    const openSnackbar = useSnackbar();

    return useMyExercisesQuery__generated({
        onError: onQueryError(openSnackbar)
    });
}

export function useAddMyExerciseMutation(options: MutationHookOptions<AddMyExerciseMutation, Exact<{input: AddExerciseInput}>>) {
    const openSnackbar = useSnackbar();

    return useAddMyExerciseMutation__generated({
        ...{
            onError: onMutationError(openSnackbar),
            refetchQueries: [{query: MyExercisesDocument}]
        },
        ...options
    });
}
