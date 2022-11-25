import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { createBill, getBills, getLabels } from "../api/bills";
import { BillType, IBill } from "../model";
import * as R from "ramda"
import { BillLabel } from "./types";


/**
 * 仅存储一个月的数据
 */
export class Bill {
    private _bills: IBill[] = [];
    // _cls2label: IClass = {consume: new Map<string, string[]>(), income: []}
    private _cls2label: BillLabel = { consume: [], income: [] }

    constructor() {
        makeAutoObservable(this)
        this.fetchLabels().then()
    }

    get bills() {
        return this._bills
    }

    get cls2label() {
        return this._cls2label
    }

    groupByDate(type?: BillType) {
        const classFun = R.filter((bill: IBill) => R.of(bill.type).length === 0 || bill.type === type)
        const functions = R.compose(
            R.groupBy((bill: IBill) => bill.date),
            classFun,
        )
        return functions(this._bills)
    }

    groupByClass(type?: BillType, date?: string) {
        const classFun = R.filter((bill: IBill) => R.of(bill.type).length === 0 || bill.type === type && (date ? bill.date === date : true))
        const functions = R.compose(
            R.groupBy((bill: IBill) => bill.cls),
            classFun,
        )
        return functions(this._bills)
    }

    groupByLabelOfClass(className: string) {
        const classFun = R.filter((bill: IBill) => R.of(bill.type).length === 0 || bill.cls === className)
        const functions = R.compose(
            R.groupBy((bill: IBill) => bill.label),
            classFun,
        )
        return functions(this._bills)
    }


    get listDailyMoney() {
        return this.groupByDate
    }

    get totalMoney() {
        const functions = R.compose(
            Number,
            (s: number) => s.toFixed(2),
            R.sum,
            R.map((bill: IBill) => bill.money)
        )
        return functions(this._bills)
    }

    get consumeMoney() {
        const functions = R.compose(
            Number,
            (s: number) => s.toFixed(2),
            R.sum,
            R.map((bill: IBill) => bill.money),
            R.filter((bill: IBill) => bill.type === BillType.CONSUME),
        )
        return functions(this._bills)
    }

    get incomeMoney() {
        const functions = R.compose(
            Number,
            (s: number) => s.toFixed(2),
            R.sum,
            R.map((bill: IBill) => bill.money),
            R.filter((bill: IBill) => bill.type === BillType.INCOME),
        )
        return functions(this._bills)
    }

    getTotalMoney(type?: BillType) {
        switch (type) {
            case BillType.INCOME:
                return this.incomeMoney
            case BillType.CONSUME:
                return this.consumeMoney
            default:
                return this.totalMoney
        }
    }

    get meanMoneyByDate() {
        const days = Reflect.ownKeys(this.groupByDate).length
        if (days === 0) return 0
        return this.totalMoney / days
    }


    async add(bill: IBill) {
        const { id } = await createBill(bill)
        bill.id = id
        runInAction(() => {
            this._bills.push(bill);
        })
    }

    async fetch(year: number, month: number) {
        const data = await getBills(year, month)
        runInAction(() => {
            this._bills = data.map((data: any) => {
                return {
                    id: data.id,
                    type: data.type.toUpperCase === 'INCOME' ? BillType.INCOME : BillType.CONSUME,
                    date: data.date,
                    money: data.money,
                    cls: data.cls,
                    label: data.label,
                    options: data.options
                }
            })
        })
    }

    async fetchLabels() {
        const cls2label = await getLabels()
        runInAction(() => {
            this._cls2label = cls2label
        })
    }
}

export const BillContext = createContext<Bill>(new Bill());
