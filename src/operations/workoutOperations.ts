import { QueryHookOptions, Reference } from "@apollo/client";
import {
    AllWorkoutsDocument,
    AllWorkoutsQuery,
    Exact,
    OneWorkoutQuery,
    SingleWorkoutInput,
    useAddLiftMutation__generated,
    useAddWorkoutMutation__generated,
    useAllWorkoutsQuery__generated,
    useDeleteLiftMutation__generated, useDeleteWorkoutMutation__generated,
    useOneWorkoutQuery__generated,
    Workout
} from "../../generated/schema";
import { useSnackbar } from "../context/snackbarContext";

export function useAllWorkoutsQuery() {
    const openSnackbar = useSnackbar();

    return useAllWorkoutsQuery__generated({
        onError() {
            console.error("Workout Query Failed");
            openSnackbar("error", "Network Error!");
        }
    });
}

export function useOneWorkoutQuery(baseOptions: QueryHookOptions<OneWorkoutQuery, Exact<{input: SingleWorkoutInput}>>) {
    const openSnackbar = useSnackbar();

    return useOneWorkoutQuery__generated({
        onError() {
            console.error("One Workout Query Failed");
            openSnackbar("error", "Network Error!");
        },
        ...baseOptions
    });
}

export function useAddWorkoutMutation() {
    const openSnackbar = useSnackbar();

    return useAddWorkoutMutation__generated({
        onError() {
            console.error("Mutation Failed! Check graphql response for details");
            openSnackbar("error", "Save Failed!");
        },
        update(cache, {data}) {
            const newWorkout = data?.addWorkout?.workout;
            if (newWorkout) {
                const existingWorkoutsQuery: AllWorkoutsQuery | null = cache.readQuery({query: AllWorkoutsDocument});
                cache.writeQuery({
                    query: AllWorkoutsDocument,
                    data: {
                        workouts: existingWorkoutsQuery ? [...existingWorkoutsQuery.workouts, {...newWorkout, lifts: []}] : [newWorkout]
                    }
                });
            }
        }
    });
}

export function useAddLiftMutation(workoutAddingTo: Workout | null | undefined) {
    const openSnackbar = useSnackbar();

    return useAddLiftMutation__generated({
        onError() {
            console.error("Mutation Failed! Check graphql response for details");
            openSnackbar("error", "Save Failed!");
        },
        update(cache, { data: mutationData }) {
            const newLift = mutationData?.addLift?.lift;
            const newWorkoutId = mutationData?.addLift?.workout;
            if (newWorkoutId && newLift && workoutAddingTo) {
                cache.modify({
                    id: cache.identify(workoutAddingTo),
                    fields: {
                        lifts(cachedLiftRefs) {
                            return [...cachedLiftRefs, newLift];
                        }
                    }
                });
            }
        }
    });
}

export function useDeleteLiftMutation(workoutDeletingFrom: Workout | null | undefined) {
    const openSnackbar = useSnackbar();

    return useDeleteLiftMutation__generated({
        onCompleted(data) {
            if (data.deleteLift?.success) {
                openSnackbar("success", "Lift Deleted!");
            }
        },
        onError() {
            console.error("Mutation Failed! Check graphql response for details");
            openSnackbar("error", "Delete Failed!");
        },
        update(cache, { data: mutationData }) {
            const success = mutationData?.deleteLift?.success;
            const liftId = mutationData?.deleteLift?.id;
            if (success && workoutDeletingFrom && liftId) {
                cache.modify({
                    id: cache.identify(workoutDeletingFrom),
                    fields: {
                        lifts(cachedLiftRefs, {readField}) {
                            return cachedLiftRefs.filter((liftRef: Reference) => liftId !== readField("id", liftRef));
                        }
                    }
                });
                const liftStoreObject = workoutDeletingFrom.lifts.find(lift => lift.id === liftId);
                if (liftStoreObject) {
                    const liftCacheId = cache.identify(liftStoreObject);
                    if (liftCacheId) cache.evict({id: liftCacheId});
                }
            }
        }
    });
}

export function useDeleteWorkoutMutation() {
    const openSnackbar = useSnackbar();

    return useDeleteWorkoutMutation__generated({
        onCompleted(data) {
            if (data.deleteWorkout?.success) {
                openSnackbar("success", "Workout Deleted!");
            }
        },
        onError() {
            console.error("Mutation Failed! Check graphql response for details");
            openSnackbar("error", "Delete Failed!");
        },
        update(cache, { data: mutationData }) {
            const success = mutationData?.deleteWorkout?.success;
            const workoutId = mutationData?.deleteWorkout?.id;
            if (success && workoutId) {
                const existingWorkoutsQuery: AllWorkoutsQuery | null = cache.readQuery({query: AllWorkoutsDocument});
                if (existingWorkoutsQuery) {
                    let deletedWorkout;
                    cache.writeQuery({
                        query: AllWorkoutsDocument,
                        data: {
                            workouts: existingWorkoutsQuery.workouts.filter(cachedWorkout => {
                                const isDeleted = cachedWorkout.id === workoutId;
                                if (isDeleted) deletedWorkout = cachedWorkout;
                                return !isDeleted;
                            })
                        }
                    });
                    if (deletedWorkout) cache.evict({id: cache.identify(deletedWorkout)});
                }
            }
        }
    });
}
