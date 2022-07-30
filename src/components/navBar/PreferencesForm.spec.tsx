import { MockedResponse } from "@apollo/client/testing";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import {
    ChangeLengthUnitPreferenceDocument,
    ChangeLengthUnitPreferenceMutation,
    ChangeWeightUnitPreferenceDocument,
    ChangeWeightUnitPreferenceMutation,
    LengthUnit,
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
                    weightUnit: WeightUnit.Kg,
                    lengthUnit: LengthUnit.Cm
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
                            weightUnit: WeightUnit.Lb,
                            lengthUnit: LengthUnit.Cm
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

    it("should change length unit on radio button clicks", async () => {
        const changeLengthUnitMock: MockedResponse<ChangeLengthUnitPreferenceMutation> = {
            request: {
                query: ChangeLengthUnitPreferenceDocument,
                variables: {
                    input: {
                        lengthUnit: LengthUnit.In
                    }
                }
            },
            result: {
                data: {
                    changeLengthUnitPreference: {
                        preferences: {
                            weightUnit: WeightUnit.Lb,
                            lengthUnit: LengthUnit.In
                        }
                    }
                }
            }
        };

        renderWithSnackbarAndApollo(<PreferencesForm />, [userPreferencesMock, changeLengthUnitMock]);

        expect(await screen.findByTestId("loading spinner")).toBeInTheDocument();
        expect(await screen.findByText("Preferences")).toBeInTheDocument();
        expect(screen.getByLabelText("Centimeters")).toBeChecked();
        expect(screen.getByLabelText("Inches")).not.toBeChecked();

        screen.getByText("Inches").click();

        await waitFor(() => expect(screen.getByLabelText("Inches")).toBeChecked());
        expect(screen.getByLabelText("Centimeters")).not.toBeChecked();
    });
});
