import {
    useChangeUserExerciseWeightUnitMutation__generated,
    useUserExerciseUnitQuery__generated,
} from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onMutationError, onQueryError } from "./defaultOnErrors";

export function useUserExerciseUnitQuery(exerciseId: string) {
    const openSnackbar = useSnackbar();

    return useUserExerciseUnitQuery__generated({
        onError: onQueryError(openSnackbar),
        variables: { input: { exercise: exerciseId }},
    });
}

export function useChangeUserExerciseWeightUnitMutation() {
    const openSnackbar = useSnackbar();

    return useChangeUserExerciseWeightUnitMutation__generated({
        onError: onMutationError(openSnackbar),
    });
}
