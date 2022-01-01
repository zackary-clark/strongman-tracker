import { IMax } from "../../src/data/max";

export const defaultAxiosResponse = {
    config: {},
    headers: undefined,
    status: 0,
    statusText: "",
    data: undefined
};

export const sampleMaxesArray: IMax[] = [
    {
        _id: "regacvsrgreasd",
        date: "2019-01-18",
        squat1RM: "225",
        bench1RM: "185",
        deadlift1RM: "315",
        press1RM: "135",
    },
];

export const sampleMax: IMax = {
    _id: "alsdkgj2843talkdf",
    date: "Tue Jan 05 1993",
    squat1RM: "123456",
    bench1RM: "185",
    deadlift1RM: "315",
    press1RM: "135"
};
