import { ApolloCache } from "@apollo/client";
import {
    useChangeWeightUnitPreferenceMutation__generated,
    UserPreferences,
    UserPreferencesDocument,
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
        update(cache, {data}) {
            if (data?.changeWeightUnitPreference?.preferences) {
                updatePreferencesInCache(cache, data.changeWeightUnitPreference.preferences);
            }
        }
    });
}

const updatePreferencesInCache = (cache: ApolloCache<any>, newPreferences: UserPreferences) => {
    cache.writeQuery({
        query: UserPreferencesDocument,
        data: {
            preferences: newPreferences
        }
    });
};
