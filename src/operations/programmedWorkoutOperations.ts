import { useWorkoutsByProgramQuery__generated } from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onQueryError } from "./defaultOnErrors";

export function useWorkoutsByProgram(programId: string) {
    const openSnackbar = useSnackbar();

    return useWorkoutsByProgramQuery__generated({
        onError: onQueryError(openSnackbar),
        variables: { program: programId },
    });
}
