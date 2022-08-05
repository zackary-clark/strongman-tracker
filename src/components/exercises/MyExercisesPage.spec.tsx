import React from "react";
import { MockedResponse } from "@apollo/client/testing";
import { screen } from "@testing-library/react";
import { MuscleGroup, MyExercisesDocument, MyExercisesQuery } from "../../../generated/schema";
import { renderWithApollo } from "../../testUtils/renderWithProviders";
import { MyExercisesComponent } from "./MyExercisesComponent";

describe("MyExercisesPage", () => {
    const customExercisesQueryMock: MockedResponse<MyExercisesQuery> = {
        request: {
            query: MyExercisesDocument
        },
        result: {
            data: {
                exercises: [
                    {
                        id: "af0be2e2-aa3a-42eb-aaac-295f309e3347",
                        name: "super cool custom exercise",
                        description: "it's a description of how cool that exercise is",
                        focusGroups: [MuscleGroup.Biceps]
                    },
                    {
                        id: "9d019e2b-1775-40a7-b090-80c8d0873c88",
                        name: "Another Cool Exercise",
                        focusGroups: []
                    }
                ]
            }
        }
    };
    it("should list custom exercises", async () => {
        renderWithApollo(<MyExercisesComponent />, [customExercisesQueryMock]);

        expect(await screen.findByText("super cool custom exercise")).toBeInTheDocument();
        expect(screen.getByText("Biceps"));

        expect(screen.getByText("Another Cool Exercise"));
    });
});
