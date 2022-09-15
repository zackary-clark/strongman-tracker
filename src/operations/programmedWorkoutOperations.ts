import { MutationHookOptions } from "@apollo/client";
import {
    AddProgrammedWorkoutInput,
    AddProgrammedWorkoutMutation,
    Exact,
    useAddProgrammedWorkoutMutation__generated,
    useChangeProgrammedWorkoutDayMutation__generated,
    useChangeProgrammedWorkoutDescriptionMutation__generated, useChangeProgrammedWorkoutFocusGroupsMutation__generated,
    useChangeProgrammedWorkoutOrderMutation__generated,
    useProgrammedWorkoutQuery__generated,
    useRenameProgrammedWorkoutMutation__generated
} from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onMutationError, onQueryError } from "./defaultOnErrors";

export function useProgrammedWorkoutQuery(id: string) {
    const openSnackbar = useSnackbar();

    return useProgrammedWorkoutQuery__generated({
        onError: onQueryError(openSnackbar),
        variables: { input: { id } },
    });
}

export function useRenameProgrammedWorkoutMutation() {
    const openSnackbar = useSnackbar();

    return useRenameProgrammedWorkoutMutation__generated({
        onError: onMutationError(openSnackbar)
    });
}

export function useChangeProgrammedWorkoutDescriptionMutation() {
    const openSnackbar = useSnackbar();

    return useChangeProgrammedWorkoutDescriptionMutation__generated({
        onError: onMutationError(openSnackbar)
    });
}

export function useChangeProgrammedWorkoutDayMutation() {
    const openSnackbar = useSnackbar();

    return useChangeProgrammedWorkoutDayMutation__generated({
        onError: onMutationError(openSnackbar)
    });
}

export function useChangeProgrammedWorkoutFocusGroupsMutation() {
    const openSnackbar = useSnackbar();

    return useChangeProgrammedWorkoutFocusGroupsMutation__generated({
        onError: onMutationError(openSnackbar)
    });
}

export function useAddProgrammedWorkoutMutation(options?: MutationHookOptions<AddProgrammedWorkoutMutation, Exact<{input: AddProgrammedWorkoutInput}>>) {
    const openSnackbar = useSnackbar();

    return useAddProgrammedWorkoutMutation__generated({
        ...{
            onError: onMutationError(openSnackbar),
        },
        ...options,
    });
}

export function useChangeProgrammedWorkoutOrderMutation() {
    const openSnackbar = useSnackbar();

    return useChangeProgrammedWorkoutOrderMutation__generated({
        onError: onMutationError(openSnackbar),
    });
}
