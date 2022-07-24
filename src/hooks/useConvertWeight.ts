import { WeightUnit } from "../../generated/schema";
import { useUserPreferencesQuery } from "../operations/userPreferencesOperations";

interface ConvertWeight {
    convertToUserUnit: (weightInGrams: number) => number,
    convertFromUserUnit: (weight: number) => number,
    convertUserUnitStringToGrams: (weightString: string) => number,
    unit: WeightUnit
}

export function useConvertWeight(): ConvertWeight {
    const { data } = useUserPreferencesQuery();
    const unit = data?.preferences.weightUnit;

    switch (unit) {
        case WeightUnit.Lb:
            return {
                convertToUserUnit: convertToLb,
                convertFromUserUnit: convertFromLb,
                convertUserUnitStringToGrams: convertLbStringToGrams,
                unit: WeightUnit.Lb
            };
        case WeightUnit.Kg:
        case undefined:
        default:
            return {
                convertToUserUnit: convertToKg,
                convertFromUserUnit: convertFromKg,
                convertUserUnitStringToGrams: convertKgStringToGrams,
                unit: WeightUnit.Kg
            };
    }
}

function convertToKg(weightInGrams: number) {
    return roundHalf(weightInGrams / 1000);
}

function convertFromKg(weightInKgs: number) {
    return Math.round(weightInKgs * 1000);
}

function convertToLb(weightInGrams: number) {
    return roundHalf(weightInGrams * 0.00220462);
}

function convertFromLb(weightInPounds: number) {
    return Math.round(weightInPounds / 0.00220462);
}

function convertKgStringToGrams(weightString: string) {
    const weightValue = parseFloat(weightString);
    if (isNaN(weightValue)) throw new Error("weight is NaN!");
    const nearestHalf = Math.round(weightValue * 2) / 2;
    return convertFromKg(nearestHalf);
}

function convertLbStringToGrams(weightString: string) {
    const weightValue = parseFloat(weightString);
    if (isNaN(weightValue)) throw new Error("weight is NaN!");
    const nearestHalf = Math.round(weightValue * 2) / 2;
    return convertFromLb(nearestHalf);
}

function roundHalf(num: number) {
    return Math.round(num*2)/2;
}
