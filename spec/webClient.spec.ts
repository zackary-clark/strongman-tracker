import Axios from "axios";
import { getMaxes, postMax } from "../src/webClient";
import { sampleMax } from "./test-helpers/data";

jest.mock("axios");

describe("WebClient", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getMaxes", () => {
        it("should GET with correct path and headers", async () => {
            await getMaxes();
            expect(Axios.get).toHaveBeenCalledTimes(1);
            expect(Axios.get).toHaveBeenCalledWith(
                expect.stringContaining("/maxes"),
                expect.objectContaining({
                    headers: {
                        "Content-Type": "application/json",
                    },
                }),
            );
        });
    });

    describe("postMax", () => {
        it("should POST with correct path and headers", async () => {
            await postMax(sampleMax);
            expect(Axios.post).toHaveBeenCalledTimes(1);
            expect(Axios.post).toHaveBeenCalledWith(
                expect.stringMatching("/max"),
                expect.anything(),
                expect.objectContaining({
                    headers: {
                        "Content-Type": "application/json",
                    },
                }),
            );
        });
    });
});
