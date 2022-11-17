import dayjs from 'dayjs'

export enum BillType {
    CONSUME = 0,
    INCOME,
}

export interface IBill {
    id?: string,
    type: BillType
    date: string,
    money: number,
    cls: string,
    label: string,
    options?: string
}


export function EmptyBill(): IBill {
    const now = new Date();
    return {
        date: dayjs().format("YYYY-MM-DD"),
        money: 0,
        type: BillType.CONSUME,
        cls: "",
        label: "",
        options: "",
    }
}

export interface IClass {
    consume: Map<string, string[]>,
    income: string[],
}