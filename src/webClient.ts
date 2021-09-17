import Axios, { AxiosResponse } from "axios";
import { IMax } from "./data/max";
import { getHostAddress } from "./env/getters";

const contentHeader = {"Content-Type": "application/json"};

export function getMaxes(): Promise<AxiosResponse<IMax[]>> {
    return Axios.get(getHostAddress() + "/maxes", {headers: contentHeader});
}

export function postMax(data: IMax): Promise<AxiosResponse<IMax>> {
    return Axios.post(getHostAddress() + "/max", data, {headers: contentHeader});
}
