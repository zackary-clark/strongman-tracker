import Axios, {AxiosResponse} from "axios";
import { IMax } from "./data/max";

const host = window.location.hostname === "localhost" ? "/api" : "https://strongman-tracker.herokuapp.com/api";

const contentHeader = {"Content-Type": "application/json"};

export function getMaxes(): Promise<AxiosResponse<IMax[]>> {
    return Axios.get(host + "/maxes", {headers: contentHeader});
}

export function postMax(data: IMax): Promise<AxiosResponse> {
    return Axios.post(host + "/max", data, {headers: contentHeader});
}
