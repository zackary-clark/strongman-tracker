import { match } from "css-mediaquery";

export type MatchMedia = (query: string) => MediaQueryList;

export const createMatchMedia = (width: string) => {
    return (query: string): MediaQueryList => ({
        matches: match(query, {
            width,
        }),
        media: "",
        onchange: () => {},
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    });
};
