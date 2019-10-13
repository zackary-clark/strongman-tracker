import { IMax } from "./data/max";

const host = "http://localhost:8080";
// TODO: take this from env variable or otherwise make configurable

const contentHeader = {"Content-Type": "application/json"};

export const getMaxes = (): Promise<Response> => {
    return fetch(host + "/maxes", {method: "GET", headers: contentHeader});
};

export const postMax = (data: IMax): Promise<Response> => {
    return fetch(host + "/max", {method: "POST", headers: contentHeader, body: JSON.stringify(data)});
};
