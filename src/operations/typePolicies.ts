import { TypePolicies } from "@apollo/client";

export const typePolicies: TypePolicies = {
    UserExerciseUnit: {
        keyFields: ["exercise"],
    },
    UserPreferences: {
        keyFields: [],
    },
};
