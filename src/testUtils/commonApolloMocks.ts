import { MockedResponse } from "@apollo/client/testing";
import { UserPreferencesDocument, UserPreferencesQuery, WeightUnit } from "../../generated/schema";

export const userPreferencesKgMock: MockedResponse<UserPreferencesQuery> = {
    request: {
        query: UserPreferencesDocument
    },
    result: {
        data: {
            preferences: {
                weightUnit: WeightUnit.Kg
            }
        }
    }
};

export const userPreferencesLbMock: MockedResponse<UserPreferencesQuery> = {
    request: {
        query: UserPreferencesDocument
    },
    result: {
        data: {
            preferences: {
                weightUnit: WeightUnit.Lb
            }
        }
    }
};
