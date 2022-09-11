import { MutationHookOptions } from "@apollo/client";
import {
    AddProgrammedWorkoutInput,
    AddProgrammedWorkoutMutation,
    Exact,
    useAddProgrammedWorkoutMutation__generated,
    useChangeProgrammedWorkoutOrderMutation__generated
} from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onMutationError } from "./defaultOnErrors";

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
