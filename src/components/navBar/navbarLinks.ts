import { MAX_ROUTE, WORKOUT_ROUTE } from "../../pages/constants";

interface Link {
    route: string,
    label: string,
}

export const navbarLinks: Link[] = [
    {
        route: WORKOUT_ROUTE,
        label: "Workouts",
    },
    {
        route: MAX_ROUTE,
        label: "Maxes",
    }
];
