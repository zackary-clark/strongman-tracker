import { LengthUnit } from "../../generated/schema";
import { useUserExerciseUnitQuery } from "../operations/userExerciseUnitOperations";
import { useUserPreferencesQuery } from "../operations/userPreferencesOperations";

interface ConvertLength {
    convertToUserUnit: (lengthInInt: number) => number,
    convertFromUserUnit: (length: number) => number,
    convertUserUnitStringToInt: (lengthString: string) => number,
    unit: LengthUnit
}

export function useConvertLength(exerciseId?: string): ConvertLength {
    let unit: LengthUnit | undefined;
    if (exerciseId) {
        const { data } = useUserExerciseUnitQuery(exerciseId);
        unit = data?.userExerciseUnit.lengthUnit;
    } else {
        const { data } = useUserPreferencesQuery();
        unit = data?.preferences.lengthUnit;
    }

    switch (unit) {
        case LengthUnit.In:
            return {
                convertToUserUnit: convertToIn,
                convertFromUserUnit: convertFromIn,
                convertUserUnitStringToInt: convertInStringToInt,
                unit: LengthUnit.In
            };
        case LengthUnit.Cm:
        case undefined:
        default:
            return {
                convertToUserUnit: convertToCm,
                convertFromUserUnit: convertFromCm,
                convertUserUnitStringToInt: convertCmStringToInt,
                unit: LengthUnit.Cm
            };
    }
}

function convertToCm(lengthInInt: number) {
    return roundTenth(lengthInInt / 100);
}

function convertFromCm(lengthInCms: number) {
    return Math.round(lengthInCms * 100);
}

function convertToIn(lengthInInt: number) {
    return roundTenth(lengthInInt / 254);
}

function convertFromIn(lengthInIns: number) {
    return Math.round(lengthInIns * 254);
}

function convertCmStringToInt(lengthString: string) {
    return convertFromCm(fromStringToNumber(lengthString));
}

function convertInStringToInt(lengthString: string) {
    return convertFromIn(fromStringToNumber(lengthString));
}

function fromStringToNumber(lengthString: string) {
    const lengthValue = parseFloat(lengthString);
    if (isNaN(lengthValue)) throw new Error("length is NaN!");
    return roundTenth(lengthValue);
}

function roundTenth(num: number) {
    return Math.round(num*10)/10;
}
