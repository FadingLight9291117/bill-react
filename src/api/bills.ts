import request from "./request";
import {IBill} from "../model";

export async function getBills(year: number, month: number) {
    const data = await request.get(`/search/${year}/${month}`)
    return data.data
}

export async function getClass() {
    const data = await request.get(`/class`)
    return data.data
}

export async function createBill(bill: IBill) {
    const data = await request.post(`/create`, bill)
    return data.data
}