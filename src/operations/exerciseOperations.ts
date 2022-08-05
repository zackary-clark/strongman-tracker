import { useMyExercisesQuery__generated } from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onQueryError } from "./defaultOnErrors";

export function useMyExercisesQuery() {
    const openSnackbar = useSnackbar();

    return useMyExercisesQuery__generated({
        onError: onQueryError(openSnackbar)
    });
}
