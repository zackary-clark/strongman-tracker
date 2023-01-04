import { useUserExerciseUnitQuery__generated } from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onQueryError } from "./defaultOnErrors";

export function useUserExerciseUnitQuery(exerciseId: string) {
    const openSnackbar = useSnackbar();

    return useUserExerciseUnitQuery__generated({
        onError: onQueryError(openSnackbar),
        variables: { input: { exercise: exerciseId }},
    });
}
