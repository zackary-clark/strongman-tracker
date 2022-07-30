import { MockedResponse } from "@apollo/client/testing";
import { LengthUnit, UserPreferencesDocument, UserPreferencesQuery, WeightUnit } from "../../generated/schema";

export const userPreferencesKgMock: MockedResponse<UserPreferencesQuery> = {
    request: {
        query: UserPreferencesDocument
    },
    result: {
        data: {
            preferences: {
                weightUnit: WeightUnit.Kg,
                lengthUnit: LengthUnit.Cm
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
                weightUnit: WeightUnit.Lb,
                lengthUnit: LengthUnit.In
            }
        }
    }
};
