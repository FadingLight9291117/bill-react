import request from "./request";
import {IBill} from "../model";

export async function getBills(year: number, month: number) {
    const data = await request.get(`/bill/${year}/${month}`)
    return data.data
}

export async function getLabels() {
    const data = await request.get(`/label/`)
    return data.data
}

export async function postBills(bills: Array<IBill>) {
    const data = await request.post(`/bill/`, bills)
    return data.data
}