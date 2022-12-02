import { MutationHookOptions } from "@apollo/client";
import {
    AddProgrammedExerciseInput,
    AddProgrammedExerciseMutation,
    Exact,
    useAddProgrammedExerciseMutation__generated,
    useChangeProgrammedExerciseOrderMutation__generated,
    useProgrammedExerciseQuery__generated
} from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onMutationError, onQueryError } from "./defaultOnErrors";

export function useProgrammedExerciseQuery(id: string) {
    const openSnackbar = useSnackbar();

    return useProgrammedExerciseQuery__generated({
        onError: onQueryError(openSnackbar),
        variables: { input: { id } },
    });
}

export function useAddProgrammedExerciseMutation(options?: MutationHookOptions<AddProgrammedExerciseMutation, Exact<{ input: AddProgrammedExerciseInput }>>) {
    const openSnackbar = useSnackbar();

    return useAddProgrammedExerciseMutation__generated({
        onError: onMutationError(openSnackbar),
        ...options,
    });
}

export function useChangeProgrammedExerciseOrderMutation() {
    const openSnackbar = useSnackbar();

    return useChangeProgrammedExerciseOrderMutation__generated({
        onError: onMutationError(openSnackbar),
    });
}
