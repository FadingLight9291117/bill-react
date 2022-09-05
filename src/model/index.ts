export enum BillType {
    consume = 0,
    income,
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
        date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        money: 0,
        type: BillType.consume,
        cls: "",
        label: "",
        options: "",
    }
}

export interface IClass {
    consume: Map<string, string[]>,
    income: string[],
}