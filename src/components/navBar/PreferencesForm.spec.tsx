import { MockedResponse } from "@apollo/client/testing";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import {
    ChangeWeightUnitPreferenceDocument,
    ChangeWeightUnitPreferenceMutation,
    UserPreferencesDocument,
    UserPreferencesQuery,
    WeightUnit
} from "../../../generated/schema";
import { renderWithSnackbarAndApollo } from "../../testUtils/renderWithProviders";
import { PreferencesForm } from "./PreferencesForm";

describe("Preferences Form", () => {
    const userPreferencesMock: MockedResponse<UserPreferencesQuery> = {
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

    it("should change weight unit on radio button clicks", async () => {
        const changeWeightUnitMock: MockedResponse<ChangeWeightUnitPreferenceMutation> = {
            request: {
                query: ChangeWeightUnitPreferenceDocument,
                variables: {
                    input: {
                        weightUnit: WeightUnit.Lb
                    }
                }
            },
            result: {
                data: {
                    changeWeightUnitPreference: {
                        preferences: {
                            weightUnit: WeightUnit.Lb
                        }
                    }
                }
            }
        };

        renderWithSnackbarAndApollo(<PreferencesForm />, [userPreferencesMock, changeWeightUnitMock]);

        expect(await screen.findByTestId("loading spinner")).toBeInTheDocument();
        expect(await screen.findByText("Preferences")).toBeInTheDocument();
        expect(screen.getByLabelText("Kilos")).toBeChecked();
        expect(screen.getByLabelText("Pounds")).not.toBeChecked();

        screen.getByText("Pounds").click();

        await waitFor(() => expect(screen.getByLabelText("Pounds")).toBeChecked());
        expect(screen.getByLabelText("Kilos")).not.toBeChecked();
    });
});
