import { getMaxes, postMax } from "../src/webClient";
import { sampleMax } from "./test-helpers/data";

let oldFetch: (input: Request | string, init?: RequestInit) => Promise<Response>;

describe("WebClient", () => {
    const fetchStub = jest.fn(() => Promise.resolve(new Response("", {status: 200})));

    beforeAll(() => {
        oldFetch = window.fetch;
    });

    beforeEach(() => {
        fetchStub.mockClear();
        window.fetch = fetchStub;
    });

    afterAll(() => {
        window.fetch = oldFetch;
    });

    describe("getMaxes", () => {
        beforeEach(() => {
            getMaxes();
        });

        it("should GET with correct path and headers", () => {
            expect(fetchStub).toHaveBeenCalledTimes(1);
            expect(fetchStub).toHaveBeenCalledWith(
                expect.stringContaining("/api/maxes"),
                expect.objectContaining({
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }),
            );
        });
    });

    describe("postMax", () => {
        beforeEach(() => {
            postMax(sampleMax);
        });

        it("should POST with correct path and headers", () => {
            expect(fetchStub).toHaveBeenCalledTimes(1);
            expect(fetchStub).toHaveBeenCalledWith(
                expect.stringContaining("/api/max"),
                expect.objectContaining({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }),
            );
        });

        it("should send max object as JSON", () => {
            expect(fetchStub).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({
                    body: "{\"_id\":\"alsdkgj2843talkdf\",\"date\":\"1993-01-05\",\"squat1RM\":\"225\"}",
                }),
            );
        });
    });
});
