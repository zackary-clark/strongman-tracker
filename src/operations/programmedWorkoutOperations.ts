import { useChangeProgrammedWorkoutOrderMutation__generated } from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onMutationError } from "./defaultOnErrors";

export function useChangeProgrammedWorkoutOrderMutation() {
    const openSnackbar = useSnackbar();

    return useChangeProgrammedWorkoutOrderMutation__generated({
        onError: onMutationError(openSnackbar),
    });
}
