import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// We do this recursion so that env.js has "time" to alter the global window
// This almost always loops 0 or 1 times
let count = 0;
const waitForEnv = async () => {
    if (!window.API_ADDRESS && count < 3000) {
        setTimeout(waitForEnv, 1);
        count++;
        return;
    } else {
        if (count >= 3000) {
            console.error("Host Address never loaded!");
            return <div>Error!</div>;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const root = createRoot(document.getElementById("root")!);
        root.render(<App />);
    }
};

waitForEnv();
