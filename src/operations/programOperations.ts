import { MutationHookOptions } from "@apollo/client";
import {
    AddProgramInput,
    AddProgramMutation, Exact,
    ProgramsDocument,
    useAddProgramMutation__generated,
    useChangeProgramDescriptionMutation__generated,
    useProgramQuery__generated,
    useProgramsQuery__generated,
    useRenameProgramMutation__generated
} from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onMutationError, onQueryError } from "./defaultOnErrors";

export function useProgramsQuery() {
    const openSnackbar = useSnackbar();

    return useProgramsQuery__generated({
        onError: onQueryError(openSnackbar)
    });
}

export function useProgramQuery(programId: string) {
    const openSnackbar = useSnackbar();

    return useProgramQuery__generated({
        onError: onQueryError(openSnackbar),
        variables: { input: { id: programId }},
    });
}

export function useAddProgramMutation(options?: MutationHookOptions<AddProgramMutation, Exact<{input: AddProgramInput}>>) {
    const openSnackbar = useSnackbar();

    return useAddProgramMutation__generated({
        ...{
            onError: onMutationError(openSnackbar),
            refetchQueries: [{ query: ProgramsDocument }],
        },
        ...options,
    });
}

export function useRenameProgramMutation() {
    const openSnackbar = useSnackbar();

    return useRenameProgramMutation__generated({
        onError: onMutationError(openSnackbar)
    });
}

export function useChangeProgramDescriptionMutation() {
    const openSnackbar = useSnackbar();

    return useChangeProgramDescriptionMutation__generated({
        onError: onMutationError(openSnackbar)
    });
}
