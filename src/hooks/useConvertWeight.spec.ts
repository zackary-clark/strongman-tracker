import { MockedResponse } from "@apollo/client/testing";
import { act, renderHook } from "@testing-library/react";
import { UserPreferencesDocument, UserPreferencesQuery, WeightUnit } from "../../generated/schema";
import { createAllProviderWrapper } from "../testUtils/renderWithProviders";
import { useConvertWeight } from "./useConvertWeight";

describe("useConvertWeight", () => {
    describe("when User's WeightUnit is kg", () => {
        it("should convert weights correctly", async () => {
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

            const { result } = renderHook(
                useConvertWeight,
                { wrapper: createAllProviderWrapper([userPreferencesMock]) }
            );

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 20)); // need to wait for userPreferencesQuery to return
            });

            expect(result.current.unit).toBe(WeightUnit.Kg);

            const convertToUserUnit = result.current.convertToUserUnit;
            const convertFromUserUnit = result.current.convertFromUserUnit;
            const convertStringToGrams = result.current.convertUserUnitStringToGrams;

            expect(convertFromUserUnit(12.5)).toBe(12500);
            expect(convertFromUserUnit(12)).toBe(12000);

            expect(convertStringToGrams("120")).toBe(120000);
            expect(convertStringToGrams("12")).toBe(12000);

            expect(convertToUserUnit(12500)).toBe(12.5);
            expect(convertToUserUnit(12000)).toBe(12);
            expect(convertToUserUnit(5443)).toBe(5.5);
            expect(convertToUserUnit(5670)).toBe(5.5);
        });
    });

    describe("when User's WeightUnit is lb", () => {
        it("should convert weights correctly", async () => {
            const userPreferencesMock: MockedResponse<UserPreferencesQuery> = {
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

            const { result } = renderHook(
                useConvertWeight,
                { wrapper: createAllProviderWrapper([userPreferencesMock]) }
            );

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 20)); // need to wait for userPreferencesQuery to return
            });

            expect(result.current.unit).toBe(WeightUnit.Lb);

            const convertToUserUnit = result.current.convertToUserUnit;
            const convertFromUserUnit = result.current.convertFromUserUnit;
            const convertStringToGrams = result.current.convertUserUnitStringToGrams;

            expect(convertFromUserUnit(12.5)).toBe(5670);
            expect(convertFromUserUnit(12)).toBe(5443);

            expect(convertStringToGrams("12.567")).toBe(5670);
            expect(convertStringToGrams("12.0000034")).toBe(5443);

            expect(convertToUserUnit(5443)).toBe(12);
            expect(convertToUserUnit(5670)).toBe(12.5);
            expect(convertToUserUnit(12500)).toBe(27.5);
            expect(convertToUserUnit(12000)).toBe(26.5);
        });
    });
});
