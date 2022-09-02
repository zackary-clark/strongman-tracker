import { act } from "@testing-library/react";

/** To be used when chains of async actions need to happen, and cannot be triggered by user action */
export function triggerAsync(delay = 20) {
    return act(async () => {
        await new Promise(resolve => setTimeout(resolve, delay));
    });
}
