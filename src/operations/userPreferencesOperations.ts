import {
    useChangeLengthUnitPreferenceMutation__generated,
    useChangeWeightUnitPreferenceMutation__generated,
    useUserPreferencesQuery__generated
} from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";
import { onMutationError, onQueryError } from "./defaultOnErrors";

export function useUserPreferencesQuery() {
    const openSnackar = useSnackbar();

    return useUserPreferencesQuery__generated({
        onError: onQueryError(openSnackar)
    });
}

export function useChangeWeightUnitPreferenceMutation() {
    const openSnackbar = useSnackbar();

    return useChangeWeightUnitPreferenceMutation__generated({
        onError: onMutationError(openSnackbar),
    });
}

export function useChangeLengthUnitPreferenceMutation() {
    const openSnackbar = useSnackbar();

    return useChangeLengthUnitPreferenceMutation__generated({
        onError: onMutationError(openSnackbar),
    });
}
