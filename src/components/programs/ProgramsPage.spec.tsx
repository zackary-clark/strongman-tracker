import { MockedResponse } from "@apollo/client/testing";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {
    AddProgramDocument,
    AddProgramMutation,
    ChangeProgramDescriptionDocument,
    ChangeProgramDescriptionMutation,
    ProgramDocument,
    ProgramQuery,
    ProgramsDocument,
    ProgramsQuery,
    RenameProgramDocument,
    RenameProgramMutation
} from "../../../generated/schema";
import { PROGRAM_ROUTE } from "../../pages/constants";
import { ProgramPage } from "../../pages/ProgramPage";
import { renderPage } from "../../testUtils/renderWithProviders";

describe("ProgramsPage", () => {
    const superHardProgram = {
        id: "9763dc8e-0aa5-4af3-b287-6f65072de666",
        name: "Super Hard Program",
        description: "What a hard program."
    };
    const programsQueryMock: MockedResponse<ProgramsQuery> = {
        request: {
            query: ProgramsDocument,
        },
        result: {
            data: {
                programs: [
                    superHardProgram,
                    {
                        id: "e26d55d7-0a92-40dc-a4c0-091446d84a1d",
                        name: "A Different Program than the other one",
                    }
                ]
            }
        }
    };

    it("should list programs", async () => {
        renderPage(ProgramPage, PROGRAM_ROUTE, [programsQueryMock]);

        expect(await screen.findByText("Super Hard Program")).toBeInTheDocument();

        expect(screen.getByText("A Different Program than the other one")).toBeInTheDocument();
    });

    it("should allow adding new programs", async () => {
        const addProgramMutationMock: MockedResponse<AddProgramMutation> = {
            request: {
                query: AddProgramDocument,
                variables: {
                    input: {
                        name: "Some New Program",
                        description: "with a description",
                    }
                }
            },
            result: {
                data: {
                    addProgram: {
                        success: true,
                        program: {
                            id: "449989e7-a9a6-437e-bd8c-cec3d53a9cc4",
                            name: "Some New Program",
                            description: "with a description",
                        }
                    }
                }
            }
        };

        renderPage(ProgramPage, PROGRAM_ROUTE, [programsQueryMock, addProgramMutationMock, programsQueryMock, programsQueryMock]);

        expect(await screen.findByText("Super Hard Program")).toBeInTheDocument();
        await userEvent.click(screen.getByText("Add Program"));

        expect(await screen.findByText("New Program")).toBeInTheDocument();
        expect(screen.getByLabelText("add-program")).toBeDisabled();
        await userEvent.type(screen.getByLabelText("Name *"), "Some New Program");
        await userEvent.type(screen.getByLabelText("Description"), "with a description");

        await userEvent.click(screen.getByLabelText("add-program"));

        expect(await screen.findByText("Super Hard Program")).toBeInTheDocument();
    });

    describe("when editing", () => {
        const programQueryMock: MockedResponse<ProgramQuery> = {
            request: {
                query: ProgramDocument,
                variables: { input: { id: superHardProgram.id } }
            },
            result: {
                data: {
                    program: superHardProgram
                }
            }
        };

        it("should display program details on click", async () => {
            renderPage(ProgramPage, PROGRAM_ROUTE, [programsQueryMock, programQueryMock]);

            expect(await screen.findByText(superHardProgram.name)).toBeInTheDocument();
            await userEvent.click(
                screen.getByRole(
                    "button",
                    {name: `${superHardProgram.name} Workout 1, Workout 2`}
                )
            );

            expect(await screen.findByLabelText("Description")).toBeInTheDocument();
            expect(await screen.findByText(superHardProgram.name)).toBeInTheDocument();

            await waitFor(() => expect(screen.getByLabelText("Name")).toHaveValue(superHardProgram.name));
            expect(screen.getByLabelText("Description")).toHaveValue(superHardProgram.description);
        });

        it("should edit name on blur", async () => {
            const renameProgramMock: MockedResponse<RenameProgramMutation> = {
                request: {
                    query: RenameProgramDocument,
                    variables: {
                        input: {
                            id: superHardProgram.id,
                            name: "new name"
                        }
                    }
                },
                result: {
                    data: {
                        renameProgram: {
                            program: {
                                ...superHardProgram,
                                name: "new name"
                            },
                            success: true,
                        }
                    }
                }
            };

            renderPage(ProgramPage, `${PROGRAM_ROUTE}/${superHardProgram.id}`, [programQueryMock, renameProgramMock]);

            expect(await screen.findByText(superHardProgram.name)).toBeInTheDocument();

            await waitFor(() => expect(screen.getByLabelText("Name")).toHaveValue(superHardProgram.name));

            await userEvent.clear(screen.getByLabelText("Name"));
            await userEvent.click(screen.getByText(superHardProgram.name));

            expect(screen.getByLabelText("Name")).toHaveValue(superHardProgram.name);

            await userEvent.clear(screen.getByLabelText("Name"));
            await userEvent.type(screen.getByLabelText("Name"), "new name");
            await userEvent.click(screen.getByText(superHardProgram.name));

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 20)); // need to "wait" for save to go through to make sure it did not fail
            });

            expect(screen.queryByText("Network Error!")).not.toBeInTheDocument();
        });

        it("should edit description on blur", async () => {
            const changeProgramDescriptionMock: MockedResponse<ChangeProgramDescriptionMutation> = {
                request: {
                    query: ChangeProgramDescriptionDocument,
                    variables: {
                        input: {
                            id: superHardProgram.id,
                            description: "new description"
                        }
                    }
                },
                result: {
                    data: {
                        changeProgramDescription: {
                            program: {
                                ...superHardProgram,
                                description: "new description"
                            },
                            success: true
                        }
                    }
                }
            };

            renderPage(ProgramPage, `${PROGRAM_ROUTE}/${superHardProgram.id}`, [programQueryMock, changeProgramDescriptionMock]);

            expect(await screen.findByText(superHardProgram.name)).toBeInTheDocument();

            await userEvent.clear(screen.getByLabelText("Description"));
            await userEvent.type(screen.getByLabelText("Description"), "new description{tab}");

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 20)); // need to "wait" for save to go through to make sure it did not fail
            });

            expect(screen.queryByText("Network Error!")).not.toBeInTheDocument();
        });
    });
});
