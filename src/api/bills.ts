import request from "./request";

export async function getBills(year: number, month: number) {
    const data = await request.get(`/search/${year}/${month}`)
    return data.data
}