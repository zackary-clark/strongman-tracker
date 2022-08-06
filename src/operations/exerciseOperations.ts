import { MutationHookOptions } from "@apollo/client";
import {
    AddExerciseInput,
    AddMyExerciseMutation,
    Exact,
    MyExercisesDocument,
    RenameExerciseInput,
    RenameExerciseMutation,
    useAddMyExerciseMutation__generated,
    useChangeExerciseDescriptionMutation__generated,
    useChangeExerciseFocusGroupsMutation__generated,
    useExerciseQuery__generated,
    useMyExercisesQuery__generated,
    useRenameExerciseMutation__generated
} from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onMutationError, onQueryError } from "./defaultOnErrors";

export function useMyExercisesQuery() {
    const openSnackbar = useSnackbar();

    return useMyExercisesQuery__generated({
        onError: onQueryError(openSnackbar)
    });
}

export function useExerciseQuery(exerciseId: string) {
    const openSnackbar = useSnackbar();

    return useExerciseQuery__generated({
        onError: onQueryError(openSnackbar),
        variables: { input: { id: exerciseId }},
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

export function useRenameExerciseMutation(options?: MutationHookOptions<RenameExerciseMutation, Exact<{input: RenameExerciseInput}>>) {
    const openSnackbar = useSnackbar();

    return useRenameExerciseMutation__generated({
        ...{
            onError: onMutationError(openSnackbar)
        },
        ...options
    });
}

export function useChangeExerciseDescriptionMutation() {
    const openSnackbar = useSnackbar();

    return useChangeExerciseDescriptionMutation__generated({
        onError: onMutationError(openSnackbar)
    });
}

export function useChangeExerciseFocusGroupsMutation() {
    const openSnackbar = useSnackbar();

    return useChangeExerciseFocusGroupsMutation__generated({
        onError: onMutationError(openSnackbar)
    });
}
