import { MutationHookOptions } from "@apollo/client";
import {
    AddProgrammedExerciseInput,
    AddProgrammedExerciseMutation,
    DeleteProgrammedExerciseMutation,
    Exact,
    ProgrammedWorkoutDocument,
    useAddProgrammedExerciseMutation__generated,
    useChangeProgrammedExerciseOrderMutation__generated,
    useDeleteProgrammedExerciseMutation__generated,
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

export function useAddProgrammedExerciseMutation(programmedWorkoutId: string, options?: MutationHookOptions<AddProgrammedExerciseMutation, Exact<{ input: AddProgrammedExerciseInput }>>) {
    const openSnackbar = useSnackbar();

    return useAddProgrammedExerciseMutation__generated({
        onError: onMutationError(openSnackbar),
        refetchQueries: [{ query: ProgrammedWorkoutDocument, variables: { input: { id: programmedWorkoutId } } }],
        ...options,
    });
}

export function useChangeProgrammedExerciseOrderMutation() {
    const openSnackbar = useSnackbar();

    return useChangeProgrammedExerciseOrderMutation__generated({
        onError: onMutationError(openSnackbar),
    });
}

export function useDeleteProgrammedExerciseMutation(programmedWorkoutId?: string | null, options?: MutationHookOptions<DeleteProgrammedExerciseMutation, Exact<{ id: string }>>) {
    const openSnackbar = useSnackbar();

    return useDeleteProgrammedExerciseMutation__generated({
        onError: onMutationError(openSnackbar),
        refetchQueries: programmedWorkoutId ?
            [{ query: ProgrammedWorkoutDocument, variables: { input: { id: programmedWorkoutId } } }] :
            undefined,
        ...options
    });
}
